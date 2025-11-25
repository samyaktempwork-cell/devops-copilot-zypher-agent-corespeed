import { DevOpsAgent } from "./agents/devops_agent.js";

const agent = await DevOpsAgent();

console.log("\n=== DEBUG: Running runTask() directly ===\n");

const result = await agent.runChat("test message");

console.log("TYPE OF result:", typeof result);
console.log("RAW RESULT:", result);

console.log("\n=== END DEBUG ===");
