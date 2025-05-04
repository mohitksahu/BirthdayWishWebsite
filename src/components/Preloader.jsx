import React, { useState, useEffect } from 'react'

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
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <div className="text-4xl font-bold text-purple-700 mb-2">
        Loading... <span className="inline-block align-middle">⏳</span>
      </div>
      <div className="flex space-x-2 font-mono text-3xl font-bold text-pink-600">
        <span className="bg-white bg-opacity-70 p-2 rounded shadow-md">{String(timeLeft.days).padStart(2, '0')}d</span>
        <span className="bg-white bg-opacity-70 p-2 rounded shadow-md">{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span className="bg-white bg-opacity-70 p-2 rounded shadow-md">{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span className="bg-white bg-opacity-70 p-2 rounded shadow-md">{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  )
}

export default Preloader