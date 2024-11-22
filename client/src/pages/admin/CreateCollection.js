import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'sonner';
import CollectionForm from '../../components/form/CollectionForm';
import { Modal } from 'antd';


const CreateCollection = () => {
  const [collection,setCollection]=useState([])
  const [name,setName]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName,setUpdatedName]=useState()
  const [selected,setSelected]=useState(null)



  //ant design modal


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //create collection
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}= await axios.post("/api/v1/collection/create-collection",{name})
   
      if(data.success){
        toast.success(data.message)
        getAllCollection()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error);
      
      toast.error("somthing went wrong when creating collectin");
      
    }
  }
   
  

  //get all collection
  const getAllCollection=async()=>{
    try{
      const {data}= await axios.get("/api/v1/collection/get-allcollection")
      if(data.success){
        toast.success(data.message)
        setCollection(data.collection)
      }

    }catch(error){
      console.log(error);
      toast.error(`somthing went wrong in getting collection ${error}`)
      
    }
  }

  //deleting collection
  const deleteCollection=async(id)=>{
    try{
const {data}=await axios.delete(`/api/v1/collection/delete-collection/${id}`)
if(data?.success){
  getAllCollection()
  toast.success(data.message)
  setCollection(data.collection)
}

    }catch(error){
      console.log(error);
      toast.error("error in deleting collection")
      
    }
  }
  //update collection
  const handleUpdate=async (e)=>{
    e.preventDefault()
    try{
      
      const {data}=await axios.put(`/api/v1/collection/update-collection/${selected._id}`,{name:updatedName})
      if(data && data.success){
        setSelected(null)
        setUpdatedName("")
        handleCancel()
        getAllCollection()
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      

    }catch(error){
     console.log(error);
      toast.error("error while updating collection")
      
    }
  }


  useEffect(()=>{
    getAllCollection()
  },[])
  return (
    <div className='flex flex-col gap-6'>
   <h1 className='text-white text-4xl flex justify-center bg-gradient-to-r  from-green-400 to to-red-400'>Manage Collection</h1>
     <div>
      <CollectionForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
     </div>
   <table className='w-[500px] text-lg border'>
    <thead className='rounded-lg bg-'>
      <tr className='text-white'>
        <th className='p-3 text-left'>name</th>
        <th className=''>action</th>
      </tr>
    </thead>
    <tbody className='text-white'>
    {
      collection && collection.map((item)=>(
        <tr className='border '>
          <td className='border' key={item._id}>
         
          {item.name}
          </td>
          <td>
            <EditIcon onClick={()=>{setIsModalOpen(true)  
            setIsModalOpen(true);
            setSelected(item);
            setUpdatedName(item.name)}}/>
            <DeleteIcon onClick={()=>{deleteCollection(item._id)}} />  
          </td>
        </tr>
      ))
    }

    </tbody>
   </table>
   <div>

   <Modal title="Update Collection" open={isModalOpen}  footer={<button className=' flex items-center px-4 rounded-md bg-blue-600' onClick={handleCancel}>Cancel</button> }>
       <CollectionForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
      </Modal>
 
</div>
    

    </div>


    
  )
}

export default CreateCollection