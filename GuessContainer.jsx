import { useState, useEffect, useRef } from 'react'
import {Chart as ChartJS} from 'chart.js'

import classes from './GuessContainer.module.css';

import Row from './Row';
import PatternsList from './PatternsList';
import RemWordList from './RemWordList';
import BarChart from './BarChart';
import EntropyStats from './EntropyStats';
import RemWordStat from './RemWordsStat';
import GuessList from './GuessList';


function GuessContainer(props) {

  const [pattern, setPattern] = useState('rrrrr')
  const [posPatterns, setPosPatterns] = useState([])
  const [expEnt, setExpEnt] = useState()
  const [remWordNum, setRemWordNum] = useState()
  const [patternSelected, setPatternSelected] = useState(false)
  const [patternLoaded, setPatternLoaded] = useState(false)
  const [patternFreq, setPatternFreq] = useState()
  const [actEnt, setActEnt] = useState()
  const [postGuessNumWords, setPostGuessNumWords] = useState()
  const [remWords, setRemWords] = useState()
  const [posFreqs, setPosFreqs] = useState()
  const [timeLapse, settimeLapse] = useState(false)

  const [patChange, setPatChange] = useState(false)
  const [prevPatChange, setPrevPatChange] = useState(false)
  const [isValid, setIsValid] = useState(true)

  // determines if initial load
  const [initialRender, setInitialRender] = useState(true);
  const [firstClick, setFirstClick] = useState(true);
  

  
  function handleClick(clickedPattern) {
    if (pattern != clickedPattern || firstClick) {
      setPatChange(true)
      setFirstClick(false)
      if (posPatterns.includes(clickedPattern)) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }
    setPattern(clickedPattern)


    // not sure if I need this
    setPatternSelected(true)
  }
  

  // fetching word data 
  // initial rendering and when previous pattern changes
  useEffect (() => {
    async function fetchWordData(url, word) {
      let response = await fetch(url + word)
      let resData = await response.json()
      let newData = Object.assign({}, resData.patterns)
      
      setPatternFreq(newData)
      setPosPatterns(Object.keys(newData))
      
      setExpEnt(resData.exp_entropy)
      setRemWordNum(resData.num_rem_words)
    }
    
    // been rendered before... i.e. changed previous pattern
    if (! initialRender) {
      setPattern('rrrrr')
      setPatternLoaded(false)
      setFirstClick(false)
      props.setBest('')
    }

    fetchWordData(props.url, props.word)
  
  }, [props.prevPat])


  // fetching pattern data 
  useEffect (() => {
    const abortController = new AbortController()
    
    async function fetchPatternData(url, word, pattern) {
      let response = await fetch(
        url + word + "/" + pattern, {
          signal: abortController.signal
        }
      )
      let resData = await response.json()
      setActEnt(resData.actual_entropy)
      setPostGuessNumWords(resData.num_rem_words)
      setRemWords(resData.rem_words)
      props.setBest(resData.best_guess)
      props.setPattern(pattern)
      setPatternLoaded(true)
      
    }

    if (initialRender) {
      setInitialRender(false)
      setPatChange(false)
    } else {
        fetchPatternData(props.url, props.word, pattern)
        setPatChange(false)
        return () => abortController.abort()
    }

  }, [patChange])

  
  let word = props.word
  
  return(
    <div className={classes.container}>  
        <Row word = {word} pattern = {pattern} validPats = {posPatterns} handleClick = {handleClick}  isValid = {isValid} setIsValid = {setIsValid}/>
        <RemWordStat remWordNum = {remWordNum} turn = {props.turn}/>
        <PatternsList word = {word} patterns={posPatterns} curPattern = {pattern} onPatternChange = {handleClick}/>
        {patternLoaded && <BarChart pattern = {pattern} patterns={patternFreq} onPatternChange = {handleClick} /> }
        {patternLoaded && <EntropyStats expEnt={expEnt} actEnt = {actEnt} remWords = {postGuessNumWords} />}
        {patternLoaded && <RemWordList remWordsList = {remWords}/>}
    </div>
  )
}
  
  
export default GuessContainer;