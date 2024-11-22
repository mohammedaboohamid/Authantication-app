import expess from "express"
import { createCollection, deleteCollection, getAllCollection, getSingleCollection,updateCollection } from "../controllers/collectionControllers.js"

const router =expess.Router()
//creaeCollection || method:post
router.post("/create-collection",createCollection)
//delete collection 
router.delete("/delete-collection/:id",deleteCollection)

//fetching collections
router.get("/get-allcollection",getAllCollection)

//fetching singleCollection
router.get("/get-singlecollection/:slug",getSingleCollection)

//update collection
router.put("/update-collection/:id",updateCollection)

export default router