import React from 'react'
import axios from 'axios'
import { useState,useContext } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import AuthContext from '../components/context/authContext'

const Login = () => {


const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const navigate = useNavigate()
const location=useLocation()
const {auth,setAuth}=useContext(AuthContext)


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });
    if (data.success) {
      alert(data.message);
      setAuth({
        ...auth,
        user: data.user,
        token: data.token,
      });

      localStorage.setItem("auth", JSON.stringify(data))

      navigate(location.state || "/");
    }
  } catch (error) {
    console.log(error);
    alert("Error in Login");
  }
};
  console.log("auth is",auth);
  
  return (


<div className='bg-zinc-500 flex flex-col gap-4 items-center min-h-screen' >
       <h1 className='text-5xl pt-5 font-semibold '>Login</h1>
       <form  className ="flex flex-col items-center gap-4"  onSubmit={handleSubmit}> 
       
       <input placeholder='email' type="email" email={email} value={email} onChange={(e)=>setEmail(e.target.value)} required   className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>

       <input placeholder='password' type="password" password={password} value={password} onChange={(e)=>setPassword(e.target.value)} required  className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
       
       
       <button type='submit' className='hover:text-green-500 text-xl  rounded-md flex items-center' >login</button>

       
       </form>
    </div>
  
 )
}

export default Login