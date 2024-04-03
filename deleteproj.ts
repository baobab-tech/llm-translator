import { Client } from "langsmith";
import "dotenv/config"
const client = new Client();
await client.deleteProject({projectName: "llm-translator"});