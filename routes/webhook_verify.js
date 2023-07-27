
require('dotenv').config();
const express=require('express');


const router=express.Router();


const processMessage = require('../processes/messages');


//   Validating Verification Requests
router.get("/webhook",(req,res)=>{
   if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
             console.log('webhook verified');
             res.status(200).send(req.query['hub.challenge']);
          } else {
              console.error('verification failed. Token mismatch.');
              res.sendStatus(403);
           }
});


// Create the endpoint for your webhook
router.post("/webhook",(req,res)=>{
   if (req.body.object === 'page'){
             req.body.entry.forEach(function(entry) {
             // Iterate over each messaging event
                entry.messaging.forEach(function(event) {
                console.log(event);
                 if (event.message){
                   processMessage(event);
                }
            });
          });
          res.sendStatus(200);
   }
})

module.exports=router;
