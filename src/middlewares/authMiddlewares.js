import JWT from "jsonwebtoken"
import config from "../config/config.js"
import AuthRoles from "../utils/AuthRoles.js"
import User from "../models/userSchema.js"
//isLoggedIn middleware 
export const isLoggedIn= (req,res,next)=>{


    try{
        const decode= JWT.verify(req.headers.authorization,config.JWT_SECRET)
        req.user=decode
        next()
    }
catch(error){
    console.log(error);
    
}

}

// isAdmin
export const isAdmin= async (req,res,next)=>{
    try{

    const user=await User.findById(req.user._id)
    if (user.role !==AuthRoles.ADMIN){
        return res.status(401).json({
            success:false,
            message:"you are unautharized to access this resourse"
        })
    }else{
        next()
    }
         
    }catch(error){
        console.log(error);
        
    }
}
