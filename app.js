import dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const confing = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(confing);

const app = express();

app.get("/", async (req, res) => {
  let result = "";
  try {
    const {
      data: { choices },
    } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Hello gpt!",
        },
      ],
    });
    result = choices[0].message.content;
  } catch (error) {
    result = "server error";
  }
  res.send(result);
});

app.listen(5000, () => {
  console.log("Server on 5000 port [ http://localhost:5000 ]");
});
