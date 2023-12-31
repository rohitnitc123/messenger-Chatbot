const request = require("request");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const axios = require("axios");


const senderAction = require("../templates/senderAction");
const sendMessage = require("../templates/sendMessage");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const processMessage = async(event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      let text = message.text;
      var request = require("request");

      const messageToBeSent = await getOpenAIReply(text);
      senderAction(senderID);
      sendMessage(senderID, { text: messageToBeSent });
    }
  }
};


const getOpenAIReply = async (message) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 500,
      temperature: 1,  
    });

    return  response.data.choices[0].text;
   
  } catch (error) {
    return error.message;
  }
};


module.exports = processMessage;
