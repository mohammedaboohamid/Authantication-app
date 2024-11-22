import React, { useContext, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import DiamondIcon from '@mui/icons-material/Diamond';
import AuthContext from './context/authContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [openMenu,setOpenMenu]=useState(false)
  const {auth,setAuth}=useContext(AuthContext)
  const navigate = useNavigate()


    const handleLogout = async()=>{
     
    try{
    const {data}=await axios.post("/api/v1/auth/logout") 
    if (data.success){
      alert(data.message)
      setAuth({
        ...auth,
        user:null,
        token:" "
      })
      localStorage.removeItem("auth")
      navigate("/")
    }
    

    }catch(error){
      alert(`something went wrong ${error}`)
    }

    }
  
  return (
    <div>
       
        <nav className='h-24 bg-gradient-to-r from-slate-700 to-lime-400 flex items-center gap-4 font-semibold justify-between px-10 text-3xl'>
            <NavLink className="text-5xl " to="/">
          <DiamondIcon className='text-4
          xl'/>
            </NavLink>
         <div className="flex gap-6">
         <NavLink to="/">Home</NavLink>
       {/* <p className='text-yellow-600 text-1xl'>{auth.user.name}</p> */}
        
    {

auth.user?(
  <div className=' flex gap-4'>
  <NavLink to="collection">Collection</NavLink>

  
  <div
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex flex-col justify-center relative"
                >
                  <Link to={`${auth.user.role === "USER" ? "/user":"/admin"}`} className="flex items-center px-4 -mb-1 font-poppins text-1xl cursor-pointer">
                    {auth.user.role} 
                  </Link>
                  {/* {openMenu ? (
                    <div className="flex flex-col absolute top-0 lg:top-10 right-36 lg:left-10 gap-4 text-lg  text-blue-900">
                      <Link
                        to="/admin"
                        className="cursor-pointer"
                      >
                        Dashboard
                      </Link>

                      <Link to="/dashbord/user/profile">Profile</Link>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>

 

  
  <NavLink onClick={handleLogout} to="/logout">Logout</NavLink>
  </div>
):(
  <div className=' flex gap-4'>
  <NavLink to="/signup">Signup</NavLink>
  <NavLink to="/login">Login</NavLink>
  </div>
)

    }
        
 
    

    </div>
            
           
        </nav>
    </div>
  )
}

export default Navbar