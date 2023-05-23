import { useEffect, useRef } from "react";
import styles from "./DotSelector.module.css";

const DotSelector = ({setIndex, _index}) => {
    const index = _index;
    let selected = index-1
    const parentNode =useRef(null)

    useEffect(() =>{
        for (const child of parentNode.current.childNodes) {
            child.classList.remove(styles.selected)
            child.classList.remove(styles.disabled)
        }

        for(let i = 4; i > index -1 ; i--){
            let child = parentNode.current.childNodes.item(i)
            child.classList.remove(styles.selected)
            child.classList.add(styles.disabled)
        }

        let temp = parentNode.current.childNodes.item(selected)
        temp.classList.add(styles.selected)
        setIndex(selected)

    },[_index])

    const handleClick = (e) => {
        for(let i = 4; i > -1 ; i--){
            let child = parentNode.current.childNodes.item(i)
            child.classList.remove(styles.selected)
            if(child == e.target){
                selected = i
            }
        }
    
       e.target.classList.add(styles.selected)
       setIndex(selected)
    }


    return (
        <div ref={parentNode} className={styles.holder}>
            <div onClick={(e) => handleClick(e)} className={styles.dot}></div>
            <div onClick={(e) => handleClick(e)} className={styles.dot}></div>
            <div onClick={(e) => handleClick(e)} className={styles.dot}></div>
            <div onClick={(e) => handleClick(e)} className={styles.dot}></div>
            <div onClick={(e) => handleClick(e)} className={styles.dot}></div>
           
        </div>
    )
}

export default DotSelector