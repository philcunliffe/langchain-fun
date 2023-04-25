import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";

async function runQuery() {
  const loadedVectorStore = await HNSWLib.load('./vectors', new OpenAIEmbeddings());
  const model = new OpenAI({});
  const chain = ConversationalRetrievalQAChain.fromLLM(model, loadedVectorStore.asRetriever())

  const question = "What is the range of the fireball spell?"
  const followUp = "What kind of save does it require?"

  const res = await chain.call({ question, chat_history: [] });
  console.log(res);

  const chatHistory = question + res.text;
  const followUpRes = await chain.call({
    question: followUp,
    chat_history: chatHistory,
  });
  console.log(followUpRes);
}

export { runQuery };