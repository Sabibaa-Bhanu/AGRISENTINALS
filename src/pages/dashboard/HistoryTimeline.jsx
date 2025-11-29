import React, { useState, useEffect } from 'react'
import { 
  Search, Filter, Download, Calendar, User, MapPin, 
  TrendingUp, TrendingDown, BarChart3, Clock,
  Eye, ExternalLink, FileText, Image, Shield, AlertTriangle,
  CheckCircle, XCircle, Play, Pause, RefreshCw, Loader
} from 'lucide-react'

const HistoryTimeline = () => {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [selectedCrop, setSelectedCrop] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock data
  const getMockData = () => [
    {
      id: 1,
      farmer_name: 'Ramesh Patil',
      farmer_id: 'FARM-001',
      plot_id: 'PLOT-001',
      village: 'Shivaji Nagar',
      crop: 'Soybean',
      season: 'Kharif 2023',
      event_type: 'crop_health_improvement',
      event_date: '2023-09-15',
      significance: 'high',
      description: 'Significant improvement in crop health after pest control measures',
      images: ['health_improve_1.jpg', 'health_improve_2.jpg'],
      ai_confidence: 92,
      impact: 'positive',
      metrics: {
        health_score: { before: 45, after: 85, change: '+40' },
        yield_estimate: { before: '1.2 tons', after: '2.8 tons', change: '+133%' },
        damage_level: { before: '35%', after: '5%', change: '-30%' }
      },
      officer_involved: 'Rajesh Kumar',
      tags: ['pest_control', 'recovery', 'high_yield'],
      related_events: [2, 3]
    },
    {
      id: 2,
      farmer_name: 'Suresh Yadav',
      farmer_id: 'FARM-002',
      plot_id: 'PLOT-002',
      village: 'Gandhi Gram',
      crop: 'Cotton',
      season: 'Kharif 2023',
      event_type: 'weather_damage',
      event_date: '2023-10-05',
      significance: 'medium',
      description: 'Heavy rainfall caused waterlogging in cotton fields',
      images: ['weather_damage_1.jpg'],
      ai_confidence: 87,
      impact: 'negative',
      metrics: {
        health_score: { before: 78, after: 62, change: '-16' },
        yield_estimate: { before: '3.2 tons', after: '2.6 tons', change: '-19%' },
        damage_level: { before: '8%', after: '22%', change: '+14%' }
      },
      officer_involved: 'Priya Sharma',
      tags: ['weather', 'waterlogging', 'moderate_damage'],
      related_events: []
    },
    {
      id: 3,
      farmer_name: 'Anita Deshmukh',
      farmer_id: 'FARM-003',
      plot_id: 'PLOT-003',
      village: 'Mahatma Nagar',
      crop: 'Wheat',
      season: 'Rabi 2023',
      event_type: 'pest_infestation',
      event_date: '2023-12-10',
      significance: 'critical',
      description: 'Severe locust attack affecting wheat crops',
      images: ['pest_attack_1.jpg'],
      ai_confidence: 95,
      impact: 'negative',
      metrics: {
        health_score: { before: 82, after: 35, change: '-47' },
        yield_estimate: { before: '4.1 tons', after: '1.8 tons', change: '-56%' },
        damage_level: { before: '5%', after: '65%', change: '+60%' }
      },
      officer_involved: 'Sanjay Verma',
      tags: ['locust', 'emergency', 'high_damage'],
      related_events: [4]
    },
    {
      id: 4,
      farmer_name: 'Mohammad Khan',
      farmer_id: 'FARM-004',
      plot_id: 'PLOT-004',
      village: 'Nehru Colony',
      crop: 'Rice',
      season: 'Kharif 2023',
      event_type: 'record_yield',
      event_date: '2023-11-20',
      significance: 'high',
      description: 'Record rice yield due to improved irrigation and fertilization',
      images: ['record_yield_1.jpg', 'record_yield_2.jpg'],
      ai_confidence: 89,
      impact: 'positive',
      metrics: {
        health_score: { before: 75, after: 88, change: '+13' },
        yield_estimate: { before: '3.5 tons', after: '5.2 tons', change: '+49%' },
        damage_level: { before: '12%', after: '3%', change: '-9%' }
      },
      officer_involved: 'Meena Patel',
      tags: ['record', 'high_yield', 'best_practice'],
      related_events: []
    }
  ]

  // Simulate data loading
  useEffect(() => {
    const loadData = () => {
      setLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        try {
          const data = getMockData()
          setHistoryData(data)
          if (data.length > 0) {
            setSelectedEvent(data[0])
          }
          setLoading(false)
        } catch (err) {
          setError('Failed to load data')
          setLoading(false)
        }
      }, 1500)
    }

    loadData()
  }, [])

  // Event type configuration
  const eventTypes = {
    crop_health_improvement: { label: 'Health Improvement', color: 'bg-green-500', icon: TrendingUp },
    pest_infestation: { label: 'Pest Infestation', color: 'bg-red-500', icon: AlertTriangle },
    weather_damage: { label: 'Weather Damage', color: 'bg-blue-500', icon: Shield },
    disease_outbreak: { label: 'Disease Outbreak', color: 'bg-orange-500', icon: XCircle },
    record_yield: { label: 'Record Yield', color: 'bg-purple-500', icon: TrendingUp }
  }

  // Get unique seasons and crops from data
  const seasons = ['all', ...new Set(historyData.map(event => event.season))]
  const crops = ['all', ...new Set(historyData.map(event => event.crop))]

  const filters = [
    { value: 'all', label: 'All Events', count: historyData.length },
    { value: 'positive', label: 'Positive Impact', count: historyData.filter(h => h.impact === 'positive').length },
    { value: 'negative', label: 'Negative Impact', count: historyData.filter(h => h.impact === 'negative').length },
    { value: 'critical', label: 'Critical Events', count: historyData.filter(h => h.significance === 'critical').length },
    { value: 'high', label: 'High Significance', count: historyData.filter(h => h.significance === 'high').length }
  ]

  // Filter and sort logic
  const filteredHistory = historyData.filter(event => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'positive' || filter === 'negative' ? event.impact === filter : event.significance === filter)
    const matchesSeason = selectedSeason === 'all' || event.season === selectedSeason
    const matchesCrop = selectedCrop === 'all' || event.crop === selectedCrop
    const matchesSearch = event.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.farmer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.plot_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSeason && matchesCrop && matchesSearch
  })

  const sortedHistory = [...filteredHistory].sort((a, b) => 
    new Date(b.event_date) - new Date(a.event_date)
  )

  // Helper functions
  const getSignificanceColor = (significance) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border-red-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-blue-100 text-blue-700 border-blue-300'
    }
    return colors[significance] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getImpactIcon = (impact) => {
    return impact === 'positive' ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Export function (client-side only)
  const exportHistoryData = () => {
    try {
      const csvContent = [
        ['Farmer Name', 'Farmer ID', 'Plot ID', 'Crop', 'Season', 'Event Type', 'Date', 'Impact', 'AI Confidence'],
        ...filteredHistory.map(event => [
          event.farmer_name,
          event.farmer_id,
          event.plot_id,
          event.crop,
          event.season,
          eventTypes[event.event_type]?.label || event.event_type,
          event.event_date,
          event.impact,
          event.ai_confidence + '%'
        ])
      ].map(row => row.join(',')).join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `history-timeline-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please try again.')
    }
  }

  // Refresh function
  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      const data = getMockData()
      setHistoryData(data)
      if (data.length > 0 && !selectedEvent) {
        setSelectedEvent(data[0])
      }
      setLoading(false)
    }, 1000)
  }

  // Event Components
  const TimelineEvent = ({ event, isSelected }) => {
    const EventTypeIcon = eventTypes[event.event_type]?.icon || AlertTriangle
    const eventTypeConfig = eventTypes[event.event_type] || eventTypes.pest_infestation

    return (
      <div 
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          isSelected 
            ? 'border-green-500 shadow-xl bg-green-50' 
            : 'border-gray-200 hover:border-green-300 bg-white'
        }`}
        onClick={() => setSelectedEvent(event)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${eventTypeConfig.color} text-white`}>
              <EventTypeIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{event.farmer_name}</h3>
              <p className="text-sm text-gray-600">{event.plot_id} • {event.village}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSignificanceColor(event.significance)}`}>
            {event.significance.toUpperCase()}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Crop & Season:</span>
            <span className="font-medium">{event.crop} • {event.season}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date(event.event_date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">AI Confidence:</span>
            <span className={`font-bold ${getConfidenceColor(event.ai_confidence)}`}>
              {event.ai_confidence}%
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getImpactIcon(event.impact)}
            <span className={`text-sm font-medium ${
              event.impact === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {event.impact === 'positive' ? 'Positive Impact' : 'Negative Impact'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {event.officer_involved}
          </div>
        </div>

        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
    )
  }

  const EventDetails = ({ event }) => {
    if (!event) return null

    const EventTypeIcon = eventTypes[event.event_type]?.icon || AlertTriangle
    const eventTypeConfig = eventTypes[event.event_type] || eventTypes.pest_infestation

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="p-6 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${eventTypeConfig.color} text-white`}>
                  <EventTypeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{eventTypeConfig.label}</h2>
                  <p className="text-gray-600">{event.farmer_name} • {event.plot_id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSignificanceColor(event.significance)}`}>
                  {event.significance.toUpperCase()} EVENT
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.impact === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {getImpactIcon(event.impact)}
                  <span className="ml-1 capitalize">{event.impact} Impact</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{event.ai_confidence}%</div>
              <div className="text-sm text-gray-600">AI Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{event.metrics.health_score.after}</div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{event.metrics.yield_estimate.after}</div>
              <div className="text-sm text-gray-600">Yield Estimate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{event.metrics.damage_level.after}</div>
              <div className="text-sm text-gray-600">Damage Level</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Event Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Impact Metrics
              </h3>
              <div className="space-y-4">
                {Object.entries(event.metrics).map(([metric, data]) => (
                  <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">Before: {data.before}</span>
                        <span className="text-xs text-gray-500">After: {data.after}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {data.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={exportHistoryData}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Event Report
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Eye className="h-4 w-4 mr-2" />
                  View Related Images
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Metadata</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Farmer ID:</span>
                  <span className="font-medium">{event.farmer_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plot ID:</span>
                  <span className="font-medium">{event.plot_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Village:</span>
                  <span className="font-medium">{event.village}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Season:</span>
                  <span className="font-medium">{event.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Officer:</span>
                  <span className="font-medium text-blue-600">{event.officer_involved}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading historical data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historical Records & Timeline</h1>
            <p className="text-gray-600">Comprehensive historical data and trend analysis</p>
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
              {isPlaying ? 'Pause' : 'Play'} Timeline
            </button>
            <button 
              onClick={exportHistoryData}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export History
            </button>
            <button 
              onClick={refreshData}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600 transition-all"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by farmer name, ID, plot ID, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {season === 'all' ? 'All Seasons' : season}
                  </option>
                ))}
              </select>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {crops.map(crop => (
                  <option key={crop} value={crop}>
                    {crop === 'all' ? 'All Crops' : crop}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                  filter === filterItem.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{filterItem.label}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  filter === filterItem.value
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {filterItem.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Timeline Events ({sortedHistory.length})
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {sortedHistory.length > 0 ? (
                  sortedHistory.map((event) => (
                    <TimelineEvent
                      key={event.id}
                      event={event}
                      isSelected={selectedEvent?.id === event.id}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No events found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="xl:col-span-2">
            {selectedEvent ? (
              <EventDetails event={selectedEvent} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Event Selected</h3>
                <p className="text-gray-600">Select an event from the timeline to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryTimeline