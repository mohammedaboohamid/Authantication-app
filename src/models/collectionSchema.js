import mongoose  from "mongoose";



const collectionSchema = new mongoose.Schema({

name:{
    
    type:String,
    required:[true,"name is required"],
    trim:true,
    maxLength:[50,"name should not exeed 50 chars"],
    unique:true
   
},
slug:{      
    type:String,
    lowercase:true
}

},{timestamps:true,})


export default mongoose.model("Collection",collectionSchema)