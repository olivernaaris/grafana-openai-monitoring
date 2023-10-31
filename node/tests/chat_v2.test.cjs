const OpenAI = require('openai');
const { expect } = require('chai');

describe('chat_v2 Test', () => {
  let openai;
  let monitor_v2;

  before(async () => {
    // Initialize OpenAI client
    openai = new OpenAI({
      apiKey: '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',
    });

    const monitoringOptions = {
      metrics_url: 'YOUR_PROMETHEUS_METRICS_URL',
      logs_url: 'YOUR_LOKI_LOGS_URL',
      metrics_username: 'YOUR_METRICS_USERNAME',
      logs_username: 'YOUR_LOGS_USERNAME',
      access_token: 'YOUR_ACCESS_TOKEN',
    };

    // Use dynamic import to import the ES module and call the function
    const module = await import('../src/chat_v2.js');
    monitor_v2 = module.default; // Assuming 'createMonitor_v1' is the default export
    monitor_v2(openai, monitoringOptions);
  });

  it('should return a response with object as "chat.completion"', async () => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });    

    // Assertion: Check if response.object is 'text_completion'
    expect(chatCompletion.object).to.equal('chat.completion');
  });

  // Add more test cases as needed

  after(() => {
    // Clean up or perform any necessary teardown
  });
});
