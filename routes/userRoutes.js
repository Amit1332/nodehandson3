const Router = require('express').Router()
const { compareSync } = require('bcryptjs')
const {ads,data}= require('../jsonData')
const {passwordValid, hashpaword, comparePassword} = require('../middleware/middlewares')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const user = []
Router.get('/blog/:id',auth,(req,res)=>{
   const userdata =  data.find((elem)=> elem.id==req.params.id)
    return res.send(userdata)
})


Router.get('/getData',auth,(req,res)=>{
    const {type,id}=req.query
    const userdata =  data.filter((elem)=> elem.type==type && elem.id==id)
     return res.send(userdata)
 })



 Router.post('/signup',async (req,res)=>{
    const data = req.body
    if(!data.email || !data.password){
            return res.send({error:"please fill with email and Password"})
        
        }
        const isExist =user.find(elem=> elem.email===data.email)
        if(isExist){
            return res.send({error:"user already exist"})
        
        }
        
     data.password = await hashpaword(data.password)
    user.push(data)
    console.log(user);
    const  token = jwt.sign({user:data.email},process.env.secretKey,{expiresIn:process.env.expires_at*24*60*60*100})
    res.json({success:true,data:data,token:token, msg:"Register Successfully"})
   })
  


 
 Router.post('/login',(req,res)=>{ 
    const data = req.body  
    if(!data.email || !data.password){
        return res.send({error:"please fill with email and Password"})

    }
    let userAccount  = user.find(elem=>elem.email == data.email)
   
     if(userAccount){
            const checkpass =compareSync(data.password,userAccount.password)
            if(checkpass){
                const  token = jwt.sign({user:data.email},process.env.secretKey,{expiresIn:process.env.expires_at*24*60*60*100})
                console.log({msg:`${data.email} Login Successfully`});
                res.json({success:true,email:user.email,token:token, msg:`${data.email} Login Successfully`})

            }
            return res.send({error:"Password is incorrect"})



     }
     else{
        res.json({error:"Please Signup first"})
     }
   })


   //all user
   Router.get('/',(req,res)=>{  
    res.json({success:true,user:user})
   })
module.exports=Router