import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { 
  Menu, X, Map, Image, Users, Shield, AlertTriangle, 
  FileText, History, Settings, LogOut, ChevronDown,
  BarChart3, CheckCircle2, GitCompare
} from 'lucide-react'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModule, setActiveModule] = useState('overview')
  const navigate = useNavigate()

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'Map Monitor', href: '/dashboard/map', icon: Map },
    { name: 'Image Gallery', href: '/dashboard/images', icon: Image },
    { name: 'AI Analysis', href: '/dashboard/ai-analysis', icon: Shield },
    { name: 'Farmer Tracker', href: '/dashboard/farmers', icon: Users },
    { name: 'Officer Tracker', href: '/dashboard/officers', icon: Users },
    { name: 'Compare Images', href: '/dashboard/compare', icon: GitCompare },
    { name: 'Damage Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
    { name: 'Approval Workflow', href: '/dashboard/approvals', icon: CheckCircle2 },
    { name: 'CCE Optimization', href: '/dashboard/cce', icon: Settings },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'History', href: '/dashboard/history', icon: History },
  ]

  const user = {
    name: 'Rajesh Kumar',
    role: 'District Officer',
    district: 'Nashik District',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-green-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 flex z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-green-100 bg-green-500 text-white">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-lg font-bold">PLANTIVE</h1>
              <p className="text-xs opacity-90">PLANTIVE Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-green-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User profile */}
        <div className="p-4 border-b border-green-100">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-10 rounded-full border-2 border-green-200"
              src={user.avatar}
              alt={user.name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.role}
              </p>
              <p className="text-xs text-green-600 font-medium">
                {user.district}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setActiveModule(item.name.toLowerCase())}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500' 
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${activeModule === item.name.toLowerCase() ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`} />
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-green-100">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-green-100 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Breadcrumb */}
              <div className="ml-4 flex items-center space-x-2 text-sm text-black">
                <span className="font-bold">PLANTIVE</span>
                <ChevronDown className="h-4 w-4 transform -rotate-90" />
                <span className="text-green-600 font-medium">Dashboard</span>
              </div>
            </div>

            {/* Notifications & Quick Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout