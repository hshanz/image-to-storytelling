import { Configuration, OpenAIApi } from "openai";

const secret = process.env.NEXT_PUBLIC_API_KEY;

const configuration = new Configuration({
  apiKey: secret,
});
const openai = new OpenAIApi(configuration);

//const apiUrl = 'https://api.openai.com/v1/images/generations';

// export async function generateImage (prompt){
//   const response = await fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: 'image-alpha-001',
//       prompt: prompt,
//       size: '256x256',
//       response_format: 'url',
//       n: 1,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to generate image: ${response.statusText}`);
//   }

//   console.log('Done')
//   const data = await response.json();
//   console.log('Server data: ',data)
//   return data.data;
// };

export const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  return response.data;
};

export const createPrompt = async (message) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Your job is to create prompts to the image generation AI DALL-E using short storys. The prompts should be inspiring and a bit abstract. Your prompts should include a description, notes and image tags",
      },
      {
        role: "user",
        content: `Convert this story to a DALL-E prompt: ${message}`,
      },
    ],
  });

  return completion.data;
};

export const getEmotions = async (message) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Your job is to classify the emotion and tone of short storys in 15 words or less, Your output should be Emotions: *emotions* , Tone: *tone of story* ",
      }, 
      {
        role: 'user',
        content: `Classify this story ${message}`
      }
    ],
  });

  return completion.data;
};
