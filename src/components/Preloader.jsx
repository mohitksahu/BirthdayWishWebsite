import React, { useState, useEffect } from 'react'
import BackgroundMusic from "@/components/BackgroundMusic";

function getTimeLeft(endDate) {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, finished: false }
}

const Preloader = ({ endDate, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate))
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    if (timeLeft.finished) {
      onFinish()
      return
    }
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, endDate, onFinish])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <BackgroundMusic key='bg-music' isMusicPlaying={isMusicPlaying} setIsMusicPlaying={setIsMusicPlaying} />
      
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-purple-100">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-2 text-center">
          Loading... <span className="inline-block align-middle">⏳</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 font-mono text-xl sm:text-2xl md:text-3xl font-bold text-pink-600">
          <span className="bg-white bg-opacity-70 p-2 rounded shadow-md min-w-[48px] text-center">{String(timeLeft.days).padStart(2, '0')}d</span>
          <span className="bg-white bg-opacity-70 p-2 rounded shadow-md min-w-[48px] text-center">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span className="bg-white bg-opacity-70 p-2 rounded shadow-md min-w-[48px] text-center">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="bg-white bg-opacity-70 p-2 rounded shadow-md min-w-[48px] text-center">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    </div> 
  )
}

export default Preloader