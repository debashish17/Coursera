const {Router}=require("express");

const courseRouter=Router();


courseRouter.post("/purchase",function(req,res){
    res.json({
        messages:"purchase courses"
    })
})
courseRouter.get("/preview",function(req,res){
    res.json({
        messages:"preview all courses"
    })
})
module.exports={
    courseRouter:courseRouter
}