"use client";
import styles from "./page.module.css";
import { generateImage, createPrompt, getEmotions, getImage } from "./lib/openai.mjs";
import { useEffect, useRef, useState } from "react";
import DotSelector from "./components/DotSelector";

export default function Home() {
  const [images, setImages] = useState([{}]);
  const [text, setText] = useState("Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.");
  const [index, setIndex] = useState(1)
  const [pictures, setPictures] = useState(['bild1.JPG','bild2.JPG','bild3.JPG','bild4.JPG','bild5.JPG'])
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

    // const interval = setInterval(() => {
    //  getToneEmotion(textArea.current.value)
    //  getPrompt(textArea.current.value)
    //  console.log('Done')

    // }, 90000);


    // return () => clearInterval(interval);
    
  }, []);

  useEffect(() =>{
    console.log(index)
  },[index])



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
          ></textarea>
        </div>

        <div className={styles.pictureBox}>
          <DotSelector setIndex={setIndex} _index={pictures.length} />

          <img
            src={pictures[index]}
            alt="cat"
            className={styles.picHolder}
          />

          <div className={styles.genreateField}>
            <div className={styles.input} >
              <input className={styles.inputField} type="text" placeholder=" e.g cartoon, realistic, abstract"></input> 
              <span className={styles.inputHint}>Keep it empty to generate a random style picture!</span>
            </div>
            
            <button className={styles.genButton} onClick={() => setPictures([...pictures,2])}>Generate</button>

          </div>
        

        </div>


      </div>

    </main>
  );
}

