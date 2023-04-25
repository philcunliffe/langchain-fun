import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
async function getChain() {
    const loadedVectorStore = await HNSWLib.load('./vectors', new OpenAIEmbeddings());
    const model = new OpenAI({});
    return ConversationalRetrievalQAChain.fromLLM(model, loadedVectorStore.asRetriever());
}
export { getChain };
