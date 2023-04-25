import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader, TextLoader } from "langchain/document_loaders";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
async function generateVectors() {
    const pdfLoader = new DirectoryLoader("./data/pdf", {
        ".pdf": (path) => new PDFLoader(path),
    }, true);
    const mdLoader = new DirectoryLoader("./data/md", {
        ".md": (path) => new TextLoader(path),
    }, true);
    const pdfSplitter = new RecursiveCharacterTextSplitter();
    const pdfDocs = await pdfLoader.loadAndSplit(pdfSplitter);
    const mdSplitter = new MarkdownTextSplitter();
    const mdDocs = await mdLoader.loadAndSplit(mdSplitter);
    const vectorStore = await HNSWLib.fromDocuments([...pdfDocs, ...mdDocs], new OpenAIEmbeddings({}));
    await vectorStore.save('./vectors');
}
export { generateVectors };
