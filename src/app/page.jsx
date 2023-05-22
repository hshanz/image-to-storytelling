"use client";
import styles from "./page.module.css";
import { generateImage, createPrompt, getEmotions, getImage } from "./lib/openai.mjs";
import { useEffect, useRef, useState } from "react";
import DotSelector from "./components/DotSelector";

export default function Home() {
  const startImage = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-eD3kAsNhHAxrkFMORPJyd4fJ/user-xEsKyOeJcuQxEO4yhNfBxzno/img-nBxINkGcMeYzgmAVotz5Xv6z.png?st=2023-05-22T19%3A40%3A25Z&se=2023-05-22T21%3A40%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-22T05%3A48%3A10Z&ske=2023-05-23T05%3A48%3A10Z&sks=b&skv=2021-08-06&sig=75ik2pHmmkbJKeQi3kmhqV%2B2dA96Pkec7LIKZvpdFNA%3D'
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
          <DotSelector setIndex={setIndex} _index={pictures.length} />

          <img
            src={pictures[index]}
            alt="cat"
            className={styles.picHolder}
          />

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

