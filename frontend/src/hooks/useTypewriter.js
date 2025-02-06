import { useState, useEffect } from 'react'

const useTypewriter = (text, speed = 250) => {
  const [displayedText, setDisplayedText] = useState("")
  useEffect(() => {
    setDisplayedText("")
    const words = text.split(" ")
    let accumulatedText = ""
    words.forEach((word, i) => {
      setTimeout(() => {
        accumulatedText += (accumulatedText ? ` ${word}` : word)
        setDisplayedText(accumulatedText)
      }, i * speed)
    })

    return () => {
      setDisplayedText("")
    }
  }, [text, speed])

  return displayedText
}

export default useTypewriter
