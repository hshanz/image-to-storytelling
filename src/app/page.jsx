"use client";
import styles from "./page.module.css";
import { generateImage, createPrompt, getEmotions, getImage } from "./lib/openai.mjs";
import { useEffect, useRef, useState } from "react";
import DotSelector from "./components/DotSelector";

export default function Home() {
  const startImage = 'https://cdn.leonardo.ai/users/75d00840-3fce-47fd-b4b0-a621bd5f9f69/generations/e5ded7d8-7921-41a1-831e-d493149b84ff/DreamShaper_v5_A_rustic_cabin_in_the_middle_of_a_dense_dark_fo_0.jpg'
  const [images, setImages] = useState([{}]);
  const [words, setWords] = useState('')
  const [text, setText] = useState("Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.");
  const [index, setIndex] = useState(0)
  const [pictures, setPictures] = useState([startImage])
  const textArea = useRef();
  const genInput = useRef();
  

  const dalleImage = async (inputprompt) => {
    const styleIn = genInput.current.value
    const data = await generateImage(inputprompt, styleIn);
    setPictures([...pictures,data.data[0]?.url])
    console.log('New image')
  };

  const getPrompt = async (story) =>{
    const prompt = await createPrompt(story)
    dalleImage(prompt)

  }
  const genPictures = async (e) =>{
    if(pictures.length >= 4){
      e.target.classList.add(styles.disabled)
    }

    await getPrompt(textArea.current.value)
  }




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
            src={pictures[index]}
            alt="cat"
            className={styles.picHolder}
          />

          <DotSelector setIndex={setIndex} _index={pictures.length} />

          <div className={styles.genreateField}>
            <div className={styles.input} >
              <input ref={genInput} className={styles.inputField} type="text" placeholder=" e.g cartoon, realistic, abstract"></input> 
              <span className={styles.inputHint}>Keep it empty to generate a random style picture!</span>
            </div>
            
            <button className={styles.genButton} onClick={(e) => genPictures(e)}>Generate</button>

          </div>
        

        </div>


      </div>

    </main>
  );
}

