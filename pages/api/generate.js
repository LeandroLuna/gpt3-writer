import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

const basePromptPrefix = '';
const generateAction = async (req, res) => {
  const baseCompletation = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletation.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
