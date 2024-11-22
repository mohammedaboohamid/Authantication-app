import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ({path="login"}) => {

const [count,setCount]=useState(5)
const navigate=useNavigate()
const location =useLocation()

useEffect(() => {
  const interval = setInterval(() => {
    setCount((prevValue) => --prevValue);
  }, 1000);
  count === 0 && navigate(`/${path}`,{state:location.pathname});
  return () => clearInterval(interval);
}, [count, navigate,location,path]);


  return (

    <div>
        <div className='w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-slate-800 text-white'>
            <h1 className='text-3xl'>{`Redirecting in ${count} seconds`}</h1>
            <div className='w-16 border-4 border-dashed rounded-full animate-spin border-yellow-700'></div>
        </div>
    </div>
  )
}

export default Spinner