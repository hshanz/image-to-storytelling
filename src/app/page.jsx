"use client";
import styles from "./page.module.css";
import generateImage from "./lib/openai";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [images, setImages] = useState();
  const [prompt, setPrompt] = useState();
  const [text, setText] = useState("Once upon a time");
  const textArea = useRef();

  useEffect(() => {
    const dalleImage = async (prompt1) => {
      const data = await generateImage();
      setImages(data);
    };

    const interval = setInterval(() => {
      console.log("new image");
      console.log(textArea.current.value);
    }, 10000);

    dalleImage(prompt);

    return () => clearInterval(interval);
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
          src="https://cataas.com/cat"
          alt="cat"
          className={styles.picHolder}
        />
        <img
          src="https://cataas.com/cat"
          className={styles.picHolder}
          alt="cat2"
        />
      </div>
    </main>
  );
}
