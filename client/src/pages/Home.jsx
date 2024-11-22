import React from 'react'
import { useContext } from 'react'
import AuthContext from '../components/context/authContext'



const Home = () => {
  const {auth}=useContext( AuthContext)
  return (
<div>
<div className='text-white'>

<h1 className='text-white' >home</h1>
<pre>{JSON.stringify(auth,null,4)}</pre>
</div>

   
</div>
  )
}

export default Home