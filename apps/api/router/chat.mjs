import express from "express";
import OpenAI from "openai";

import { wrap, delay } from "../utils/index.mjs";

export const router = express.Router();

const openai = new OpenAI({
  apiKey: appConfig.openAIKey,
});

async function getChatMessages(req, res) {
  res.json({
    messages: [],
  });
}

async function sendChatMessage(req, res) {
  //await delay(1000 * 5);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: req.body.message }],
    model: "gpt-3.5-turbo",
  });

  log.tmp(chatCompletion);

  res.json({
    requestMessage: {
      id: 1,
      text: req.body.message,
    },
    responseMessage: {
      id: 2,
      text: chatCompletion.choices[0].message.content,
    },
  });
}

router.get("/messages", wrap(getChatMessages));
router.post("/send", wrap(sendChatMessage));
