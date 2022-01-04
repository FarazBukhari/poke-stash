import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png'
import { types } from '../utils/data';
import { GoogleLogout } from 'react-google-login';

const Sidebar = ({ user, closeToggle }) => {
    
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-600 hover:text-black transition-all duration-200 ease-in-out capitalize';
    const isActiveStyle = 'flex items-center bg-yellow-100 p-3 gap-3 font-bold border-r-2 border-black shadow-md transition-all duration-200 ease-in-out capitalize';
    
    const navigate = useNavigate();
    
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    const logout = () => {
        localStorage.clear();

        navigate('/login');
    }

    return (
        <div className='flex flex-col justify-between bg-sky-300 h-full overflow-y-scroll w-64 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link
                    to='/'
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={ logo } alt='logo' className='w-full' />
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-white text-base 2xl:text-xl'>Pokemon Types</h3>
                    {types.slice(0, types.length - 1).map(type => (
                        <NavLink
                            to={`/type/${type.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={type.name}
                        >
                            <img
                                src={type.image}
                                className='w-8 h-8 rounded-full shadow-sm'
                                alt='type'
                            />
                            {type.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                    <button
                        type="button"
                        className="flex my-5 mb-3 gap-2 p-2 items-center bg-sky-200 rounded-lg shadow-lg mx-3"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile' />
                        <p>Logout</p>
                    </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy='single_host_origin'
            />
            )}
        </div>
    )
}

export default Sidebar
