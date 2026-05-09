import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-8"
            >
              <Code2 className="w-16 h-16 text-neon-blue" />
              <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mb-4"
              style={{ width: '100%' }}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm"
            >
              Loading Amazing Experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
