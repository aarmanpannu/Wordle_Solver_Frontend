import classes from  './RemWordList.module.css';


function RemWordList (prop) {
    
    // prop.rem_words = 
    let rem_words_list = prop.remWordsList
    let rem_words = ""
    
    for (let i in rem_words_list) {
        rem_words += rem_words_list[i]
        rem_words += ", "
    }
    rem_words = rem_words.slice(0,-2)    

    let containerStyle = {
        overflowY: "scroll",
        position: "static",
    }

    if (rem_words_list.length > 99) {
        containerStyle.height = "140px"
    }

    return (
        <div  style = {containerStyle} className={classes.remWords}>
            <p className={classes.title}> Remaining Words </p>
            <p className={classes.body}>{rem_words}</p>
        </div>
    )
}

export default RemWordList