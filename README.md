
# AI DevOps Copilot

A modern DevOps assistant powered by **Zypher + OpenAI**, designed to analyze logs, suggest fixes, generate Kubernetes YAML, validate Terraform, and simulate shell operations — available through both a **CLI** and a **Professional 3-Panel Web Dashboard** with Light/Dark themes.

---

##  Features (Current Version)

###  Professional DevOps Dashboard (C3 Layout)
- Sidebar with tools  
- Chat + file upload panel  
- Output viewer panel  
- Light/Dark theme toggle (T3)

### Core Tools (Initial Stage)
- **Analyze Logs**  
- **Suggest Fixes**  
- **Generate Kubernetes YAML**  
- **Validate Terraform**  
- **Simulated Shell Execution**  

###  Hybrid Interaction Support
- Chat-based  
- Tool-based  
- File-driven  

---

##  Project Structure

```
devops-copilot/
│
├── cli/
│   └── main.ts
│
├── server/
│   └── server.ts
│
├── agents/
│   └── devops_agent.ts
│
├── tools/
│   ├── log_analyzer.ts
│   ├── k8s_generator.ts
│   ├── tf_validator.ts
│   └── shell_sandbox.ts
│
├── ui/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── README.md
```

---

##  Local Setup

### **Run UI (no backend needed yet)**  
Open:
```
ui/index.html
```

### **Run Backend + UI**
```
deno run --allow-all server/server.ts
```

### **Run CLI**
```
deno run --allow-all cli/main.ts
```

Example:
```
deno run --allow-all cli/main.ts "Analyze this log: <paste>"
```

---

##  Future / Planned Features

### 🟦 Endpoint Health Checker  
### 🟧 Response Validator  
### 🟩 Docker Inspector  
### 🟨 Kubernetes Cluster Inspector  
### 🟪 DNS Resolver  
### 🟫 SSL Certificate Checker  
### 🟥 CI/CD Log Classifier  
### 🔷 Multi-Agent Planner → Worker Flow  
### 🔶 Full Kubernetes Deployment Mode  

Full roadmap:
| Phase | Features |
|-------|----------|
| **V1** | UI, CLI, Log Analyzer, Fix Suggestions, K8s YAML, Terraform Validator, Shell Sandbox |
| **V2** | Endpoint Checker, Response Validator, Docker Inspector, CI/CD Analyzer |
| **V3** | DNS, SSL, Cluster Inspector, Port Scanner |
| **V4** | Multi-agent, Kubernetes deployment |

---

##  Contributing
Pull requests are welcome. For major changes, open an issue to discuss your idea first.

---

##  License
MIT License
