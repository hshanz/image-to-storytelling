"use client";
import styles from "./page.module.css";
import {generateImage,createPrompt, getEmotions} from "./lib/openai";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([{}]);
  const [prompt, setPrompt] = useState('A cute baby sea otter');
  const [text, setText] = useState("Once upon a time there was a cat going to a castle, to find food. The cat was happy but very hungry, but the prospect of food made the cat very excited for the future.");
  const [gptOut,setGpt] = useState('placeholder')
  const textArea = useRef();

  useEffect(() => {
    // const dalleImage = async (inputprompt) => {
    //   const data = await generateImage(inputprompt);
    //   setImages(data.data);
    //   console.log('data: ', data)
    //   console.log('prompt: ',inputprompt)
    // };

    // const interval = setInterval(() => {
    //  console.log("new image");
    //  console.log(textArea.current.value);
    // }, 10000);

    // dalleImage(prompt);

    // return () => clearInterval(interval);

    const gptPrompt = async() => {
      const data = await getEmotions(text)
      console.log(data.choices[0].message)
      setGpt(data.choices[0].message.content)
    }

    gptPrompt()

  }, [prompt]);

  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setPrompt(formData.get("prompt"));
  };

  return (
    <main className={styles.main}>
      <div className={styles.textHolder}>
        <form className={styles.formBox} onSubmit={handelSubmit}>
          <input
            type="text"
            name="prompt"
            className={styles.promptBox}
            placeholder="Enter your prompt"
          />
          <input
            className={styles.promptSubmit}
            type="submit"
            value="Submit prompt"
          ></input>
        </form>

        <textarea
          className={styles.textBox}
          defaultValue={text}
          ref={textArea}
        ></textarea>
      </div>

      <div className={styles.pictureBox}>
        <img
          src={images[0]?.url}
          alt="cat"
          className={styles.picHolder}
        />
        <div className={styles.picHolder}>{gptOut}</div>
      </div>
    </main>
  );
}
