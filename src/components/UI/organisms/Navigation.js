/* This example requires Tailwind CSS v2.0+ */
import { Link } from 'react-router-dom'
import PopOverContainer from '../atoms/PopOverContainer'
import { useCookies } from 'react-cookie'
import { useAuth } from '../../context/AuthContext'
import { authCookie } from '../../context/AuthContext'
import SiteLogo from '../atoms/SiteLogo'
import HamburgerMenuIconButton from '../atoms/HamburgerMenuIconButton'
import PopoverGroup from '../molecules/PopoverGroup'
import MobilePopOverNav from '../molecules/MobilePopOverNav'

export default function Navigation() {
    const cookies = useCookies('auth-cookie');
    const authed = useAuth();
    let auth;
    if (cookies[0]?.hasOwnProperty('auth-cookie')) {
        auth = cookies[0]['auth-cookie'].auth;
        const authedUser = authed?.cookies?.['auth-cookie']?.auth
    }

    return (
        <PopOverContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="sr-only">Authed</span>
                            <SiteLogo />
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <HamburgerMenuIconButton className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" screenReaderText="Open menu" />
                    </div>
                    <PopoverGroup />

                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        {!authed?.cookies?.['auth-cookie']?.auth
                            ? (<>
                                <Link /* onClick={authed?.signIn} */
                                    to="login"
                                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                    Sign in
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Sign up
                                </Link>
                            </>) :
                            <button
                                onClick={() => authed.logOut(authCookie)}
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Log out
                            </button>
                        }
                    </div>
                </div>
            </div>
            {/* Mobile menu begins here */}
            <MobilePopOverNav auth={auth} />
        </PopOverContainer>
    )
}
