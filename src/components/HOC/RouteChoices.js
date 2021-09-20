import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ component: Component, ...rest }) {
    const authed = useAuth();

    const authedUser = authed?.cookies?.['auth-cookie']?.auth
    return (
        <Route
            {...rest}
            render={(props) => authedUser ? <Component cookies={authed?.cookies} authed={authed?.cookies?.['auth-cookie']} {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />}
        />
    )
}

export function PublicRoute({ component: Component, ...rest }) {
    const authed = useAuth();
    const authedUser = authed?.cookies?.['auth-cookie']?.auth
    return (
        <div style={{ minHeight: `calc(100vh - 200px)` }} className="min-h-screen">
            <Route
                {...rest}
                render={(props) => <Component {...props} />}
            />
        </div>
    )
}