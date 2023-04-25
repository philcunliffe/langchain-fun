import * as dotenv from 'dotenv';
dotenv.config();

import { getChain } from "./getChain.js";
import prompt from 'prompt';

async function startChat() {
  const conversationChain = await getChain();
  let chatHistory = '';

  while (true) {
    console.log('What is your question?');
    const { question } = await prompt.get(['question']);
    const res = await conversationChain.call({ question, chat_history: chatHistory });
    console.log(res.text);

    chatHistory = question + res.text;
  }
}

startChat();