import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authCookie } from "../context/AuthContext";
export const GetCookie = (cookies, cookieName) => cookies[cookieName].token;
export const useGetLocalToken = () => {
    const [cookies, setCookies, getCookies] = useCookies([authCookie]);
    const [cookie, setCookie] = useState(null)
    useEffect(() => {
        const cookie = getCookies(cookies, authCookie);
        setCookie(cookie);
        // eslint ignore next line
    }, [])
    return cookie.token;
}

export const useGetLocalRefreshToken = () => {
    const [cookies, setCookies, getCookies] = useCookies([authCookie]);
    const [cookie, setCookie] = useState(null)
    useEffect(() => {
        const cookie = getCookies(cookies, authCookie);
        setCookie(cookie);
        // eslint ignore next line
    }, [])
    return cookie.refreshToken;
}