import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ],
  'Services': [
    { label: 'Web Development', path: '/services' },
    { label: 'React Websites', path: '/services' },
    { label: 'Custom Applications', path: '/services' },
    { label: 'UI/UX Design', path: '/services' },
    { label: 'API Integration', path: '/services' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50">
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Code2 className="w-8 h-8 text-neon-blue" />
              <span className="text-2xl font-bold gradient-text">MA Developers</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Building modern websites and digital experiences that transform businesses.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="glass-card p-2 rounded-lg text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-6">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-neon-blue" />
                <span>info@madevelopers.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-neon-blue" />
                <span>+92 XXX XXXXXXX</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MA Developers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
