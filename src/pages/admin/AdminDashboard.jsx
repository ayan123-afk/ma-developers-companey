import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'
import {
  LayoutDashboard,
  Briefcase,
  Megaphone,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ChevronRight,
  Code2,
} from 'lucide-react'

// Dashboard Components
import DashboardOverview from '../../components/admin/DashboardOverview'
import ProjectsManager from '../../components/admin/ProjectsManager'
import AnnouncementsManager from '../../components/admin/AnnouncementsManager'
import MessagesManager from '../../components/admin/MessagesManager'
import SettingsPanel from '../../components/admin/SettingsPanel'

const sidebarLinks = [
  {
    path: '/admin/dashboard',
    icon: LayoutDashboard,
    label: 'Overview',
    exact: true,
  },
  {
    path: '/admin/dashboard/projects',
    icon: Briefcase,
    label: 'Projects',
  },
  {
    path: '/admin/dashboard/announcements',
    icon: Megaphone,
    label: 'Announcements',
  },
  {
    path: '/admin/dashboard/messages',
    icon: MessageSquare,
    label: 'Messages',
  },
  {
    path: '/admin/dashboard/settings',
    icon: Settings,
    label: 'Settings',
  },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalAnnouncements: 0,
    totalMessages: 0,
    unreadMessages: 0,
  })
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [
        { count: projectsCount },
        { count: announcementsCount },
        { count: messagesCount },
        { count: unreadCount },
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('announcements').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      ])

      setStats({
        totalProjects: projectsCount || 0,
        totalAnnouncements: announcementsCount || 0,
        totalMessages: messagesCount || 0,
        unreadMessages: unreadCount || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      toast.success('Logged out successfully')
      navigate('/admin/login')
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MA Developers</title>
      </Helmet>

      <div className="min-h-screen bg-gray-950 flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : -320,
            opacity: sidebarOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 z-50 h-full w-72 glass-card border-r border-gray-800/50 flex flex-col lg:relative lg:translate-x-0 lg:opacity-100 ${
            !sidebarOpen && 'lg:translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-800/50">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Code2 className="w-8 h-8 text-neon-blue" />
              <span className="text-xl font-bold gradient-text">MA Developers</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path)
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800/50">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar */}
          <header className="glass-card border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center space-x-6 ml-auto">
              {/* Stats */}
              <div className="hidden sm:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Briefcase className="w-4 h-4 text-neon-blue" />
                  <span className="text-gray-400">{stats.totalProjects} Projects</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-neon-purple" />
                  <span className="text-gray-400">{stats.unreadMessages} Unread</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route index element={<DashboardOverview stats={stats} />} />
                  <Route path="projects" element={<ProjectsManager />} />
                  <Route path="announcements" element={<AnnouncementsManager />} />
                  <Route path="messages" element={<MessagesManager />} />
                  <Route path="settings" element={<SettingsPanel />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}
