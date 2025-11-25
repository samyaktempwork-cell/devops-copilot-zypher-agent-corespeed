export function ShellSandboxTool() {
  return {
    name: "shell_sandbox",
    description: "Simulates shell commands (safe mode).",
    async execute({ command }) {
      return JSON.stringify({
        result: "Shell Simulation",
        command,
        explanation: `This is a safe simulated run. No real execution performed.`,
      });
    }
  };
}
