import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'


const Layout = () => {
  return (
    <div className="bg-stone-900 ">
        <Navbar/>
        <div className='min-h-[70vh]'>
        <Outlet/>
        </div>
        
    
       {/* <main className='min-h-[70vh] text-white'>{children}</main> */}

        <Footer/>
       <div className='w-[500px]'>
       <Toaster position="top-right" richColors className='px-7'
        
        toastOptions={{
          unstyled:false,
          className:{
            error:"bg-red-400 flex items-center px-4 py-3 rounded-md gap2",
            success:"text-green-400 bg-green-500  flex items-center px-4 py-3 rounded-md gap-2 ",
          warning:"text-yellow-400 bg-yellow-500 flex items-center px-4 py-3 rounded-md gap-2",
          info:"text-blue-400 bg-blue-50  flex items-center px-4 py-3 rounded-md gap-2 px-7"
          }
        }}
      />
       </div>

    </div>
  )
}

export default Layout