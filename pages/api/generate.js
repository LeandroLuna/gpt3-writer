import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

let writer = 'Shakespeare';
const basePromptPrefix = `
  Complete the given history description below in the style of ${writer}.

  Description:
  `;

const generateAction = async (req, res) => {
  const baseCompletation = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletation.data.choices.pop();

  writer = 'Dostoievski';

  const secondPrompt = `
  Take the history tale below and deepen the scenario like ${writer}.

  History tale: ${basePromptOutput.text}

  Detailed history:
  `;

  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 500,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
