const request = require('request');
require('dotenv').config();


module.exports=senderAction=(recipientId)=>{
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        method: "POST",
        json: {
            recipient: {id: recipientId},
            "sender_action":"typing..."
        }
    }, (error, response, body)=> {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}




        