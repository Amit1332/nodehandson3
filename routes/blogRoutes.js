const Router = require('express').Router()
const {ads,data}= require('../jsonData')


Router.get('/getData',(req,res)=>{
    return res.send({ads,data})
})

module.exports=Router