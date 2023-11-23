const jwt  =require('jsonwebtoken')

const auth = (req,res,next)=>{
    const data = req.headers["authorization"]
    const token =data.split(' ')[1]
   const validate =  jwt.verify(token,process.env.secretKey,(err,validate)=>{
    if(err){
        res.send({err:err})
    }
    if(validate){
        return next()
       }
       else{
        return res.send({err:"user not authorized"})
       }
   })
  

}

module.exports =auth