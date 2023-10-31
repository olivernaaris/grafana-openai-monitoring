import OpenAI from 'openai';
import monitor_v1 from './node/src/chat_v1.js';

const openai = new OpenAI({
  apiKey: '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', 
});

// Patch method
monitor_v1(openai, {
  metrics_url: "https://prometheus-prod-13-prod-us-east-0.grafana.net/api/prom",
  logs_url: "https://logs-prod-006.grafana.net/loki/api/v1/push",
  metrics_username: 1255165,
  logs_username: 726628,
  access_token: "glc_eyJvIjoiNjUyOTkyIiwibiI6InN0YWNrLTc3MzYzMi1pbnRlZ3JhdGlvbi1pc2hhbmFhIiwiayI6Ilk1NXV0OHFMZzg3QVMyUTUyNnZYTVcxbiIsIm0iOnsiciI6InByb2QtdXMtZWFzdC0wIn19"
});

async function main() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Say this is a test.",
    max_tokens: 7,
    temperature: 0,
  });

// Assertion example: Check if response.object is 'text_completion'
if (completion.object === 'text_completin') {
  console.log("Assertion passed: Response object is 'text_completion'");
} else {
  throw new Error("Assertion failed has failed");
}

  console.log(completion);
}
main();