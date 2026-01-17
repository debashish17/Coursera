const express=require("express");
const Router=express.Router;
//alternate way
//const {Router}=require(express);
const userRouter=Router();

userRouter.post("/signup", function (req,res){
    res.json({
        message:"signup endpoint"
    })

})
userRouter.post("/signin",function(req,res){

})
userRouter.get("/mycourses",function(req,res){

})

module.exports={
    userRouter:userRouter
}