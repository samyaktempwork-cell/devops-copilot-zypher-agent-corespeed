import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { DevOpsAgent } from "../agents/devops_agent.ts";

const agent = await DevOpsAgent();

// Helper: read FormData safely
async function parsePrompt(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  let prompt = "";
  let fileContent = "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    prompt = form.get("prompt")?.toString() ?? "";

    const file = form.get("file");
    if (file && typeof file === "object") {
      fileContent = await file.text();
    }
  } else {
    prompt = await req.text();
  }

  return { prompt, fileContent };
}

Deno.serve({
  port: 8000,
  handler: async (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    // Serve UI
    if (
      url.pathname === "/" ||
      url.pathname.startsWith("/ui") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css")
    ) {
      return serveDir(req, {
        fsRoot: "./ui",
        urlRoot: "",
        showDirListing: false,
      });
    }

    // --- UNIFIED HANDLER FOR ALL TOOLS ---
    const isTool =
      [
        "/ask",
        "/analyze-logs",
        "/suggest-fixes",
        "/generate-k8s",
        "/validate-terraform",
        "/shell-run"
      ].includes(url.pathname);

    if (isTool && req.method === "POST") {
      const { prompt, fileContent } = await parsePrompt(req);

      let finalPrompt = prompt;
      if (fileContent) {
        finalPrompt += "\n\nAttached File Content:\n" + fileContent;
      }

      const result = await agent.runChat(finalPrompt);

      return new Response(
        JSON.stringify({ result }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
});

console.log("DevOps Copilot Backend + UI running at http://localhost:8000");
