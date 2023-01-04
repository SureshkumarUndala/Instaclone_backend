const express = require("express")
const router = express.Router()
const app = express()
const mongoose = require("mongoose")
const PostModel = require("../model/postmodel")

//Get all the posts
router.get("/allposts", async(req,res)=>{
    try{
        const posts = await PostModel.find().populate("author","_id fullname",)
        if(posts){
            return res.json({posts:posts})
        }
        return res.json({ message:"no posts available"})
    }
    catch(err){
        res.json({
            error:err.message
        })

    }
})

//get all posts of current-logged in user 
router.get("/myposts", async(req,res)=>{
//    console.log(req.user)    
    try{
        const posts = await PostModel.find({author:req.user}).populate("author", "_id fullname")
      
        if(posts){
            return res.json({posts:posts})
        }
        return res.json({ message:"no posts available"})
    }
    catch(err){
        res.json({
            error:err.message
        })

    }
})
//create post by user
router.post("/createpost", async (req, res) => {
    console.log(req.user)
    try {
        const { title, body, image} = req.body
     
        if (!title || !body || !image) {
            return res.status(400).json({ error: "one or more mandatory fields empty" })
        }
        const post = await PostModel.create({
            title: title,
            body: body,
            image:image,
            author: req.user
        })
        post.save()
        res.json({
            status:"success",
            post

        })
        console.log(post)

    }
    catch (err) {
        return res.json({
            message: err.message
        })

    }

})

module.exports = router