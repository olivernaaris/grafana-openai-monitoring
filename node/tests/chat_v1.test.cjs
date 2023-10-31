const OpenAI = require('openai');
const { expect } = require('chai');

describe('chat_v1 Tests', () => {
  let openai;
  let monitor_v1;

  before(async () => {
    // Initialize OpenAI client
    openai = new OpenAI({
      apiKey: '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',
    });

    const monitoringOptions = {
      metrics_url: 'https://prometheus-prod-13-prod-us-east-0.grafana.net/api/prom',
      logs_url: 'https://logs-prod-006.grafana.net/loki/api/v1/push',
      metrics_username: 1255165,
      logs_username: 726628,
      access_token: 'glc_eyJvIjoiNjUyOTkyIiwibiI6InN0YWNrLTc3MzYzMi1pbnRlZ3JhdGlvbi1pc2hhbmFhIiwiayI6Ilk1NXV0OHFMZzg3QVMyUTUyNnZYTVcxbiIsIm0iOnsiciI6InByb2QtdXMtZWFzdC0wIn19',
    };

    // Use dynamic import to import the ES module and call the function
    const module = await import('../src/chat_v1.js');
    monitor_v1 = module.default; // Assuming 'createMonitor_v1' is the default export
    monitor_v1(openai, monitoringOptions);
  });

  it('should return a response with object as "text_completion"', async () => {
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: 'Say this is a test.',
      max_tokens: 7,
      temperature: 0,
    });

    // Assertion: Check if response.object is 'text_completion'
    expect(completion.object).to.equal('text_completion');
  });

  // Add more test cases as needed

  after(() => {
    // Clean up or perform any necessary teardown
  });
});
