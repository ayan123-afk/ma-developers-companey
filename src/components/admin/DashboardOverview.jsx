import { motion } from 'framer-motion'
import {
  Briefcase,
  Megaphone,
  MessageSquare,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
} from 'lucide-react'

const statCards = [
  {
    title: 'Total Projects',
    value: '0',
    icon: Briefcase,
    color: 'from-neon-blue to-primary-500',
    change: '+12%',
    trend: 'up',
  },
  {
    title: 'Announcements',
    value: '0',
    icon: Megaphone,
    color: 'from-neon-purple to-pink-500',
    change: '+5%',
    trend: 'up',
  },
  {
    title: 'Total Messages',
    value: '0',
    icon: MessageSquare,
    color: 'from-green-400 to-emerald-500',
    change: '+18%',
    trend: 'up',
  },
  {
    title: 'Unread Messages',
    value: '0',
    icon: Activity,
    color: 'from-yellow-400 to-orange-500',
    change: '-3%',
    trend: 'down',
  },
]

const recentActivities = [
  { action: 'New project added', time: '2 minutes ago', type: 'project' },
  { action: 'Announcement updated', time: '1 hour ago', type: 'announcement' },
  { action: 'New message received', time: '3 hours ago', type: 'message' },
  { action: 'Settings updated', time: '5 hours ago', type: 'settings' },
]

export default function DashboardOverview({ stats }) {
  // Update stat cards with actual data
  const updatedStatCards = statCards.map(card => {
    switch (card.title) {
      case 'Total Projects':
        return { ...card, value: stats.totalProjects }
      case 'Announcements':
        return { ...card, value: stats.totalAnnouncements }
      case 'Total Messages':
        return { ...card, value: stats.totalMessages }
      case 'Unread Messages':
        return { ...card, value: stats.unreadMessages }
      default:
        return card
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {updatedStatCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-neon-blue" />
                <p className="text-gray-300">{activity.action}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {activity.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="glass-card p-6 text-left hover:border-neon-blue/50 transition-all duration-300"
        >
          <Briefcase className="w-8 h-8 text-neon-blue mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Add New Project</h3>
          <p className="text-gray-400 text-sm">Upload a new project to your portfolio</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="glass-card p-6 text-left hover:border-neon-purple/50 transition-all duration-300"
        >
          <Megaphone className="w-8 h-8 text-neon-purple mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Post Announcement</h3>
          <p className="text-gray-400 text-sm">Share updates with your visitors</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="glass-card p-6 text-left hover:border-primary-500/50 transition-all duration-300"
        >
          <MessageSquare className="w-8 h-8 text-primary-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">View Messages</h3>
          <p className="text-gray-400 text-sm">Check messages from your clients</p>
        </motion.button>
      </div>
    </div>
  )
}
