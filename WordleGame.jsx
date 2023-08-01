
import GuessContainer from "./GuessContainer";

import {useState, useEffect} from "react"

function WordleGame() {
    // for guess 1 
    const best0 = "salet"
    const [best1, setBest1] = useState('')
    const [pattern1, setPattern1] = useState()
    const [best2, setBest2] = useState('')
    const [pattern2, setPattern2] = useState()
    const [best3, setBest3] = useState('')
    const [pattern3, setPattern3] = useState()
    const [best4, setBest4] = useState('')
    const [pattern4, setPattern4] = useState()
    const [best5, setBest5] = useState('')
    const [pattern5, setPattern5] = useState()
    const [best6, setBest6] = useState('')
    const [pattern6, setPattern6] = useState()


    const [show2, setShow2] = useState(false)
    useEffect(() => {
      if ((pattern1 != 'ggggg') && best1) {
        setShow2(true)
      } else {
        setShow2(false)
      }
      }, 
      [best1, pattern1])

    const [show3, setShow3] = useState(false)
    useEffect(() => {
      if ((pattern2 != 'ggggg') && best2 && show2) {
        setShow3(true)
      } else {
        setShow3(false)
      }}, [best2, show2, pattern2])

    const [show4, setShow4] = useState(false)
    useEffect(() => {
      if ((pattern3 != 'ggggg') && best3 && show3) {
        setShow4(true) 
      } else {
        setShow4(false)
      }
      }, [best3, show3, pattern3])

    const [show5, setShow5] = useState(false)
    useEffect(() => {
      if ((pattern4 != 'ggggg') && best4 && show4) {
        setShow5(true)
      } else {
        setShow5(false)
      }
      }, [best4, show4, pattern4])

    const [show6, setShow6] = useState(false)
    useEffect(() => {
      if ((pattern5 != 'ggggg') && best5 && show5) {
        setShow6(true)
      } else {
        setShow6(false)
      }
      }, [best5, show5, pattern5])
    


    let url = "https://wordlesolverap.com/wordle/"
    
    
    // PROPPER WAY TO FETCH API DATA
    // fetch(url).then((res) => res.json()).then((json) => console.log(json))

    
    // Will eventually turn this into a button to play against a mahcine or not: <GuessList  />    
    return(
      <>
        {/* First Word/Pattern */}
        <GuessContainer 
          word = {best0} 
          url = {url} 
          setBest = {setBest1} 
          setPattern = {setPattern1}
          prevPat = {""}
          turn = {1}

          />
        
        {/* Second Word/Pattern */}
        {show2 && 
          <GuessContainer 
            word = {best1} 
            url = {url + best0 + '/' + pattern1 + '/'} 
            setBest = {setBest2} 
            setPattern = {setPattern2}
            prevPat = {pattern1}
            turn = {2}
          />}

        {/* Third Word/Pattern */}
        {show3 && 
          <GuessContainer 
            word = {best2} 
            url = {url + best0 + '/' + pattern1 + '/' + best1 + '/' + pattern2 + '/'} 
            setBest = {setBest3} 
            setPattern = {setPattern3}
            prevPat = {pattern2}
            turn = {3}
          />}

        {/* Fourth Word/Pattern */}
        {show4 && 
          <GuessContainer 
            word = {best3} 
            url = {url + best0 + '/' + pattern1 + '/' + best1 + '/' + pattern2 + '/'  + best2 + '/' + pattern3 + '/'} 
            setBest = {setBest4} 
            setPattern = {setPattern4}
            prevPat = {pattern3}
            turn = {4}
          />}
        
        {/* Fifth Word/Pattern */}
        {show5 && 
          <GuessContainer 
            word = {best4} 
            url = {url + best0 + '/' + pattern1 + '/' + best1 + '/' + pattern2 + '/'  + best2 + '/' + pattern3 + '/'  + best3 + '/' + pattern4 + '/'} 
            setBest = {setBest5} 
            setPattern = {setPattern5}
            prevPat = {pattern4}
            turn = {5}
          />}

        {/* Sixth Word/Pattern */}
        {show6 && 
          <GuessContainer 
            word = {best5} 
            url = {url + best0 + '/' + pattern1 + '/' + best1 + '/' + pattern2 + '/'  + best2 + '/' + pattern3 + '/'  + best3 + '/' + pattern4 + '/'  + best4 + '/' + pattern5 + '/'} 
            setBest = {setBest6} 
            setPattern = {setPattern6}
            prevPat = {pattern5}
            turn = {6}
          />}

      </>
    )
  }

export default WordleGame
