import { chat_v2 } from 'grafana-openai-monitoring';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', 
});

// Patch method
chat_v2.monitor(openai, {
  metrics_url: "https://prometheus-prod-13-prod-us-east-0.grafana.net/api/prom",
  logs_url: "https://logs-prod-006.grafana.net/loki/api/v1/push",
  metrics_username: 1255165,
  logs_username: 726628,
  access_token: "glc_eyJvIjoiNjUyOTkyIiwibiI6InN0YWNrLTc3MzYzMi1pbnRlZ3JhdGlvbi1pc2hhbmFhIiwiayI6Ilk1NXV0OHFMZzg3QVMyUTUyNnZYTVcxbiIsIm0iOnsiciI6InByb2QtdXMtZWFzdC0wIn19"
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion);
}


main();