import axios from "axios";
import jwtDecode from "jwt-decode";
import { getBrowserAuthCookieValue, useGetLocalRefreshToken } from "../helpers";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json',
    },
});

function refreshToken(token, username) {
    return instance.post("/auth/token", {
        username,
        refreshToken: token,
    });
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
        console.log('passing this config: ', config);
        return await instance(postObject, config)
            .then((res) => {
                return res.data
            })
            .catch(e => console.log('Error occurred'))
    }
}

instance.interceptors.request.use(async (config) => {
    const xAccessHeaders = config.headers['x-access-token']
    if (xAccessHeaders) {
        const jwtTokenExpires = jwtDecode(xAccessHeaders).exp;
        if (jwtTokenExpires * 1000 <= Date.now()) {
            let cookieValue = getBrowserAuthCookieValue();
            await instance({
                method: 'POST',
                url: '/auth/token',
                data: {
                    username: "atlante_avila",
                    refreshToken: cookieValue.refreshToken,
                },
            }).then((response) => {
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