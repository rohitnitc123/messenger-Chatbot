const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

PORT=process.env.PORT || 3000;


app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); 

const webook_verify_routes=require("./routes/webhook_verify");

app.use('/',webook_verify_routes);


app.get('/',(req,res)=>{
  res.send("Hello there!");
})



app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})