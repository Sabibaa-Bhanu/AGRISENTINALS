import React, { useEffect, useState } from 'react'
import {
  Users,
  Image,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  Activity,
  ClipboardCheck,
  CloudSun,
} from 'lucide-react'

const Overview = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [recentActivity, setRecentActivity] = useState([])
  const [systemStatus, setSystemStatus] = useState({})

  // Demo data for frontend prototype.
  // Replace with API/database values when backend integration is ready.
  const mockData = {
    stats: {
      registeredFarmers: 1247,
      farmersChange: 5.2,

      imagesAnalyzed: 894,
      imagesChange: 12.8,

      diseaseCases: 126,
      diseaseChange: 8.3,

      highRiskFields: 18,
      riskChange: -4.2,

      pendingValidation: 8,
      activeAlerts: 12,
      fieldsMonitored: 486,
      coverageArea: 78.3,

      aiAccuracy: 94.7,
      completedVisits: 156,
    },

    recentActivity: [
      {
        id: 1,
        type: 'image_submission',
        title: '5 new crop images submitted',
        description: 'Farmers uploaded crop health images',
        time: '10 minutes ago',
        status: 'completed',
        icon: '📸',
      },
      {
        id: 2,
        type: 'ai_analysis',
        title: 'AI analysis completed',
        description: 'Paddy images analyzed for crop health',
        time: '32 minutes ago',
        status: 'completed',
        icon: '🤖',
      },
      {
        id: 3,
        type: 'validation',
        title: 'Expert validation pending',
        description: '8 AI detections require expert review',
        time: '1 hour ago',
        status: 'pending',
        icon: '🔬',
      },
      {
        id: 4,
        type: 'alert',
        title: 'New disease alert detected',
        description: 'High-risk crop health case reported',
        time: '3 hours ago',
        status: 'warning',
        icon: '🚨',
      },
      {
        id: 5,
        type: 'field_visit',
        title: '3 field visits completed',
        description: 'Officers completed field verification',
        time: '5 hours ago',
        status: 'completed',
        icon: '👨‍🌾',
      },
    ],

    systemStatus: {
      aiAnalysis: {
        status: 'operational',
        latency: '120ms',
      },

      imageProcessing: {
        status: 'operational',
        queue: 12,
      },

      dataSync: {
        status: 'active',
        lastSync: '2 min ago',
      },

      apiHealth: {
        status: 'healthy',
        uptime: '99.9%',
      },
    },
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockData.stats)
      setRecentActivity(mockData.recentActivity)
      setSystemStatus(mockData.systemStatus)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setLoading(true)

    setTimeout(() => {
      setStats(mockData.stats)
      setRecentActivity(mockData.recentActivity)
      setSystemStatus(mockData.systemStatus)
      setLoading(false)
    }, 800)
  }

  const exportReport = () => {
    alert('Exporting AgriSentinels crop health report...')
  }

  const StatCard = ({
    title,
    value,
    change,
    icon,
    color,
    suffix = '',
  }) => {
    const isPositive = change >= 0

    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {title}
            </p>

            <p className={`text-3xl font-bold mt-2 ${color}`}>
              {value}
              {suffix}
            </p>

            <div
              className={`flex items-center mt-2 text-sm font-medium ${
                isPositive
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}

              {Math.abs(change)}%
              {isPositive ? ' increase' : ' decrease'}
            </div>
          </div>

          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              color
                .replace('text-', 'bg-')
                .replace('-600', '-100')
            }`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </div>
    )
  }

  const StatusIndicator = ({ status }) => {
    const config = {
      operational: {
        color: 'text-green-600',
        bg: 'bg-green-100',
        label: 'Operational',
      },
      active: {
        color: 'text-green-600',
        bg: 'bg-green-100',
        label: 'Active',
      },
      healthy: {
        color: 'text-green-600',
        bg: 'bg-green-100',
        label: 'Healthy',
      },
      pending: {
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        label: 'Pending',
      },
      warning: {
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        label: 'Warning',
      },
      error: {
        color: 'text-red-600',
        bg: 'bg-red-100',
        label: 'Error',
      },
    }

    const {
      color,
      bg,
      label,
    } = config[status] || config.pending

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg} ${color}`}
      >
        <div
          className={`w-2 h-2 rounded-full ${color} mr-1`}
        />

        {label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />

          <p className="text-gray-600">
            Loading crop intelligence dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Crop Intelligence Overview
          </h1>

          <p className="text-gray-600">
            AgriSentinels Agriculture Monitoring Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Monitoring
          </div>

          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-green-500 hover:text-green-600 transition-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>

          <button
            onClick={exportReport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>

        </div>
      </div>


      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Registered Farmers"
          value={stats.registeredFarmers}
          change={stats.farmersChange}
          icon="👨‍🌾"
          color="text-green-600"
        />

        <StatCard
          title="Images Analyzed"
          value={stats.imagesAnalyzed}
          change={stats.imagesChange}
          icon="📸"
          color="text-blue-600"
        />

        <StatCard
          title="Disease Cases"
          value={stats.diseaseCases}
          change={stats.diseaseChange}
          icon="🦠"
          color="text-red-600"
        />

        <StatCard
          title="High-Risk Fields"
          value={stats.highRiskFields}
          change={stats.riskChange}
          icon="🚨"
          color="text-orange-600"
        />

      </div>


      {/* Secondary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pendingValidation}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Pending Validation
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.activeAlerts}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Active Alerts
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.fieldsMonitored}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Fields Monitored
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">
              {stats.coverageArea}%
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Monitoring Coverage
            </div>
          </div>
        </div>

      </div>


      {/* Quick Actions / Activity / System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Quick Actions
          </h3>

          <div className="space-y-3">

            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ClipboardCheck className="h-5 w-5 text-orange-600" />
                </div>

                <div>
                  <div className="font-medium text-gray-900">
                    Expert Validation
                  </div>

                  <div className="text-sm text-gray-600">
                    {stats.pendingValidation} detections waiting
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>


            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>

                <div>
                  <div className="font-medium text-gray-900">
                    Disease Alerts
                  </div>

                  <div className="text-sm text-gray-600">
                    {stats.activeAlerts} active alerts
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>


            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <div className="font-medium text-gray-900">
                    View Hotspots
                  </div>

                  <div className="text-sm text-gray-600">
                    Monitor high-risk fields
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>


            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <div className="font-medium text-gray-900">
                    Generate Report
                  </div>

                  <div className="text-sm text-gray-600">
                    Crop health analytics
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>

          </div>
        </div>


        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Recent Activity
          </h3>

          <div className="space-y-4">

            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >

                <div className="text-2xl">
                  {activity.icon}
                </div>

                <div className="flex-1 min-w-0">

                  <div className="font-medium text-gray-900">
                    {activity.title}
                  </div>

                  <div className="text-sm text-gray-600">
                    {activity.description}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </div>

                </div>

                <StatusIndicator status={activity.status} />

              </div>
            ))}

          </div>

          <button className="w-full mt-4 text-center text-sm text-green-600 hover:text-green-700 font-medium py-2">
            View All Activity →
          </button>

        </div>


        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            System Status
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  AI Analysis
                </div>

                <div className="text-sm text-gray-600">
                  Latency: {systemStatus.aiAnalysis?.latency}
                </div>
              </div>

              <StatusIndicator
                status={systemStatus.aiAnalysis?.status}
              />
            </div>


            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  Image Processing
                </div>

                <div className="text-sm text-gray-600">
                  Queue: {systemStatus.imageProcessing?.queue} images
                </div>
              </div>

              <StatusIndicator
                status={systemStatus.imageProcessing?.status}
              />
            </div>


            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  Data Sync
                </div>

                <div className="text-sm text-gray-600">
                  Last: {systemStatus.dataSync?.lastSync}
                </div>
              </div>

              <StatusIndicator
                status={systemStatus.dataSync?.status}
              />
            </div>


            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  API Health
                </div>

                <div className="text-sm text-gray-600">
                  Uptime: {systemStatus.apiHealth?.uptime}
                </div>
              </div>

              <StatusIndicator
                status={systemStatus.apiHealth?.status}
              />
            </div>

          </div>


          <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />

              <span className="text-sm font-medium">
                All systems operational
              </span>
            </div>
          </div>

        </div>

      </div>


      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* AI Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <h3 className="font-semibold text-gray-900 mb-4">
            AI & Field Performance
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Images Processed
              </span>

              <span className="font-medium text-blue-600">
                {stats.imagesAnalyzed}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                AI Model Accuracy
              </span>

              <span className="font-medium text-green-600">
                {stats.aiAccuracy}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Completed Field Visits
              </span>

              <span className="font-medium text-indigo-600">
                {stats.completedVisits}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Fields Monitored
              </span>

              <span className="font-medium text-teal-600">
                {stats.fieldsMonitored}
              </span>
            </div>

          </div>

        </div>


        {/* Regional Coverage */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <h3 className="font-semibold text-gray-900 mb-4">
            Regional Monitoring
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Pune District
              </span>

              <span className="font-medium text-blue-600">
                85% monitored
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Nashik District
              </span>

              <span className="font-medium text-blue-600">
                78% monitored
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Nagpur Division
              </span>

              <span className="font-medium text-blue-600">
                65% monitored
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Aurangabad Zone
              </span>

              <span className="font-medium text-blue-600">
                72% monitored
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Overview