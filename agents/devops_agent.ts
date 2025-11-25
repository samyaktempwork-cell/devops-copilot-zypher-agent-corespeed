// agents/devops_agent.ts

import { createZypherContext } from "jsr:@corespeed/zypher@^0.5.1";
import { OpenAIProvider } from "../openai_provider.ts";

export async function DevOpsAgent() {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  // Windows HOME fix
  if (!Deno.env.get("HOME")) {
    Deno.env.set("HOME", "C:/Users/Admin1");
  }
  if (!Deno.env.get("USERPROFILE")) {
    Deno.env.set("USERPROFILE", "C:/Users/Admin1");
  }

  // Create Zypher workspace (still using Zypher)
  await createZypherContext("C:/Users/Admin1/zypher-workspace");

  // Our OpenAI provider
  const provider = new OpenAIProvider(apiKey, "gpt-4.1-mini");

  return {
    // For CLI: use provider directly, no Zypher streaming magic
    async runChat(prompt: string): Promise<string> {
      const messages = [
        { role: "system", content: "You are an AI DevOps Copilot." },
        { role: "user", content: prompt },
      ];

      const stream = provider.streamChat(messages);

      let fullText = "";

      await new Promise<void>((resolve, reject) => {
        const sub = stream.subscribe({
          next(event: any) {
            if (event.type === "text" && event.content) {
              fullText += event.content;
            }
            if (event.type === "text-delta" && event.text) {
              fullText += event.text;
            }
          },
          error(err) {
            reject(err);
          },
          complete() {
            resolve();
          },
        });
      });

      return fullText.trim();
    },
  };
}
