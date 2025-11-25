import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { DevOpsAgent } from "../agents/devops_agent.ts";

const agent = await DevOpsAgent();

Deno.serve({
  port: 8000,
  handler: async (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveDir(req, {
        fsRoot: "./ui",
        urlRoot: "",
        showDirListing: false,
        enableCors: true,
      });
    }

    if (url.pathname.startsWith("/ui") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
      return serveDir(req, {
        fsRoot: "./ui",
        urlRoot: "",
        showDirListing: false,
        enableCors: true,
      });
    }

    if (url.pathname === "/ask" && req.method === "POST") {
      const { prompt } = await req.json();
      const result = await agent.runChat(prompt);

      return new Response(JSON.stringify({ answer: result }), {
        headers: { "content-type": "application/json" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log("🔥 DevOps Copilot Backend + UI running at http://localhost:8000");
