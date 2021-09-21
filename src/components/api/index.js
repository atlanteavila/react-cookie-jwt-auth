import axios from "axios";
import jwtDecode from "jwt-decode";
import { getBrowserAuthCookieValue, useGetLocalRefreshToken } from "../helpers";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json',
    },
});

export const refreshToken = (cookieValue) => {
    const { refreshToken } = cookieValue
    let { username } = cookieValue?.user
    if (!refreshToken || !username) {
        return Promise.reject('We need a username and a refresh token to run this funciton')
    }
    return instance.post("/auth/token", {
        method: 'POST',
        url: '/auth/token',
        data: {
            username,
            refreshToken,
        },
    })
        .then(response => response)
}

export const generateCancelTokenSource = () => axios.CancelToken.source();

const apiMethods = {
    getData: (url, params) =>
        instance({
            'method': 'GET',
            'url': `${url}`,
            'params': params,
        }),
    postData: async (url, data, headers, cancelToken) => {
        const postObject = {
            'method': 'POST',
            'url': url,
            'data': data,
        }
        if (headers) {
            postObject.headers = headers
        }
        const config = {};
        if (cancelToken) {
            config.cancelToken = cancelToken
        }
        return await instance(postObject, config)
            .then((res) => {
                return res.data
            })
            .catch(e => console.error(e.message))
    }
}

instance.interceptors.request.use(async (config) => {
    const xAccessHeaders = config.headers['x-access-token']
    if (xAccessHeaders) {
        const jwtTokenExpires = jwtDecode(xAccessHeaders).exp;
        if (jwtTokenExpires * 1000 <= Date.now()) {
            let cookieValue = getBrowserAuthCookieValue();
            await refreshToken(cookieValue).then((response) => {
                config.headers['x-access-token'] = response.data.accessToken
                const newCookieValue = Object.assign(
                    {},
                    cookieValue,
                    {
                        ...cookieValue,
                        token: response.data.accessToken,
                        refreshToken: response.data.newRefreshToken,
                        expiresAt: jwtDecode(response.data.accessToken).exp,
                    }
                )
                function setCookie(cName, cValue) {
                    document.cookie = cName + "=" + cValue + ";";
                }
                // Apply setCookie
                setCookie('auth-cookie', window.encodeURIComponent(JSON.stringify(newCookieValue)))
            })
        }
    }
    return config;
})

export default apiMethods