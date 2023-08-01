import Guess from './Guess';
import classes from './GuessList.module.css'

function GuessList() {
    return (
        <ul className={classes.guesses}>
            <Guess author = "Test1" body="test2"/>
            <Guess author = "Test4" body="test3" />    
            <Guess author = "Test4" body="test3" />    
        </ul>
    );
}

export default GuessList;