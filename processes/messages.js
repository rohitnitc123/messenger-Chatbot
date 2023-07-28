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

      let messageToBeSent = await getOpenAIReply({text:text});
      senderAction(senderID);
      sendMessage(senderID, { text: messageToBeSent });
    }
  }
};


const getOpenAIReply = async (message) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: message,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    return  response.data.choices[0].text;
   
  } catch (error) {
    return error.message;
  }
};


// const getOpenAIReply = async (message) => {
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);
//   try {
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: message,
//     });

//     return completion.data.choices[0].message.content;
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.status);
//       console.log(error.response.data);
//     } else {
//       console.log(error.message);
//     }
//   }
// };


module.exports = processMessage;
