export function LogAnalyzerTool() {
  return {
    name: "log_analyzer",
    description: "Analyze logs and detect common DevOps issues.",
    async execute({ logs }: { logs: string }) {
      if (!logs) return "No logs provided.";

      const issues: string[] = [];

      if (logs.includes("CrashLoopBackOff"))
        issues.push("Pod is restarting repeatedly (CrashLoopBackOff). Check container start command & ENV.");

      if (logs.includes("ImagePullBackOff"))
        issues.push("Image cannot be pulled. Check registry URL or credentials.");

      if (logs.includes("OOMKilled"))
        issues.push("Container ran out of memory. Increase memory limit.");

      if (issues.length === 0)
        issues.push("No critical Kubernetes errors found in logs.");

      return JSON.stringify({
        issues,
        raw: logs.slice(0, 300)
      });
    }
  };
}
