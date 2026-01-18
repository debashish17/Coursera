const express=require("express");
const Router=express.Router;

//alternate way
//const {Router}=require(express);
const { userModel }=require("../db");
const jwt=require("jsonwebtoken");
const userRouter=Router();
const { JWT_USER_PASSWORD }=require("../config");

userRouter.post("/signup", async function (req,res){
    const {email,password,firstName,lastName}=req.body;

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message:"Succussfull SignUp"
    })

})
userRouter.post("/signin",async function(req,res){
    const { email,password }=req.body;
    const user =await userModel.findOne({
        email:email,
        password:password
    })
    if (user)
    {
        const token=jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);

        //cookie

        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }

})
userRouter.get("/mycourses",function(req,res){

})

module.exports={
    userRouter:userRouter
}