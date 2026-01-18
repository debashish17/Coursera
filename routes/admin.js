const {Router}=require("express");
const {adminModel, courseModel}=require("../db");
const jwt=require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD }=require("../config");
const { adminMiddleware }=require("../middleware/admin");

const adminRouter=Router();

adminRouter.post("/signup",async function(req,res){
    const {email,password,firstName,lastName}=req.body;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message:"Succussfull SignUp"
    })
})
adminRouter.post("/singin", async function(req,res){
    const { email,password }=req.body;
    const admin =await adminModel.findOne({
        email:email,
        password:password
    })
    if (admin)
    {
        const token=jwt.sign({
            id:user._id
        },JWT_ADMIN_PASSWORD);

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
adminRouter.post("/course",adminMiddleware,async function(req,res){
        const adminId=req.userId;
        const { title , description , price, imageUrl }=req.body;

        await courseModel.create ({
                title,
                description,
                price,
                imageUrl,
                creatorId:adminId
        })
        res.json({
            message :"Created a course",
            courseId:course._id
        })
})
adminRouter.put("/course",function(req,res){

})
adminRouter.get("/course/bulk",function(req,res){

})

module.exports={
    adminRouter:adminRouter
}