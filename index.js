const express=require('express')
const urlRoute=require('./routes/url');
const {connectMongo} = require('./connect')
const app=express();
const PORT = 8001;
connectMongo("mongodb://localhost:27017/short-url").then(()=>console.log("Connected"));

app.use(express.json());

app.use("/url",urlRoute);
app.listen(PORT,()=>console.log(`Server started at ${PORT}`))