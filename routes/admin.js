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
adminRouter.post("/signin", async function(req,res){
    const { email,password }=req.body;
    const admin =await adminModel.findOne({
        email:email,
        password:password
    })
    if (admin)
    {
        const token=jwt.sign({
            id:admin._id
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

        const course = await courseModel.create ({
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
adminRouter.put("/course",adminMiddleware, async function(req,res){
        const adminId=req.userId;

        const { title ,description ,price ,imageUrl ,courseId }=req.body;
        
        const course = await courseModel.updateOne({
                _id:courseId,
                creatorId:adminId
            },{
                title:title,
                description:description,
                price:price,
                imageUrl:imageUrl
            })
        
        res.json({
            message:"Course Updated",
            courseId:course._id
        })
})
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const courses=await courseModel.find({
        creatorId:adminId
    })
    res.json({
        messages:"Alll your courses",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}