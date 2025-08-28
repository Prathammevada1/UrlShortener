const express=require('express')
const urlRoute=require('./routes/url');
const {connectMongo} = require('./connect')
const URL = require('./models/url')

const app=express();
const PORT = 8001;
connectMongo("mongodb://localhost:27017/short-url").then(()=>console.log("Connected"));

app.use(express.json());

app.use("/url",urlRoute);

app.get("/:shortId",async (req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId:shortId
  },{$push:{
    visitHistory:{timestamp:Date.now()},
  }})
  res.redirect(entry.redirectURL);
});
app.listen(PORT,()=>console.log(`Server started at ${PORT}`))