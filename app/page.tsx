'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import axios from 'axios'

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [avatars, setAvatars] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchRandomPair = async () => {
      try {
        // Wait for 3 seconds to show the animation
        await new Promise(resolve => setTimeout(resolve, 3000))
        const response = await axios.get('/api/randomPair')
        console.log(response.data)
        setAvatars(response.data)
        setLoading(false)
        setShowConfetti(true)
      } catch (error) {
        console.error('Error fetching random pair:', error)
        setLoading(false)
      }
    }

    fetchRandomPair()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen flex-1 w-full bg-gradient-to-br from-blue-500 to-purple-600">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mb-4"
            />
            <motion.h1
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl font-bold text-white"
            >
              Picking a random pair
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Congratulations to our selected pair!
            </h2>
            <div className="flex gap-8 justify-center">
              {avatars.map((avatar, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={avatar}
                      alt={`Selected user ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
