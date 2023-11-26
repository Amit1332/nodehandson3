const Router = require('express').Router()
const {ads,data}= require('../jsonData')
const auth = require('../middleware/auth')


Router.get('/getData',auth,(req,res)=>{
   
    return res.send({ads,data})
})

module.exports=Router