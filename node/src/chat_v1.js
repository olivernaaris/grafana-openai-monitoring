import OpenAI from 'openai';
import { check, calculateCost, sendMetrics } from './__helpers.js';

export default function monitor_v1(openai, options = {}) {
  const {
    metrics_url,
    logs_url,
    metrics_username,
    logs_username,
    access_token,
  } = options;
  
  const validatedURL = check(metrics_url, logs_url, metrics_username, logs_username, access_token)

  // Save original method
  const originalCreate = openai.completions.create;
  
  // Define wrapped method
  openai.completions.create = async function(params) {
    const start = performance.now();

    // Call original method
    const response = await originalCreate.call(this, params);

    const end = performance.now();
    const duration = end - start;
    
    const cost = calculateCost(params.model, response.usage.prompt_tokens, response.usage.completion_tokens);
    console.log(`Cost: $${cost}`);

    const metrics = [
      // Metric to track the number of completion tokens used in the response
      `openai,job=integrations/openai,source=node_chatv1,model=${response.model} completionTokens=${response.usage.completion_tokens}`,
    
      // Metric to track the number of prompt tokens used in the response
      `openai,job=integrations/openai,source=node_chatv1,model=${response.model} promptTokens=${response.usage.prompt_tokens}`,
    
      // Metric to track the total number of tokens used in the response
      `openai,job=integrations/openai,source=node_chatv1,model=${response.model} totalTokens=${response.usage.total_tokens}`,
    
      // Metric to track the duration of the API request and response cycle
      `openai,job=integrations/openai,source=node_chatv1,model=${response.model} requestDuration=${duration}`,
    
      // Metric to track the usage cost based on the model and token usage
      `openai,job=integrations/openai,source=node_chatv1,model=${response.model} usageCost=${cost}`,
    ];

    sendMetrics(validatedURL.metrics_url, metrics_username, access_token, metrics)
    .catch((error) => {
      console.error(error.message);
    });
    

    // Return original response
    return response;

  };

}