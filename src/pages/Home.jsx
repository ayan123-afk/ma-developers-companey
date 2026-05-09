import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AnnouncementsSection from '../components/sections/AnnouncementsSection'
import ContactSection from '../components/sections/ContactSection'
import StatsSection from '../components/sections/StatsSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MA Developers - Building Modern Websites & Digital Experiences</title>
        <meta name="description" content="MA Developers specializes in creating modern, responsive websites and digital experiences using cutting-edge technologies." />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <AnnouncementsSection />
        <ContactSection />
      </motion.main>
    </>
  )
}
