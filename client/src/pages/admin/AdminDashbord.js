import React, { useContext } from 'react'
import AuthContext from '../../components/context/authContext.js'

const AdminDashbord = () => {
  const {auth}=useContext(AuthContext)
  return (
  <div>
<div></div>
<div className='text-white'>
  <li>name:{auth.user.name}</li>
  <li>phone:{auth.user.phone}</li>
  <li>address:{auth.user.address}</li>
  <li>email:{auth.user.email}</li>
</div>
  </div>
  )
}

export default AdminDashbord