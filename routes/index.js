
const Router = require('express').Router()
const blogRoute =require('./blogRoutes')
const userRoute =require('./userRoutes')




Router.use('/blog',blogRoute)
Router.use('/user',userRoute)








module.exports=Router



