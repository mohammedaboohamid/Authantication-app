import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='text-white'>
    <ul className='flex gap-6 h-12 bg-gray-400'>
    <li><NavLink to="." >UserDashbord</NavLink></li>
    <li><NavLink to="profile" >profile</NavLink></li>
    <li><NavLink to="orders" >orders</NavLink></li>
    
    </ul>
      
      <Outlet/>
    </div>
  )
}

export default UserLayout