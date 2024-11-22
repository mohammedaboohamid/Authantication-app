import React from 'react'

const CollectionForm = ({value,setValue,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='flex gap-6 mb-10 ml-8'>
        <input 
        className='w-[400px] rounded-md px-6 py-2 border-none outline-none bg-slate-300 '
        value={value}
        onChange={(e)=>{setValue(e.target.value)}}
         type="type here"/>
        <button 
        className='bg-white text-black  px-4 rounded-md '
         type='submit'>submit</button>
    </form>
  )
}

export default CollectionForm