
"""
Test module for chat_v2 function.
"""

import os
import openai
from grafana_openai_monitoring import monitor

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Apply the custom decorator to the OpenAI API function
openai.ChatCompletion.create = monitor.chat_v2(
    openai.ChatCompletion.create,
    metrics_url=os.getenv("PROMETHEUS_URL"),
    logs_url=os.getenv("LOKI_URL"),
    metrics_username=os.getenv("PROMETHEUS_USERNAME"),
    logs_username=os.getenv("LOKI_USERNAME"),
    access_token=os.getenv("GRAFANA_CLOUD_ACCESS_TOKEN")
)

# Now any call to openai.ChatCompletion.create will be automatically tracked
response = openai.ChatCompletion.create(model="gpt-4",
                                        max_tokens=1,
                                        messages=
                                            [
                                                {
                                                    "role": "user",
                                                    "content": "What is Grafana?"
                                                }
                                            ]
                                        )

# Assert on the response status code
assert response['object'] == 'chat.completion'
