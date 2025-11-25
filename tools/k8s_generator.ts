// tools/k8s_generator.ts

export function K8sGeneratorTool() {
  return {
    name: "k8s_generator",
    description: "Generates Kubernetes YAML manifests.",
    async execute({ prompt }) {
      return JSON.stringify({
        result: `Here is example Kubernetes YAML based on: ${prompt}`,
        yaml: `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sample
  template:
    metadata:
      labels:
        app: sample
    spec:
      containers:
        - name: sample
          image: nginx
          ports:
            - containerPort: 80
        `
      });
    }
  };
}
