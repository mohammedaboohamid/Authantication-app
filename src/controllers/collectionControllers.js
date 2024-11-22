import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

//create collection
export const createCollection = async(req,res)=>{
    try{
    
   //get info from the frontend
   const {name} = req.body

   //validation
    
if(!name){
     return res.status(400).json({
        success:false,
        message:"collection name is required"
    })
}
   //check the collection already exist
const existingCollection = await Collection.findOne({name})

   //if the collection exist send responds

   
   if(existingCollection){
    return
    res.status(200).json({
        success:false,
        message:"collection already exist"
    }) 
   }
      

  
  
   //if the collection dosent exist create collection 
const collection=await Collection.create({name,slug:slugify(name)})
res.status(200).json({
    success:true,
    message:"new collection has been created successfully",
    collection
})

    }catch(error){
    
    console.log(error);
    res.status(500).json({
        success:false,
        message:`error in creating collection ${error}`,
        error
    })
    

    }
}

//delete collection
export const deleteCollection = async(req,res)=>{
try{
 const{id}=req.params 
 const collectionToDelete = await Collection.findByIdAndDelete(id)

  //if there is no collection to delete ,send responds
  if(!collectionToDelete){
    return res.status(404).json({
        success:false,
        message:"Collection not found"
    })

  }
  res.status(200).json({
    success:true,
    message:"collection has been deleted successfully",
    collectionToDelete
  })
  

}catch(error){
    
    console.log(error);
    res.status(500).json({
        success:false,
        message:`error in deleting collection ${error}`,
        error
    })
    

    }

}




export const getAllCollection = async(req,res)=>{
    try{

   const collection = await Collection.find({})
   res.status(200).json({
    success:true,
    count:collection.length,
    message:"collection has been fetched successfully",
    collection
   })

    }catch(error){
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"error in fetching collection",
            error
        })
    }

}

export const getSingleCollection = async (req,res)=>{
    try{

      const singleCollection=await Collection.findOne({slug:req.params.slug})


   res.status(200).json({
    success:true,
    message:"singleCollection has been fetched successfully",
    singleCollection

    })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"erron in fetching singleCollection"
        })
    }
}

export const updateCollection = async (req,res)=>{
    try{
       
        const {id}=req.params
        const {name}=req.body
//target with id and mention what u want to update(here the name and slug ) and the tthird parameter is new if u do not add that the collection name will not get updated
        const collection=await Collection.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
res.status(200).json({
    success:true,
    message:" collection has been updated successfully",
    collection
})

    }catch(error){
        res.status(500).json({
            success:false,
            message:`error in updating collection ${error}`

        })
    }
}