import { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [formInfo, setFormInfo] = useState({
        username: '',
        password: '',
    })
    const [submiting, setSubmiting] = useState(false)
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const auth = useAuth();
    const handleUpdateFormInfo = (e) => {
        e.preventDefault();
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        })
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        setSubmiting(true);
        return auth.signIn(formInfo.username, formInfo.password, () => {
            if (from?.pathname !== '/') {
                history.replace(from);
            } else {
                history.replace('/dashboard')
            }
        })
            .catch(e => alert('An error occurred. Please try again later.'))
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-2 sm:px-3 lg:px-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                        start your 14-day free trial
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" onSubmit={handleSignIn}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleUpdateFormInfo}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={formInfo.email}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleUpdateFormInfo}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={formInfo.password}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={submiting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
