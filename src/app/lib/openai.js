const apiUrl = 'https://api.openai.com/v1/images/generations';

// async function generateImage (prompt, apiKey){
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

//   const data = await response.json();
//   return data.data;
// };

async function generateImage(){

    const response = await fetch('https://cataas.com/cat')
    return response.blob()  
}

export default generateImage;