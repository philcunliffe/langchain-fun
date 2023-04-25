import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorDBQAChain } from "langchain/chains";
async function getChain() {
    const loadedVectorStore = await HNSWLib.load('./vectors', new OpenAIEmbeddings());
    const model = new OpenAI({ temperature: 0 });
    return VectorDBQAChain.fromLLM(model, loadedVectorStore);
}
export { getChain };
