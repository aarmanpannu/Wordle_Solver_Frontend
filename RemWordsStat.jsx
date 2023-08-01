import classes from  './RemWordsStat.module.css';

function RemWordStat(props) {
    const num = props.remWordNum
    const turn = props.turn
    
    return (
    <ul className={classes.stats}>
      <li className={classes.contentLeft}>Number of Words:  {num}</li>
      <li className={classes.contentRight}>Turn: {turn}</li>
    </ul>

    

    )
  }
  
  export default RemWordStat;