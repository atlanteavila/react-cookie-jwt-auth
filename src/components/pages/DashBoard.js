import { useEffect } from "react";
import api from "../api";
import { authCookie } from "../context/AuthContext";

export default function Dashboard({ cookies }) {
    const token = cookies[authCookie].token;
    useEffect(() => {
        if (token) {
            api.postData('/user/info', {
                "username": "atlante_avila",
                "email": "atlanteavila@gmail.com",
                "password": "july292006"
            }, { 'x-access-token': token })
        }
    }, [token])
    return (
        <div>
            <h2>Dashboard</h2>
            <p>This is a protected page.</p>
        </div>
    );
}