
import classes from './EntropyStats.module.css'

function EntropyStats (props) {

    return (
        <ul className={classes.stats}>
            <li className={classes.contentLeft}>Expected Entropy: {props.expEnt}</li>
            <li className={classes.contentCenter}>Actual Entropy: {props.actEnt}</li>
            <li className={classes.contentRight}>Number of Words: {props.remWords}</li>
        </ul>
    )

}

export default EntropyStats