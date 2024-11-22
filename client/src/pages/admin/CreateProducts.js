import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'sonner'
import {Select} from "antd"
const{Option}=Select


const CreateProducts = () => {
  const [collection,setCollection]=useState("")
  const [collections,setCollections]=useState([])
  const [name,setName]=useState("")
  const [ description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [photo,setPhoto]=useState("")
  const [shipping,setShipping]=useState(false)
  const navigate = useNavigate()
  

  const getAllCollection=async()=>{
    try{
      const {data}=await axios.get("/api/v1/collection/get-allcollection")
      if(data && data.success){
        toast.success(data.message)
        setCollections(data.collection)

      }
    }catch(error){
    console.log(error);
    toast.error("error while fetching collection")
    
    }
   
  }
  useEffect(()=>{
    getAllCollection()
  },[])



 


  const handleCreate= async(e)=>{
    e.preventDefault()
    try{
      const productData =new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("collection",collection)
       


const {data} = await axios.post ("/api/v1/product/create-product",productData)
if(data.success){
  toast.success(data.message)
  navigate("/dashbord/admin/products")
}else{
  
  toast.error(data.message)
}
    }catch(error){
      toast.error(`something went wrong ${error}`)
  console.log(error);
      
    }
  }
  return (
    <NavLink className='text-white text-1xl'>Create Products</NavLink>,
    <div className='flex flex-col gap-3 mt-10'>


    <Select bordered placeholder="SelectCollection" size="large" showSearch className='w-[400px] border-none outline-none ' onChange={(value)=>{setCollection(value)}}>{collections && collections.map((item)=>(
      <Option key={item._id} value={item._id}>
        {item.name}
      </Option>
    ))}</Select>
        <div className='flex gap-3'>
          <label className='bg-green-300 px-6 py-2 rounded-md hover:bg-slate-600'>
         {photo ? photo.name:"uploadPhoto"}     
         <input name="photo" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} className="bg-slate-300 px-6 py-2 rounded-md"
         hidden type="file" />
          </label>
        </div>
        <div>
          {photo && <div>
            <img  className='w-[200px]' src={URL.createObjectURL(photo)} alt="productPhoto" />
          </div>}
        </div>

        <div className='flex flex-col items-center'>
          <input type="text"
          value={name}
          placeholder='enter name'
          onChange={(e)=>setName(e.target.value)}
          className='w-[400px] px-4 py-2 rounded-md mt-4 bg-slate-700 border-none outline-none' />

          <textarea 
            cols={56}
            rows={3}
            type="text"
            value={description}
            placeholder='description'
            onChange={(e)=>setDescription(e.target.value)}
            className='w-[400px] px-4 py-2 rounded-md mt-4 bg-slate-700 border-none outline-none'
          />

          <input
           type="number"
           value={price}
           placeholder='price'
           onChange={(e)=>setPrice(e.target.value)}
            className='w-[400px] px-4 py-2 rounded-md mt-4 bg-slate-700 border-none outline-none'
           />


           <input 
           type="number"
           value={quantity} 
           placeholder='quantity'
             onChange={(e)=>setQuantity(e.target.value)}
            className='w-[400px] px-4 py-2 rounded-md mt-4 bg-slate-700 border-none outline-none'
           />
        </div>
        <div className='flex items-center'>
        <Select
        bordered
        placeholder="Select shipping"
        size='large'
        showSearch
        onChange={(value)=>{
          setShipping(value)
        }}
        className='w-[400px] px-4 py-2 rounded-md mt-4 bg-slate-700 '>
        <Option value="0 ">no</Option>
        <Option value="1">yes</Option>

        </Select>
        </div>

        <div>
          <button
          className='bg-sky-900 px-6 py-2 rounded-md'
          onClick={handleCreate}>
            Create product
          </button>
        </div>


    </div>

  )
}

export default CreateProducts