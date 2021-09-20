import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authCookie } from "../context/AuthContext";
export const getTokenFromCookie = (cookies, cookieName) => cookies[cookieName];
export const useGetLocalToken = () => {
    const [cookies] = useCookies([authCookie])
    const cookie = getTokenFromCookie(cookies)
    return cookie.token
}

export const useGetLocalRefreshToken = () => {
    const [cookies] = useCookies([authCookie]);
    const cookie = getTokenFromCookie(cookies, authCookie)
    return cookie.refreshToken;
}

export const getBrowserAuthCookieValue = () => {
    let cookieValue = JSON.parse(window.decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)auth-cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1")));
    return cookieValue;
}