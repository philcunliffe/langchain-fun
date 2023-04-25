import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorDBQAChain } from "langchain/chains";

async function getChain(model) {
  const loadedVectorStore = await HNSWLib.load('./vectors', new OpenAIEmbeddings());
  return VectorDBQAChain.fromLLM(model, loadedVectorStore)
}

export { getChain };