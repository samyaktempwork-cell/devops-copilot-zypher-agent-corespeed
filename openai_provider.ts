
import { Observable } from "npm:rxjs";

export class OpenAIProvider {
  apiKey: string;
  model: string;

  constructor(apiKey: string, model = "gpt-4.1-mini") {
    this.apiKey = apiKey;
    this.model = model;
  }


  streamChat(messages: { role: string; content: string }[]) {
    return new Observable((subscriber) => {

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: false
        })
      })
        .then(res => res.json())
        .then(data => {
          const text = data.choices?.[0]?.message?.content ?? "";

          subscriber.next({
            type: "text",
            content: text
          });

          subscriber.complete();
        })
        .catch(err => subscriber.error(err));
    });
  }
}
