import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import crypto from "crypto"
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js"


const app =express()
//middleware
app.use(cors())//allows to interact with client which loded in defferent domain
app.use(express.json())//instructing the app  to accept data in the json format
app.use(cookieParser())//it allows the server to access the user cookies
app .use (morgan("dev"))//logs, requests ,errors and more to the console

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/collection",collectionRoutes)
app.use("/api/v1/product",productRoutes)



//secret key genaration
/*
const key = crypto.randomBytes(64).toString("hex")
console.log(key);
*/

app.get("/",(req,res)=>{
    res.send("<h1>hello world</h1>")

})




export default app