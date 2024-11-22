import mongoose from "mongoose";
import Collection from "./collectionSchema.js";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        maxLength:[16,"name should not exeed 16 chars"],
    },
    slug:{
        type:String,
    },
    description:{
        type:String,
        maxLength:[80,"description should not exceed 80 chars"]
    },
    price:{
        String:Number,
    },
    collection:{
        type:mongoose.ObjectId,
        ref:"Collection",
    },
    quantity:{
        type:Number,
      

    },
    photo:{
        data:Buffer,
        contentType:String,

    },
shipping:{
    type:Boolean

},

},{timestamps:true})

export default mongoose.model("Product",productSchema)