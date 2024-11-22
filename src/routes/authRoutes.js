import express from "express"
import { login, logout, signUp, testController } from "../controllers/authContollers.js"
import { isLoggedIn,isAdmin } from "../middlewares/authMiddlewares.js"

const router=express.Router()

//routes

//signup ||method:post
router.post("/signup",signUp)

//login ||method:post
router.post("/login",login)

//logout ||method:post
router.post("/logout",logout)

//test route
router.get("/test",isLoggedIn,isAdmin,testController)

//protected user route auth
router.get("/user-auth", isLoggedIn, (req, res) => {
    res.status(200).json({
      ok: true,
    });
  });
//protected admin route
  router.get("/admin-auth",isLoggedIn,isAdmin,(req,res)=>{
    res.status(200).json({
      ok: true
    })
  })
export default router