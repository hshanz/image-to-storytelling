import styles from './page.module.css'
import generateImage from './lib/openai'
import Image from 'next/image'

export default async function Home() {
  const link =  'https://oaidalleapiprodscus.blob.core.windows.net/private/org-eD3kAsNhHAxrkFMORPJyd4fJ/user-xEsKyOeJcuQxEO4yhNfBxzno/img-VGTrhNFJogZgTh9VcJJ3v1NH.png?st=2023-03-30T12%3A35%3A59Z&se=2023-03-30T14%3A35%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-30T13%3A25%3A51Z&ske=2023-03-31T13%3A25%3A51Z&sks=b&skv=2021-08-06&sig=vW4EaJnmpX6JHfupb2ai1M4O2h7MfqUDfY2G3/IMai4%3D'
  const apikey = process.env.API_KEY
  const genImage = await generateImage() 

  return (
    <main className={styles.main}>
      <div className={styles.textHolder}>
        <form className={styles.formBox}>
          <input type='text' className={styles.promptBox} placeholder='Enter your prompt' />
          <input className={styles.promptSubmit} type='button' value='Submit prompt'></input>
        </form>

        <textarea className={styles.textBox} placeholder='asdasd asdasdas asdasdasd asdasda asdasdasd asdasdasd asdas'/>

      </div>

      <div className={styles.pictureBox}>
        <img src='https://cataas.com/cat' alt='cat' className={styles.picHolder}/>
        <img src='https://cataas.com/cat' className={styles.picHolder} alt='cat2'/>
      </div>



    </main>
  )
}
