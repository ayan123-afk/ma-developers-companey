import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Users, Award, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedBackground from '../AnimatedBackground'
import TypingText from '../TypingText'

const stats = [
  { icon: Code2, value: 150, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 100, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 5, suffix: '+', label: 'Years Experience' },
  { icon: Globe, value: 20, suffix: '+', label: 'Countries Served' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center glass-card px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse mr-2" />
            <span className="text-gray-300 text-sm">Welcome to the Future of Web Development</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text text-shadow-neon">MA Developers</span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12"
          >
            <TypingText 
              texts={[
                "Building Modern Websites & Digital Experiences",
                "Transforming Ideas into Digital Reality",
                "Creating Next-Gen Web Solutions",
              ]}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/projects" className="gradient-btn inline-flex items-center justify-center">
              View Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="glass-card px-8 py-3 rounded-full text-white font-semibold hover:border-neon-blue/50 transition-all duration-300 inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-neon-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-neon-blue rounded-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
