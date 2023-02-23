const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Usermodel = require("./model/user_model")
const PostModel = require("./model/postmodel")
const Authentication =require("./Routes/authentication")
const PostRoute = require("./Routes/PostRoute")
const jwt = require('jsonwebtoken');
const jwtsecretkey = process.env.jwt_secret
const cors = require("cors")
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


mongoose.connect("mongodb+srv://UMSA:UMSA@cluster0.t0zfjzv.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("dbconnected"))

app.use("/createpost", (req, res, next) => { 
    if(req.headers.authorization){
        const token = req.headers.authorization?.split("bearer ")[1]
        if(token){
            //verify token
            jwt.verify(token, jwtsecretkey, function(err, decoded) {
      
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"Not a Valid token"
                    })
                }
                req.user = decoded.data
                console.log(decoded)
                next()
              });
              
        }else{
            return res.status(401).json({
                status:"Failed",
                message:"Token is missing"
    
            })
        }
    }else{
        return res.status(403).json({
            status:"Failed",
            message:"Not authenticated user"

        })
    }

    
}) 


app.use("/myposts", (req, res, next) => { 
    if(req.headers.authorization){
        const token = req.headers.authorization?.split("bearer ")[1]
        if(token){
            //verify token
            jwt.verify(token, jwtsecretkey, function(err, decoded) {
      
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"Not a Valid token"
                    })
                }
                req.user = decoded.data
                console.log(decoded)
                next()
              });
              
        }else{
            return res.status(401).json({
                status:"Failed",
                message:"Token is missing"
    
            })
        }
    }else{
        return res.status(403).json({
            status:"Failed",
            message:"Not authenticated user"

        })
    }

    
}) 

app.use("/comment", (req, res, next) => { 
    if(req.headers.authorization){
        const token = req.headers.authorization?.split("bearer ")[1]
        if(token){
            //verify token
            jwt.verify(token, jwtsecretkey, function(err, decoded) {
      
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"Not a Valid token"
                    })
                }
                req.user = decoded.data
                console.log(decoded)
                next()
              });
              
        }else{
            return res.status(401).json({
                status:"Failed",
                message:"Token is missing"
    
            })
        }
    }else{
        return res.status(403).json({
            status:"Failed",
            message:"Not authenticated user"

        })
    }

    
}) 






app.use(express.json())
app.use(Authentication)
app.use(PostRoute)




app.listen(8080, ()=>console.log("helloworld"))