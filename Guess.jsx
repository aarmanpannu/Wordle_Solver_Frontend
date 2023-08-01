
import classes from './Guess.module.css';

function Guess(props) {
    return (
        <li className={classes.guess}>
            <p className={classes.author}>{props.author}</p>
            <p className={classes.body}>{props.body}</p>
        </li>
    )

}

export default Guess;