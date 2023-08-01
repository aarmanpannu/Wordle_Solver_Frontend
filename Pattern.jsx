// today
import classes from  './Pattern.module.css';
import { useState } from 'react';

function Pattern(props) {
    
    let x = props.scale
    let pattern = props.pattern
    let curPattern = props.curPattern
    let myStyle = {
        width: `${60*x}px`,
        height: `${60*x}px`,
        border: `${1*x}px solid #bbb`,
        margin: `${4*x}px`,
        lineHeight: `${60*x}px`,
        fontSize: `${2.5*x}em`,
        fontWeight: 900,
    }

    let index = [0, 1, 2, 3, 4]
    let characters
    if (curPattern != pattern) {
        characters = index.map((i) => {
            if (pattern[i] == "r") {
                return <div style={myStyle} className={classes.greyDull}>{props.word[i]}</div>
            }
            else if (pattern[i] == "y") {
                return <div style={myStyle} className={classes.yellowDull}>{props.word[i]}</div>
            }
            else {
                return <div style={myStyle} className={classes.greenDull}>{props.word[i]}</div>
            }
        })
    } else {
        characters = index.map((i) => {
            if (pattern[i] == "r") {
                return <div style={myStyle} className={classes.grey}>{props.word[i]}</div>
            }
            else if (pattern[i] == "y") {
                return <div style={myStyle} className={classes.yellow}>{props.word[i]}</div>
            }
            else {
                return <div style={myStyle} className={classes.green}>{props.word[i]}</div>
            }
        })

    }


    // if clicked: console.log(pattern);



    return (
    <div onClick = {() => props.onPatternChange(pattern)}>
        <li className={classes.pattern}>
            {characters}
        </li>
    </div >
    )
    
  }
  
  export default Pattern;

  
