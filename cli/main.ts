// cli/main.ts

import { DevOpsAgent } from "../agents/devops_agent.ts";

const prompt = Deno.args.join(" ").trim();
if (!prompt) {
  console.log('Usage: deno run --allow-all cli/main.ts "your question"');
  Deno.exit(1);
}

console.log("🚀 DevOps Copilot CLI");
console.log("----------------------------------");
console.log("Prompt:", prompt);
console.log("----------------------------------\n");

const agent = await DevOpsAgent();

try {
  const answer = await agent.runChat(prompt);
  console.log("Answer:\n");
  console.log(answer || "(no content from model)");
} catch (err: any) {
  console.error("Error while running DevOps Copilot:", err?.message ?? err);
}

console.log("\n----------------------------------");
console.log("Done.");
