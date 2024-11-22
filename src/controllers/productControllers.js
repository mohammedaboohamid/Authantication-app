import slugify from "slugify";
import Product from "../models/productSchema.js";
import fs from "fs";

//createproduct

export const createProduct= async (req,res)=>{
    try{

    //get info from the fondent .as we have installed express-formidable we will grab info from request .field and req.files insted of req.body

    const{name,description,price,collection,quantity,shipping}=req.fields
    const {photo}= req.files
    //validation
    if(! name || !description || !price)
        return res.status(404).json({
    success:false,
    message:"please fill all the fields"
        })
        //photo validation
        if(!photo && photo.size >1000000)
            return res.status(500).json({
        success:false,
    message:"photo is required and should be less than 1 MB"
})
//create new product
const product = new Product({...req.fields,slug:slugify(name)})
//if there is no photo we will makes some changes in the product
//sincs the data through fs module and pass the path
if(photo){
    product.photo.data=fs.readFileSync(photo.path)
    product.photo.contentType=photo.type
    await product.save()
    
}

    res.status(201).json({
        success:true,
        message:"new product has been created successfully",
        product
    })
}catch(error){
    res.status(500).json({
        success:false,
        message:`error in creating new product ${error}`,
        error
})


}
}
//get all products
export const getAllProducts =async (req,res)=>{
    try{
     const products=await Product.find({})
     .populate("collection")
     .select("-photo")
     .sort({createdAt:-1})
     .limit(12)
     //here we can use multiple filters and we are not selecting photo to reduse the soze of the request.we will create another api to get photos
     res.status(200).json({
        success:true,
        productCount:products.length,
        message:"products has been fetched successfully",
        products
     })
    
    }catch(error){
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"error in fetching products",
            error
        })
    }
}

//get single product
export const getSingleProduct = async (req,res)=>{
    try{
        const singleproduct=await Product.findOne({slug:req.params.slug})
        .populate("collection")
        .select("-photo")
        res.status(200).json({
            success:true,
            message:"products has been fetched successfully",
            singleproduct})
        


    }catch(error){
        res.status(500).json({
            success:false,
            message:"erron in fetching singleProduct"
        })
    }
}
// get product photo
export const getproductPhoto = async (req,res)=>{
    try{

        const product=await Product.findById(req.params.pid)
        .select("photo")
        if (product.photo.data){
            res.set("Content-type",product.photo.contentType)
        return res.status(200).send (product.photo.data)
        }
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:"error in fetching product photo"
        })
    }
}
//delete product
export const deleteProduct = async(req,res)=>{
    try{
        if(!productToDelete){
            return res.status(500).json({
                success:false,
                message:"product not found"
            })
        }
        
        const productToDelete= await Product.findByIdAndDelete(req.params.pid)
        .select("-photo")
        res.status(200).json({
            success:true,
            message:"product has been deleted successfully",
            productToDelete

        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"error in deleting product"
        })
    }
}
//updating product
export const updateProduct= async (req,res)=>{
    try{
     const {name,description,price,collection,quantity,shipping}=req.fields
     const {photo}=req.files
     if(!name || !description || !price)
     {
        return res.status(404).json({
            success:false,
          message:"enter all fileds"
        
      })
     }

//photo validation
if(!photo && photo.size> 1000000)
    return res.status(500).json({
success:false,
message:"photo is required or should be less than 1MB"
}) 

const product= await Product.findByIdAndUpdate(
    req.params.pid,
    {...req.fields,slug:slugify(name)},
    {new:true}
)
if(photo){
    product.photo.data=fs.readFileSync(photo.path)
    product.photo.contentType=photo.type
}
await product.save()
res.status(201).json({
    success:true,
    message:"product has been updated successfully",
    product
})
    }catch(error){
        res.status(500).json({
            success:false,
            message:"error in updating product"
        })
    }
}