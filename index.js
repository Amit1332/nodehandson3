const app = require("./app");


const PORT = process.env.PORT



app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})