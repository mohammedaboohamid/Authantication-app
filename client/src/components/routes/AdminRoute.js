import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/authContext.js'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

export default function AdminRoute() {
    const [ok,setOk]=useState(false)
    const {auth} = useContext(AuthContext)

    useEffect(()=>{
        const authCheck = async()=>{
            const {data}=await axios.get("/api/v1/auth/admin-auth")
                if(data.ok){
                    setOk(true)
                }else{
                    setOk(false)
                }
      
        }
        if(auth?.token) authCheck()

    }, [auth?.token])
  return ok ? <Outlet/> : <Spinner/>
    
  
}

