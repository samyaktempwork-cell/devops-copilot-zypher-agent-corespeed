// ui/app.js

let currentMode = "chat";

const modeLabel = document.getElementById("active-mode-label");
const themeToggleBtn = document.getElementById("theme-toggle");
const toolButtons = document.querySelectorAll(".tool-btn");
const promptInput = document.getElementById("prompt-input");
const fileInput = document.getElementById("file-input");
const runBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const outputViewer = document.getElementById("output-viewer");

// Handle tool selection
toolButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    toolButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMode = btn.dataset.mode || "chat";
    modeLabel.textContent = `Mode: ${btn.textContent.trim()}`;
  });
});

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.classList.contains("theme-dark");

  if (isDark) {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    themeToggleBtn.textContent = "🌙 Dark";
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    themeToggleBtn.textContent = "☀️ Light";
  }
});

// Clear button
clearBtn.addEventListener("click", () => {
  promptInput.value = "";
  fileInput.value = "";
  outputViewer.textContent = "(Results will appear here)";
});

// Run button – calls backend (placeholder endpoints for now)
runBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt && !fileInput.files.length) {
    alert("Please enter a prompt or attach a file.");
    return;
  }

  outputViewer.textContent = "Running " + currentMode + " ...\n";

  try {
    let endpoint = "/ask";
    switch (currentMode) {
      case "analyze-logs":
        endpoint = "/analyze-logs";
        break;
      case "suggest-fixes":
        endpoint = "/suggest-fixes";
        break;
      case "k8s-yaml":
        endpoint = "/generate-k8s";
        break;
      case "tf-validate":
        endpoint = "/validate-terraform";
        break;
      case "shell-sim":
        endpoint = "/shell-run";
        break;
      default:
        endpoint = "/ask";
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (fileInput.files[0]) {
      formData.append("file", fileInput.files[0]);
    }

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (data && data.result) {
      outputViewer.textContent = data.result;
    } else if (data && data.answer) {
      outputViewer.textContent = data.answer;
    } else {
      outputViewer.textContent = "Raw Response:\n" + (await res.text());
    }
  } catch (err) {
    console.error(err);
    outputViewer.textContent = "Error: " + err.message;
  }
});
