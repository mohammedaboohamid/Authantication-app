import User from "../models/userSchema.js"
import JWT from "jsonwebtoken"
import config from "../config/config.js"

export const cookieOptions={
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly :true
}
export const signUp=async(req, res)=>{

    try{

    //get info from the frontend
const{name,email,password,phone,address}=req.body


    //validation
if(!name || !email || !password || !phone || !address){
    res.status(400).json({
        success:false,
        message:"all fieldes are required"
    })
}

    //check if the user alredy exist in the data base

const existingUser=await User.findOne({email})

    //if user exist send response

    if (existingUser){
        res.status(200).json({
            success:false,
            message:"you have already sihned up ,please login"
        })
    }
    

    //if user dosent exist create new user
     const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
    
     })
      
    //send success message to the frontend

res.status(201).json({
    success:true,
    message:"successfully signed up",
    user
})


    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`error in signing up ${error}`,
            error 
        })
        
    }
}



//login
export const login=async(req,res)=>{
    try{
     
      //get info from the frontend 

      const{email,password}=req.body


      //validation 
      
      if (!email || !password){
        return res.status(400),json({
            success:false,
            message:"invalid email or password"
        })
      }



      // check if the user exist in the data base
      const user= await User.findOne({email}).select("+password")


      //if the user dosent exist send response
      if(!user){
        res.status(404).json({
            success:false,
            message:"no user found, please signup"
        })
      }


      //if user  exist compare password 
        const isPasswordMatch =await user.comparePassword(password)


      //if passwor doesnt match send response
      if(!isPasswordMatch){
        res.status(400).json({
            success:false,
            message:"invalid password"
        })
      }


      //if password match genarate jwt token 
      const token = JWT.sign({_id:user._id,role:user.role},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY}) 


      //set up cookies
      res.cookie("token",token,cookieOptions)

      //send success response
res.status(200).json({
    success:true,
    message:"successfully logged in",
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        role:user.role,
        address:user.address
    },
    token
})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`error in login ${error}`,
            error
        })
        
    }
}


//logout
export const logout=async(req,res)=>{
    try{
      res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
      })
      res.status(200).json({
        success:true,
        message:"successfully logged out"
      })

        

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`error in logout ${error}`,
            error
        })
        
    }
}
//test controller

export const testController= (req,res)=>{
    res.send("protected route")
}

