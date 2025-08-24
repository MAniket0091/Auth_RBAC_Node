require('dotenv').config();
const express = require('express');
const {authRoutes} = require('./routes');
const { default: mongoose } = require('mongoose');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const port = 5500;

app.use(express.json());
app.use('/api/auth',authRoutes)
app.get("/",(req,res)=>{
    res.send("Hello starting Auth Project");
});
app.use(errorHandler);

let dbUrl = 'mongodb://localhost:27017/AuthProject';
mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=> console.log("connected tpo MongoDB"))
        .catch((error)=>console.log(error));

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});