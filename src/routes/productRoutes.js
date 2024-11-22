import express from "express"
import { createProduct, deleteProduct, getAllProducts, getproductPhoto, getSingleProduct, updateProduct } from "../controllers/productControllers.js"
import formidable from "express-formidable"
import {isLoggedIn,isAdmin} from "../middlewares/authMiddlewares.js"



const router=express.Router()
//create-product
router.post("/create-product",isLoggedIn, isAdmin,formidable(),createProduct) 
//getAllProduct
router.get("/getall-product",getAllProducts)  
//getsingle product
router.get("/getsingle-product/:slug",getSingleProduct)
//get product photo
router.get("/getproduct-photo/:pid",getproductPhoto)
//delete product
router.delete("/delete-product/:pid",isLoggedIn,isAdmin,deleteProduct)
//update product
router.put("/update-product/:pid",isLoggedIn,isAdmin,formidable(),updateProduct)

export default router