import React, { useState, useEffect } from 'react'
import { 
  AlertTriangle, AlertCircle, CheckCircle, XCircle, 
  Search, Filter, Download, MapPin, Calendar, User, 
  Eye, Clock, TrendingUp, BarChart3, Shield, 
  ChevronRight, ExternalLink, Bell, RotateCw,
  Play, Pause, Maximize2, Minimize2,
  Grid3X3 // Added for risk matrix icon
} from 'lucide-react'
import RiskPriorityChart from '../../components/charts/RiskPriorityChart' // Add this import

const DamageAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRiskMatrix, setShowRiskMatrix] = useState(false) // Add this state

  useEffect(() => {
    // Mock data - replace with API call
    const mockAlerts = [
      {
        id: 1,
        farmerName: 'Ramesh Patil',
        farmerId: 'FARM-001',
        plotId: 'PLOT-001',
        village: 'Shivaji Nagar',
        crop: 'Soybean',
        stage: 'Flowering',
        alertType: 'pest_infestation',
        severity: 'critical',
        confidence: 94,
        detectedDate: '2024-01-15 10:30:00',
        reportedDate: '2024-01-15 11:15:00',
        status: 'new',
        location: [19.9975, 73.7898],
        images: ['damage1.jpg', 'damage2.jpg'],
        description: 'Severe pest infestation detected in soybean crop. Multiple pests visible on leaves and stems.',
        affectedArea: '2.5 acres',
        estimatedLoss: '35%',
        recommendedAction: 'Immediate pesticide application required',
        officerAssigned: 'Rajesh Kumar',
        progress: 0,
        timeline: [
          { date: '2024-01-15 10:30:00', event: 'AI Detection', status: 'detected' },
          { date: '2024-01-15 11:15:00', event: 'Alert Generated', status: 'reported' }
        ]
      },
      {
        id: 2,
        farmerName: 'Suresh Yadav',
        farmerId: 'FARM-002',
        plotId: 'PLOT-002',
        village: 'Gandhi Gram',
        crop: 'Cotton',
        stage: 'Vegetative',
        alertType: 'disease_outbreak',
        severity: 'high',
        confidence: 87,
        detectedDate: '2024-01-14 14:20:00',
        reportedDate: '2024-01-14 15:00:00',
        status: 'in_progress',
        location: [20.0000, 73.7950],
        images: ['disease1.jpg'],
        description: 'Fungal disease outbreak detected. Yellow spots and wilting observed.',
        affectedArea: '1.8 acres',
        estimatedLoss: '20%',
        recommendedAction: 'Fungicide spray and crop monitoring',
        officerAssigned: 'Priya Sharma',
        progress: 60,
        timeline: [
          { date: '2024-01-14 14:20:00', event: 'AI Detection', status: 'detected' },
          { date: '2024-01-14 15:00:00', event: 'Alert Generated', status: 'reported' },
          { date: '2024-01-14 16:30:00', event: 'Officer Assigned', status: 'assigned' },
          { date: '2024-01-15 09:00:00', event: 'Field Visit', status: 'visited' }
        ]
      },
      {
        id: 3,
        farmerName: 'Anita Deshmukh',
        farmerId: 'FARM-003',
        plotId: 'PLOT-003',
        village: 'Mohan Nagar',
        crop: 'Wheat',
        stage: 'Harvesting',
        alertType: 'weather_damage',
        severity: 'medium',
        confidence: 76,
        detectedDate: '2024-01-13 08:45:00',
        reportedDate: '2024-01-13 09:30:00',
        status: 'resolved',
        location: [19.9950, 73.7920],
        images: ['weather1.jpg', 'weather2.jpg'],
        description: 'Hail storm damage observed. Physical damage to crops and lodging.',
        affectedArea: '3.2 acres',
        estimatedLoss: '15%',
        recommendedAction: 'Assessment for insurance claim',
        officerAssigned: 'Amit Singh',
        progress: 100,
        timeline: [
          { date: '2024-01-13 08:45:00', event: 'AI Detection', status: 'detected' },
          { date: '2024-01-13 09:30:00', event: 'Alert Generated', status: 'reported' },
          { date: '2024-01-13 11:00:00', event: 'Officer Assigned', status: 'assigned' },
          { date: '2024-01-13 14:20:00', event: 'Field Visit', status: 'visited' },
          { date: '2024-01-14 10:00:00', event: 'Assessment Complete', status: 'resolved' }
        ]
      },
      {
        id: 4,
        farmerName: 'Vikram Jadhav',
        farmerId: 'FARM-004',
        plotId: 'PLOT-004',
        village: 'Kisan Colony',
        crop: 'Rice',
        stage: 'Seedling',
        alertType: 'nutrient_deficiency',
        severity: 'low',
        confidence: 82,
        detectedDate: '2024-01-12 12:15:00',
        reportedDate: '2024-01-12 13:00:00',
        status: 'acknowledged',
        location: [20.0020, 73.7980],
        images: ['nutrient1.jpg'],
        description: 'Nitrogen deficiency detected. Yellowing of lower leaves observed.',
        affectedArea: '0.8 acres',
        estimatedLoss: '8%',
        recommendedAction: 'Fertilizer application and soil testing',
        officerAssigned: 'Neha Patel',
        progress: 30,
        timeline: [
          { date: '2024-01-12 12:15:00', event: 'AI Detection', status: 'detected' },
          { date: '2024-01-12 13:00:00', event: 'Alert Generated', status: 'reported' },
          { date: '2024-01-12 15:45:00', event: 'Officer Review', status: 'acknowledged' }
        ]
      }
    ]
    setAlerts(mockAlerts)
    setSelectedAlert(mockAlerts[0])
  }, [])

  const filters = [
    { value: 'all', label: 'All Alerts', count: alerts.length },
    { value: 'new', label: 'New', count: alerts.filter(a => a.status === 'new').length },
    { value: 'in_progress', label: 'In Progress', count: alerts.filter(a => a.status === 'in_progress').length },
    { value: 'resolved', label: 'Resolved', count: alerts.filter(a => a.status === 'resolved').length },
    { value: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length }
  ]

  const alertTypes = {
    pest_infestation: { label: 'Pest Infestation', color: 'bg-red-500', icon: AlertCircle },
    disease_outbreak: { label: 'Disease Outbreak', color: 'bg-orange-500', icon: AlertTriangle },
    weather_damage: { label: 'Weather Damage', color: 'bg-blue-500', icon: Shield },
    nutrient_deficiency: { label: 'Nutrient Deficiency', color: 'bg-yellow-500', icon: BarChart3 }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'critical' ? alert.severity === 'critical' : alert.status === filter)
    const matchesSearch = alert.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.plotId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alertTypes[alert.alertType].label.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border-red-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-blue-100 text-blue-700 border-blue-300'
    }
    return colors[severity] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-red-100 text-red-700',
      acknowledged: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status) => {
    const icons = {
      new: AlertCircle,
      acknowledged: Clock,
      in_progress: TrendingUp,
      resolved: CheckCircle
    }
    const Icon = icons[status]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'acknowledged', progress: 30 } : alert
    ))
  }

  const handleResolve = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved', progress: 100 } : alert
    ))
  }

  const ProgressBar = ({ progress, severity }) => {
    const getProgressColor = () => {
      switch (severity) {
        case 'critical': return 'bg-red-500'
        case 'high': return 'bg-orange-500'
        case 'medium': return 'bg-yellow-500'
        case 'low': return 'bg-blue-500'
        default: return 'bg-gray-500'
      }
    }

    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }

  const AlertCard = ({ alert, isSelected }) => (
    <div 
      className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected 
          ? 'border-green-500 shadow-xl' 
          : 'border-gray-200 hover:border-green-300'
      }`}
      onClick={() => setSelectedAlert(alert)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${alertTypes[alert.alertType].color} text-white`}>
              {React.createElement(alertTypes[alert.alertType].icon, { className: "h-5 w-5" })}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{alert.farmerName}</h3>
              <p className="text-sm text-gray-600">{alert.plotId} • {alert.village}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
              {alert.severity.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Crop:</span>
            <span className="font-medium">{alert.crop} • {alert.stage}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Affected Area:</span>
            <span className="font-medium text-red-600">{alert.affectedArea}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">AI Confidence:</span>
            <span className={`font-bold ${getConfidenceColor(alert.confidence)}`}>
              {alert.confidence}%
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar progress={alert.progress} severity={alert.severity} />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Progress</span>
            <span>{alert.progress}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{new Date(alert.detectedDate).toLocaleDateString()}</span>
          </div>
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
            isSelected ? 'text-green-600 rotate-90' : 'text-gray-400'
          }`} />
        </div>
      </div>
    </div>
  )

  const AlertDetails = ({ alert }) => {
    if (!alert) return null

    const AlertType = alertTypes[alert.alertType].icon

    return (
      <div className="space-y-6">
        {/* Alert Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="p-6 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${alertTypes[alert.alertType].color} text-white`}>
                  <AlertType className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{alertTypes[alert.alertType].label}</h2>
                  <p className="text-gray-600">Damage Alert • {alert.farmerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()} SEVERITY
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(alert.status)}`}>
                  {getStatusIcon(alert.status)}
                  <span className="ml-1 capitalize">{alert.status.replace('_', ' ')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Alert Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{alert.confidence}%</div>
              <div className="text-sm text-gray-600">AI Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{alert.affectedArea}</div>
              <div className="text-sm text-gray-600">Affected Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{alert.estimatedLoss}</div>
              <div className="text-sm text-gray-600">Estimated Loss</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{alert.progress}%</div>
              <div className="text-sm text-gray-600">Resolution Progress</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farmer & Alert Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farmer Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Farmer & Plot Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Farmer Name</p>
                  <p className="font-semibold text-gray-900">{alert.farmerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Farmer ID</p>
                  <p className="font-semibold text-gray-900">{alert.farmerId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Plot ID</p>
                  <p className="font-semibold text-gray-900">{alert.plotId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Village</p>
                  <p className="font-semibold text-gray-900">{alert.village}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crop & Stage</p>
                  <p className="font-semibold text-gray-900">{alert.crop} • {alert.stage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Officer Assigned</p>
                  <p className="font-semibold text-blue-600">{alert.officerAssigned}</p>
                </div>
              </div>
            </div>

            {/* Alert Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Alert Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 leading-relaxed">{alert.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Recommended Action</p>
                  <p className="text-green-700 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                    {alert.recommendedAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Alert Timeline
              </h3>
              <div className="space-y-4">
                {alert.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      event.status === 'detected' ? 'bg-red-500' :
                      event.status === 'reported' ? 'bg-orange-500' :
                      event.status === 'assigned' ? 'bg-blue-500' :
                      event.status === 'visited' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {alert.status === 'new' && (
                  <button 
                    onClick={() => handleAcknowledge(alert.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Acknowledge Alert
                  </button>
                )}
                {alert.status === 'in_progress' && (
                  <button 
                    onClick={() => handleResolve(alert.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </button>
                )}
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </button>
                <button 
                  onClick={() => setShowRiskMatrix(true)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  View Risk Matrix
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Progress</h3>
              <div className="space-y-4">
                <ProgressBar progress={alert.progress} severity={alert.severity} />
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">{alert.progress}%</span>
                  <p className="text-sm text-gray-600 mt-1">Complete</p>
                </div>
              </div>
            </div>

            {/* Alert Metadata */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Metadata</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Detected:</span>
                  <span className="font-medium">{new Date(alert.detectedDate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reported:</span>
                  <span className="font-medium">{new Date(alert.reportedDate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images:</span>
                  <span className="font-medium">{alert.images.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence:</span>
                  <span className={`font-bold ${getConfidenceColor(alert.confidence)}`}>
                    {alert.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Damage Alerts & Incident Reports</h1>
          <p className="text-gray-600">AI-detected crop damage alerts and incident management</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center px-4 py-2 rounded-xl transition-all ${
              isPlaying 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-white border border-gray-300 text-gray-700 hover:border-green-500'
            }`}
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Live'} Updates
          </button>
          
          {/* View Risk Matrix Button */}
          <button 
            onClick={() => setShowRiskMatrix(!showRiskMatrix)}
            className={`flex items-center px-4 py-2 rounded-xl transition-all ${
              showRiskMatrix
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-500'
            }`}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            {showRiskMatrix ? 'Hide Risk Matrix' : 'View Risk Matrix'}
          </button>
          
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Show RiskPriorityChart when toggled */}
      {showRiskMatrix && (
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
          <RiskPriorityChart />
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-red-100">
          <div className="text-2xl font-bold text-red-600">
            {alerts.filter(a => a.severity === 'critical').length}
          </div>
          <div className="text-sm text-gray-600">Critical Alerts</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">
            {alerts.filter(a => a.status === 'new').length}
          </div>
          <div className="text-sm text-gray-600">New Alerts</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {alerts.filter(a => a.status === 'in_progress').length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">
            {alerts.filter(a => a.status === 'resolved').length}
          </div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sidebar - Alerts List */}
        <div className="xl:col-span-1 space-y-4">
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-col gap-2">
                {filters.map((filterItem) => (
                  <button
                    key={filterItem.value}
                    onClick={() => setFilter(filterItem.value)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      filter === filterItem.value
                        ? 'bg-green-100 text-green-700 border-green-300'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{filterItem.label}</span>
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {filterItem.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
            <div className="p-4 border-b border-green-100">
              <h3 className="font-semibold text-gray-900">Active Alerts ({filteredAlerts.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-4 p-4">
              {filteredAlerts.map((alert) => (
                <AlertCard 
                  key={alert.id} 
                  alert={alert} 
                  isSelected={selectedAlert?.id === alert.id}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Alert Details */}
        <div className="xl:col-span-3">
          {selectedAlert ? (
            <AlertDetails alert={selectedAlert} />
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-green-100">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an alert</h3>
              <p className="text-gray-600">Choose a damage alert from the list to view details and take action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DamageAlerts