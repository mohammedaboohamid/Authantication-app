import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({


name:{
    type:String,
    required:[true,"name is required"],
    trim:true,
    maxLength:[20,"name should not exeed 20 chars"]
},
email:{
    type:String,
    required:[true,"email is required"],
    unique:true
},
password:{
    type:String,
    required:[true,"password is required"],
    minLength:[8,"password should contain 8 chars"],
    select:false
},
phone:{
    type:String,
    required:[true,"phone number is required"]

},
address:{
    type:String,
    required:[true,"adress is required"],
    maxLength:[80,"adress should not exeed 80 chars"]
},
role:{
    type:String,
    eneum:Object.values.AuthRoles,
    default:AuthRoles.USER 
}


},{timestamps:true})


//mongoose hooks
userSchema.pre("save",async function (next) {
if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
})

//schema methods
userSchema.methods={
    comparePassword:async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }
  

}

export default mongoose.model("User",userSchema)