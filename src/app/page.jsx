"use client";
import styles from "./page.module.css";
import { generateImage, createPrompt, getEmotions, getImage } from "./lib/openai.mjs";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([{}]);
  const [words, setWords] = useState('')
  const [text, setText] = useState("Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.");
  const textArea = useRef();
  

  useEffect(() => {
    const dalleImage = async (inputprompt) => {
      const data = await generateImage(inputprompt);
      setImages(data.data);
      console.log('New image')
    };

    const getPrompt = async (story) =>{
      console.log(story)
      const prompt = await createPrompt(story)
      console.log(prompt)
      dalleImage(prompt)

    }

    const interval = setInterval(() => {
     getPrompt(textArea.current.value)
     console.log('Done')

    }, 90000);

    dalleImage('Evening, Forest, Lost, Old House and Rain, abstract')
    console.log('start')

    return () => clearInterval(interval);
   

  }, []);





  return (
    <main className={styles.main}>
      

      <div className={styles.contentHolder}>
        <div className={styles.textHolder}>
        <div className={styles.headers}>
        <span className={styles.header}> Chat-GPT & DALL-E Writing tool </span>
        <span className={styles.inspo} ><b>Inspiration:</b> Evening, Forest, Lost, Old house, Rain</span>
        </div>

          <textarea
            className={styles.textBox}
            defaultValue={text}
            ref={textArea}
            onChange={(e) => setWords(e.target.value)} 
          ></textarea>

        <span className={styles.inspo} > {words.split(' ').length} <b>words</b></span>
        </div>


        <div className={styles.pictureBox}>

          <img
            src={images[0]?.url}
            alt="cat"
            className={styles.picHolder}
          />


        </div>


      </div>

    </main>
  );
}

