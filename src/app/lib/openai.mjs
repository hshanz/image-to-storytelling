import { Configuration, OpenAIApi } from "openai";

const secret = process.env.NEXT_PUBLIC_API_KEY;

const configuration = new Configuration({
    apiKey: secret,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (prompt,style) => {
    const response = await openai.createImage({
        prompt: prompt + ' in style ' +style,
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
                    "Your job is to create prompts to the image generation AI DALL-E using short storys. Your prompts should include a description",
            },
            {
                role: "user",
                content: `Convert this story to a DALL-E prompt: ${message}`,
            },
        ],
    });

    return completion.data.choices[0].message.content;
};

export const getEmotions = async (message) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content:
                    "Your job is to classify the emotion and tone of short storys. I want at least four(very important) emotions in json format, where the keys are the emotions(keys should be in pascal case) and the value should be an associated pastel color in hexcode. The tone of the text should be descriptive text in 15 words or less. The respone should follow this JSON schema {Emotions: {emotion: color}, Tone: *Short text*} "
            },
            {
                role: 'user',
                content: `Classify this story ${message}`
            }
        ],
    });

    
    const json = JSON.parse(completion.data.choices[0].message.content)
    return json;
    
};

export const getImage = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json()

    //console.log(data)
    return data
}
//getEmotions('Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.')
const test = {
    "Emotions": {
      "Happy": "#FBE5C8",
      "Excited": "#FFE4E1",
      "Hungry": "#FA8072"
    },
    "Tone": "Optimistic and hopeful with a bit of anticipation."
  }

  