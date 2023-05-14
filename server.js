/*
A Simple davinci-based chatbot by Steven McDonald, 2023.
*/

const express = require('express');
const {OpenAIApi, Configuration} = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("./images"));
app.use(express.static('public'));

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const model = 'text-davinci-003'
const maxTokens = 300

// Uncomment the below to test if your key/org is working prior to starting using the frontend:

// async function testFunc() {
//   const test = await openai.createCompletion({
//     model: model,
//     prompt: "Hello OpenAI!",
//     max_tokens: 40,
//     temperature: 0
//   });
  
//   console.log(test)
// }

// testFunc();

app.post('/generate-text', async (req, res) => {
  try {
    const text = req.body.text;

    const response = await openai.createCompletion({
      model: model,
      prompt: text,
      max_tokens: maxTokens,
      n: 1,
      temperature: 0
    });

    console.log(res)
    res.json({ response: response.data.choices[0].text.trim() });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
