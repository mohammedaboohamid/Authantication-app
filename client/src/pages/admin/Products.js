import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const Products = () => {
    const [products,setProducts]=useState()
    console.log(products);
    
    const getAllProducts=async()=>{
        try{
            const {data}=await axios.get("/api/v1/product/getall-product")
            toast.success(data.message)
            setProducts(data.products)

        }catch(error){
            console.log(error);
            toast.error(`something went wrong ${error}`)
            
        }
    }

    useEffect(()=>{getAllProducts()},[])
    
  return (
    
    
    <div>
        <h1 className='text-white text-4xl flex justify-center bg-gradient-to-r  from-green-400 to to-red-400'>
        PRODUCTS</h1>
       
<div  className='flex gap-6 justify-center py-10'>

    {
        products && products.map((item) => {
            return(
                <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
	<img src={`/api/v1/product/getproduct-photo/${item._id}`} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
	<div className="flex flex-col justify-between p-6 space-y-8">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
			<p className="dark:text-gray-800">{item.description}</p>
			<p className="dark:text-gray-800">{item.price}</p>
		</div>
        <div className='flex justify-between gap-2'>
        <button type="button" className="flex items-center justify-center w-1/2 p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50 hover:bg-violet-800  active:bg-violet-700">Update</button>
		<button type="button" className="flex items-center justify-center w-1/2 p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50 hover:bg-violet-800 active:bg-violet-700">Delete</button>
        </div>
	 
	</div>
</div>
            )
        })
    }
</div>





    </div>
  )
}

export default Products