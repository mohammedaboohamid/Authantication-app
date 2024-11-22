import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
    <ul className='flex gap-6 h-12 bg-gray-400'>
    <li><NavLink to=".">AdminDashbord</NavLink></li>
    <li><NavLink to="create-collection" >create collection</NavLink></li>
    <li><NavLink to="create-products">Create Products</NavLink></li>
    <li><NavLink to="users" >Users</NavLink></li>
    <li><NavLink to="products" >Products</NavLink></li>
    
    </ul>
      
      <Outlet/>
    </div>
  )
}

export default AdminLayout