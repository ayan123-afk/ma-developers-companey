import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TypingText({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-neon-blue ml-1 align-middle"
      />
    </span>
  )
}
