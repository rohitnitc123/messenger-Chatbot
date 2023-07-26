const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

require('dotenv').config();


const processMessage=(event)=>{
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            let text = message.text;
            var request = require("request");
            senderAction(senderID);
            sendMessage(senderID, {text:text});
        }
    }
}


module.exports=processMessage;
