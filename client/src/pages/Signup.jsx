import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[phone,setPhone]=useState("")
  const[address,setAddress]=useState("")
  const navigate = useNavigate()

  //user sugnUp

  const handleSubmit= async (e)=>{
    e.preventDefault()
try{

const {data}= await axios.post("/api/v1/auth/signup",{name,email,password,phone,address})
if(data.success){
  alert(data.message)
  navigate("/login")

}else{
  alert(data.message)
}

}catch(error){
  console.log(error);
  alert(`somerhing went wrong while signing uo ${error}`)
  
}
    
  }

  return (
  

   <div className='bg-stone-900 flex flex-col gap-4 items-center min-h-screen text-white'>
  <h1 className='text-4xl font-semibold py-6'>Sign Up</h1>

<form onSubmit={handleSubmit} className='bg-stone-900 flex flex-col gap-4 items-center min-h-screen text-white'>
      <input placeholder='name' type="text" name={name} value={name} onChange={(e)=>setName(e.target.value)} required  className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
      <input placeholder='email'type="email" email={email} value={email} onChange={(e)=>setEmail(e.target.value)} required   className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
      <input placeholder='password'type="password" password={password} value={password} onChange={(e)=>setPassword(e.target.value)} required  className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
      <input placeholder='address'type="text"  address={address} value={address} onChange={(e)=>setAddress(e.target.value)} required className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
      <input placeholder='phone'type="text"  phone={phone} value={phone} onChange={(e)=>setPhone(e.target.value)} required className='w-[400px] px-4 py-2 rounded-md text-white bg-stone-700 outline-none border-none'/>
      <button type='submit' className='hover:text-green-500' >signup</button>
    </form>
  </div>

  )
}

export default Signup
