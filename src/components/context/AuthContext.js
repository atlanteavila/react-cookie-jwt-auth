import React, { useState, createContext, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import jwt_decode from "jwt-decode"
import api from '../api'

export const UserContext = createContext()
export const authCookie = 'auth-cookie';

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies([authCookie])

    const signIn = async (username, password, cb) => {
        const data = await api.postData('auth/signin', { username, password })
        try {
            const token = data?.accessToken;
            const decodedToken = jwt_decode(token);
            await setCookie(authCookie, JSON.stringify({
                auth: true,
                token,
                refreshToken: data.refreshToken,
                initiatedAt: decodedToken.iat * 1000,
                expiresAt: decodedToken.exp * 1000,
                expiresAtFull: new Date(decodedToken.exp),
                user: { 
                    username: data.username,
                    id: data.id,
                    id: data.email,
                },
            }));
            await setUser({
                authed: true,
                token,
                expiresAt: decodedToken.exp,
                user: true,
            })
            if (cb) {
                cb()
            }
        } catch (error) {
            console.error('Error decoding token', error);
        }

    }

    const logOut = (cookie) => {
        removeCookie(cookie);
        setUser(null)
    }
    return (
        <UserContext.Provider value={{ user, setUser, logOut, signIn, cookies }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useAuth = () => useContext(UserContext)