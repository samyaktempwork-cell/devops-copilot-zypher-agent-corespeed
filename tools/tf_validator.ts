export function TerraformValidatorTool() {
  return {
    name: "tf_validator",
    description: "Validates Terraform configuration.",
    async execute({ tf }) {
      if (!tf) return "No Terraform file provided.";

      const errors = [];

      if (!tf.includes("resource"))
        errors.push("Missing 'resource' block.");

      if (tf.includes("{") && !tf.includes("}"))
        errors.push("Unclosed block '}'.");
      
      return JSON.stringify({
        result: "Terraform Validation Complete",
        errors,
        raw: tf.slice(0, 800)
      });
    }
  };
}
