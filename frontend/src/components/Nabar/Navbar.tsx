import { useState } from 'react'
import { Link } from 'react-router'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { TiHeartOutline } from "react-icons/ti";

import avatarImg from "../../assets/avatar.png"
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAuth } from '../../context/AuthContext';

import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/order" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" }
]

const Navbar = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const { currentUser, logout } = useAuth();

    const handelLogout = () => {
        logout();
    }

    const items: MenuProps['items'] = navigation.map((item) => ({
        label: <Link className='pr-8' to={item.href}>{item.name}</Link>,
        key: item.name,
    }));

    items.push({
        label: 'Logout',
        key: 'Logout',
        onClick: handelLogout,
    });


    return (
        <header className='max-w-screen-2xl w-full mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>
                {/* Left side */}
                <div className="flex items-center md:gap-16 gap-4   ">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className='size-6' />
                    </Link>

                    {/* search input */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
                        <input
                            type="text"
                            placeholder='Search here'
                            className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                    </div>
                </div>

                {/* right side */}
                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                <div className='cursor-pointer'>
                                    <Dropdown menu={{ items }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </> :
                                <Link to="/auth">
                                    <HiOutlineUser className='size-6' />
                                </Link>
                        }
                    </div>


                    <button className='hidden sm:block'>
                        <TiHeartOutline className='size-6' />
                    </button>

                    <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                        <HiOutlineShoppingCart className='' />
                        {cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>}

                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
