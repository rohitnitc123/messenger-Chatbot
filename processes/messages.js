const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

//for open ai response
const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // The API endpoint for text completions using the Davinci Codex model


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


            let messageToBeSent=getOpenAIReply(text);
            senderAction(senderID);
            sendMessage(senderID, {text:messageToBeSent});
        }
    }
}




//interaction with openai
async function getOpenAIReply(prompt) {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          prompt: prompt,
          max_tokens: 1000, // Adjust this value to control the length of the generated reply
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching OpenAI reply:', error);
      throw error;
    }
  }
  



module.exports=processMessage;
