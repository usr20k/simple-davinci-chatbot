import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Write a python program that merges two already sorted linked lists in sorted order. You must do it in place. The linked list object has a field called val that contains an integer value and a field called next that either contains the next linked list object or is null if it is the end of the list.\n",
  temperature=0,
  max_tokens=100,
  top_p=1.0,
  frequency_penalty=0.2,
  presence_penalty=0.0,
  stop=["\n"]
)

print(response)

input = ""


