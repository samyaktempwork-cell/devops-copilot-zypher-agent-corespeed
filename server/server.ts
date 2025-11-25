// server/server.ts

import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { DevOpsAgent } from "../agents/devops_agent.ts";

const agent = await DevOpsAgent();

Deno.serve({
  port: 8000,
  handler: async (req) => {
    const url = new URL(req.url);

    // ⭐ 1. Serve UI (index.html, style.css, app.js)
    // If user opens "/", return the UI index.html
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveDir(req, {
        fsRoot: "./ui",
        urlRoot: "",
        showDirListing: false,
        enableCors: true,
      });
    }

    // ⭐ 2. Auto-serve other UI assets
    if (url.pathname.startsWith("/ui") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
      return serveDir(req, {
        fsRoot: "./ui",
        urlRoot: "",
        showDirListing: false,
        enableCors: true,
      });
    }

    // ⭐ 3. API Endpoint
    if (url.pathname === "/ask" && req.method === "POST") {
      const { prompt } = await req.json();
      const result = await agent.runChat(prompt);

      return new Response(JSON.stringify({ answer: result }), {
        headers: { "content-type": "application/json" }
      });
    }

    // ⭐ Default
    return new Response("Not Found", { status: 404 });
  }
});

console.log("🔥 DevOps Copilot Backend + UI running at http://localhost:8000");
