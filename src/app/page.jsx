"use client";
import styles from "./page.module.css";
import { generateImage, createPrompt, getEmotions, getImage } from "./lib/openai.mjs";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([{}]);
  const [text, setText] = useState("Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.");
  const [tone, setTone] = useState('Optimistic and hopeful with a bit of anticipation and something')
  const [emotions, setEmotions] = useState({
    Happy: "#ffdab9",
    Sad: "#add8e6",
    Angry: "#ff7f50",
    Calm: "#90ee90"
  })
  const textArea = useRef();
  

  useEffect(() => {
    const dalleImage = async (inputprompt) => {
      const data = await generateImage(inputprompt);
      setImages(data.data);
      console.log('New image')
    };

    const getToneEmotion = async(message) =>{
      const data = await getEmotions(message);
      setEmotions(data.Emotions)
      setTone(data.Tone)
      console.log('New emotions and tone')
    }

    const getPrompt = async (story) =>{
      const prompt = await createPrompt(story)
      dalleImage(prompt)

    }

    const interval = setInterval(() => {
     getToneEmotion(textArea.current.value)
     getPrompt(textArea.current.value)
     console.log('Done')

    }, 60000);

    dalleImage('Evening, Forest, Lost, Old House and Rain, abstract')
    console.log('start')

    return () => clearInterval(interval);
   

  }, []);



  return (
    <main className={styles.main}>
      <span className={styles.header}> Chat-GPT & DALL-E Writing tool </span>

      <div className={styles.contentHolder}>
        <div className={styles.textHolder}>
        <div className={styles.inspoTags}> 
          <div className={styles.tag} style={{'backgroundColor':'rgb(107, 107, 107)', 'color':"white"}}>Inspiration:</div>
          <div className={styles.tag}>Evening</div>
          <div className={styles.tag}>Forest</div>
          <div className={styles.tag}>Lost</div>
          <div className={styles.tag}>Old House</div>
          <div className={styles.tag}>Rain</div>
        </div>

          <textarea
            className={styles.textBox}
            defaultValue={text}
            ref={textArea}
          ></textarea>
        </div>

        <div className={styles.pictureBox}>
        <div className={styles.emotionHolder}>
          <div className={styles.emotionHeader}>Emotions</div>
          {Object.entries(emotions).map((e,index) => {return (<div key={index} className={styles.emotionBox} style={{ 'backgroundColor':e[1]}}>{e[0]}</div>)})}
          
        </div>

          <img
            src={images[0]?.url}
            alt="cat"
            className={styles.picHolder}
          />
          
        

        

        <div className={styles.emotionHolder}>
        <span className={styles.emotionHeader}> Tone </span>
          <div className={styles.emotionHeader}>{tone}</div>
          
        </div>

        

        </div>


      </div>

    </main>
  );
}

