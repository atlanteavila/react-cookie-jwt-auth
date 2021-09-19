import axios from "axios";
import jwtDecode from "jwt-decode";
import { useGetLocalRefreshToken } from "../helpers";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json',
    },
});

function refreshToken() {
    return instance.post("/auth/token", {
        refreshToken: useGetLocalRefreshToken(),
    });
}

const apiMethods = {
    getData: (url, params) =>
        instance({
            'method': 'GET',
            'url': `${url}`,
            'params': params,
        }),
    postData: async (url, data, headers) => {
        const postObject = {
            'method': 'POST',
            'url': url,
            'data': data,
        }
        if (headers) {
            postObject.headers = headers
        }
        return await instance(postObject)
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
        debugger;
        if (jwtTokenExpires * 1000 <= Date.now()) {
            console.log('it is expired:::::')
            await instance({
                method: 'POST',
                url: '/auth/token',
                params: {
                    username: "atlante_avila",
                    refreshToken: "ddFewzLN511IkmazmZQJudscEKNhWZrxDKehmBBygusLqoNLKWkR9zfxSAC9MVy8p7Z8mKvjKvDZPHkwFscVFiQPKni2Gef9h3uafSR1r4Yc6cVJkG5vAZB4AvzcVMN26IRo1Sh1VxLx3YnC59iCX1fuC0PszA9h7ExukgAffWNjfoN2FsphktYvskRkh7yqCiak9CJi3vmicqWqqEum1SyvAtdFTI9fiuj1U6juR5zg1Nt1rQ1wdSUJ0hO8Sle4"
                },
            }).then((response) => {
                console.log('We have a response????', response);
            })
        } else {
            console.log('It\'s not expired!!!')
        }
    }
    return config;
})

export default apiMethods