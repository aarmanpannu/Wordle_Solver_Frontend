
import Pattern from './Pattern';
import classes from './PatternsList.module.css';


function PatternsList(props) {
    
    const word = props.word
    const patterns = props.patterns 
    const numPatterns = patterns.length
    let ncol



    if (numPatterns > 126) { ncol = 10 } 
        else if (numPatterns > 96) { ncol = 9}
        else if (numPatterns > 70) { ncol = 8}
        else if (numPatterns > 48) { ncol = 7}
        else if (numPatterns > 30) { ncol = 6}
        else if (numPatterns > 20) { ncol = 5}
        else if (numPatterns > 12) { ncol = 4}
        else if (numPatterns > 6) { ncol = 3}
        else if (numPatterns > 3) { ncol = 2}
        else {ncol = 1}    
    
    // Styling!!!
    let cols = ""
    for (let i = 0; i < ncol; i++){
        cols += "auto "
    }
    let x = 700/(340 * ncol)
    let myStyles = {
    columnGap: `${x*10}px`,
    gridTemplateColumns: `${cols}`,
    }

    
    let patternList = patterns.map((pattern) => {
        return <Pattern scale = {x} word = {word} pattern = {pattern} curPattern = {props.curPattern} key={pattern} onPatternChange = {props.onPatternChange}/>
    })

    return (
        <div style = {myStyles} className={classes.container}>
            {patternList}
        </div>
        )
}

export default PatternsList
