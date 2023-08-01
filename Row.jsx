import { useState } from 'react';
import classes from  './Row.module.css';

function Row(props) {
    
    // const [isValid, setIsValid] = useState(true)
    const isValid = props.isValid
    const setIsValid = props.setIsValid

    const pattern = props.pattern
    const word = props.word

    function handleBoxClick(i)
    {
        function replaceAt(word, i, c) {
            let s = ""
            for (let j = 0; j < 5; j ++) {if (j != i) {s += word[j]} else {s += c}} return s
        }
        
        let newPattern
        if (pattern[i] == 'r') {
            newPattern = replaceAt(pattern, i, 'y')
        } else if (pattern[i] == 'y') {
            newPattern = replaceAt(pattern, i, 'g')
        } 
        else {
            newPattern = replaceAt(pattern, i, 'r')
        }
        
        if (props.validPats.includes(newPattern)){
            setIsValid(true)
        } else {
            setIsValid(false)
        }
        props.handleClick(newPattern)
    }


    const charList = []     
    for (let i = 0; i < 5; i ++){
        if (pattern[i] == "r") {
            charList.push(<div onClick = {() => handleBoxClick(i)} className={classes.grey}>{word[i]}</div>)
        }
        else if (pattern[i] == "y") {
            charList.push(<div onClick = {() => handleBoxClick(i)} className={classes.yellow}>{props.word[i]}</div>)
        }
        else {
            charList.push(<div onClick = {() => handleBoxClick(i)} className={classes.green}>{props.word[i]}</div>)
        }
    }


    return (
    <>
        <div className={classes.row}>
            {charList}
        </div>
        {! isValid && <p className={classes.notValid} >Not Valid Pattern</p>}
    </>
    
  )
  
}

export default Row;