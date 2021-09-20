import { useEffect, useState } from "react";
import api, { generateCancelTokenSource } from "../api";
import { authCookie } from "../context/AuthContext";

export default function Dashboard({ cookies }) {
    const token = cookies[authCookie].token
    const [data, setData] = useState(null)
    useEffect(() => {
        const source = generateCancelTokenSource();
        if (token) {
            api.postData(
                '/user/info',
                {
                    username: cookies[authCookie].user.username,
                },
                { 'x-access-token': token },
                source.token,
            )
                .then(response => {
                    if (response.info) {
                        setData(response.info);
                    } else {
                        throw new Error('Unable to obtain response info.')
                    }
                })
                .catch(e => console.log(`Error: ${e.message}`))
        }
        // This code runs fine, but I still get a memory leak warning on my browser
        return () => {
            if (source) {
                source.cancel('Unmounting component')
            }
        }
    }, [token])
    return (
        <div>
            <h2>Dashboard</h2>
            {data && <p>This is a protected you are logged in as {data.username} so you can see this page.</p>}
        </div>
    );
}