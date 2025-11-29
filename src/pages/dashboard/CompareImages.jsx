import React, { useState, useEffect } from 'react'
import { 
  Search, Filter, Download, ZoomIn, ZoomOut, RotateCcw, 
  CheckCircle, XCircle, AlertTriangle, ArrowLeftRight,
  User, MapPin, Calendar, Image, ChevronLeft, ChevronRight,
  Sliders, RefreshCw, Maximize2, Minus, Plus
} from 'lucide-react'

const CompareImages = () => {
  const [comparisons, setComparisons] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComparison, setSelectedComparison] = useState(null)
  const [farmerZoom, setFarmerZoom] = useState(1)
  const [officerZoom, setOfficerZoom] = useState(1)
  const [activeTab, setActiveTab] = useState('side-by-side')
  const [sliderPosition, setSliderPosition] = useState(50)

  useEffect(() => {
    // Mock data - replace with API call
    const mockComparisons = [
      {
        id: 1,
        farmerName: 'Ramesh Patil',
        farmerId: 'FARM-001',
        plotId: 'PLOT-001',
        village: 'Shivaji Nagar',
        crop: 'Soybean',
        stage: 'Flowering',
        submissionDate: '2024-01-15',
        officerVisitDate: '2024-01-15',
        officerName: 'Rajesh Kumar',
        hasFarmerImage: true,
        hasOfficerImage: true,
        matchScore: 92,
        discrepancies: [],
        status: 'high-match',
        locationMatch: true,
        timestampMatch: true,
        growthStageMatch: true
      },
      {
        id: 2,
        farmerName: 'Suresh Yadav',
        farmerId: 'FARM-002',
        plotId: 'PLOT-002',
        village: 'Gandhi Gram',
        crop: 'Cotton',
        stage: 'Vegetative',
        submissionDate: '2024-01-14',
        officerVisitDate: '2024-01-14',
        officerName: 'Priya Sharma',
        hasFarmerImage: true,
        hasOfficerImage: true,
        matchScore: 67,
        discrepancies: ['Growth stage mismatch', 'Plant density variation'],
        status: 'medium-match',
        locationMatch: true,
        timestampMatch: true,
        growthStageMatch: false
      },
      {
        id: 3,
        farmerName: 'Anita Deshmukh',
        farmerId: 'FARM-003',
        plotId: 'PLOT-003',
        village: 'Mohan Nagar',
        crop: 'Wheat',
        stage: 'Harvesting',
        submissionDate: '2024-01-13',
        officerVisitDate: '2024-01-13',
        officerName: 'Amit Singh',
        hasFarmerImage: true,
        hasOfficerImage: false,
        matchScore: 45,
        discrepancies: ['Poor image quality', 'Location mismatch', 'Stage verification failed', 'Crop health difference'],
        status: 'low-match',
        locationMatch: false,
        timestampMatch: true,
        growthStageMatch: false
      }
    ]
    setComparisons(mockComparisons)
    setSelectedComparison(mockComparisons[0])
  }, [])

  const filters = [
    { value: 'all', label: 'All Comparisons', count: comparisons.length },
    { value: 'high-match', label: 'High Match', count: comparisons.filter(c => c.status === 'high-match').length },
    { value: 'medium-match', label: 'Medium Match', count: comparisons.filter(c => c.status === 'medium-match').length },
    { value: 'low-match', label: 'Low Match', count: comparisons.filter(c => c.status === 'low-match').length }
  ]

  const filteredComparisons = comparisons.filter(comparison => {
    const matchesFilter = filter === 'all' || comparison.status === filter
    const matchesSearch = comparison.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comparison.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comparison.plotId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    const colors = {
      'high-match': 'bg-green-100 text-green-700 border-green-300',
      'medium-match': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'low-match': 'bg-red-100 text-red-700 border-red-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getStatusIcon = (status) => {
    const icons = {
      'high-match': CheckCircle,
      'medium-match': AlertTriangle,
      'low-match': XCircle
    }
    const Icon = icons[status]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const resetZoom = () => {
    setFarmerZoom(1)
    setOfficerZoom(1)
  }

  const nextComparison = () => {
    const currentIndex = filteredComparisons.findIndex(c => c.id === selectedComparison.id)
    const nextIndex = (currentIndex + 1) % filteredComparisons.length
    setSelectedComparison(filteredComparisons[nextIndex])
    resetZoom()
  }

  const prevComparison = () => {
    const currentIndex = filteredComparisons.findIndex(c => c.id === selectedComparison.id)
    const prevIndex = (currentIndex - 1 + filteredComparisons.length) % filteredComparisons.length
    setSelectedComparison(filteredComparisons[prevIndex])
    resetZoom()
  }

  // Image Placeholder Component
  const ImagePlaceholder = ({ type, hasImage, zoom = 1 }) => (
    <div 
      className="w-full h-64 lg:h-80 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 cursor-zoom-in"
      style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
    >
      {hasImage ? (
        <>
          <Image className="h-12 w-12 text-green-500 mb-3" />
          <span className="text-lg font-semibold text-green-600">{type} Image</span>
          <span className="text-sm text-gray-500 mt-2">Click to view full resolution</span>
          <span className="text-xs text-gray-400 mt-1">Zoom: {Math.round(zoom * 100)}%</span>
        </>
      ) : (
        <>
          <Image className="h-12 w-12 text-gray-400 mb-3" />
          <span className="text-lg font-semibold text-gray-500">No {type} Image</span>
          <span className="text-sm text-gray-400 mt-2">Image not available</span>
        </>
      )}
    </div>
  )

  // Slider Image Placeholder
  const SliderImagePlaceholder = ({ type, hasImage, width }) => (
    <div 
      className="h-full bg-gray-100 flex items-center justify-center transition-all duration-300"
      style={{ width: `${width}%` }}
    >
      {hasImage ? (
        <div className="text-center">
          <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <span className="text-sm font-medium text-green-600">{type}</span>
        </div>
      ) : (
        <div className="text-center">
          <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm text-gray-500">No Image</span>
        </div>
      )}
    </div>
  )

  const ComparisonView = ({ comparison }) => {
    if (!comparison) return null

    return (
      <div className="space-y-6">
        {/* Comparison Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Image Comparison</h2>
            <p className="text-gray-600">Farmer vs Officer verification</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={prevComparison}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 hover:text-green-600 transition-all"
                disabled={filteredComparisons.length <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">
                {filteredComparisons.findIndex(c => c.id === comparison.id) + 1} of {filteredComparisons.length}
              </span>
              <button 
                onClick={nextComparison}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 hover:text-green-600 transition-all"
                disabled={filteredComparisons.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="bg-white rounded-xl p-1 border border-gray-200 inline-flex">
          {['side-by-side', 'slider', 'overlay'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Comparison Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          {/* Comparison Details */}
          <div className="p-6 border-b border-green-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(comparison.status)}`}>
                  {getStatusIcon(comparison.status)}
                  <span className="ml-1 capitalize">{comparison.status.replace('-', ' ')}</span>
                </span>
                <span className={`text-lg font-bold ${getMatchScoreColor(comparison.matchScore)}`}>
                  {comparison.matchScore}% Match
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className={`h-4 w-4 ${comparison.locationMatch ? 'text-green-500' : 'text-red-500'}`} />
                  <span>Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${comparison.timestampMatch ? 'text-green-500' : 'text-yellow-500'}`} />
                  <span>Timestamp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image className={`h-4 w-4 ${comparison.growthStageMatch ? 'text-green-500' : 'text-red-500'}`} />
                  <span>Growth Stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>{comparison.officerName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Comparison Area */}
          <div className="p-6">
            {activeTab === 'side-by-side' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Farmer Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600">
                      <User className="h-5 w-5" />
                      Farmer Submission
                    </h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setFarmerZoom(Math.max(0.5, farmerZoom - 0.25))}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600 w-12 text-center">{Math.round(farmerZoom * 100)}%</span>
                      <button 
                        onClick={() => setFarmerZoom(Math.min(3, farmerZoom + 0.25))}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setFarmerZoom(1)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <ImagePlaceholder 
                    type="Farmer" 
                    hasImage={comparison.hasFarmerImage} 
                    zoom={farmerZoom}
                  />
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Submitted: {comparison.submissionDate}</span>
                      <span className="text-green-600 font-medium">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Officer Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                      <MapPin className="h-5 w-5" />
                      Officer Verification
                    </h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setOfficerZoom(Math.max(0.5, officerZoom - 0.25))}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600 w-12 text-center">{Math.round(officerZoom * 100)}%</span>
                      <button 
                        onClick={() => setOfficerZoom(Math.min(3, officerZoom + 0.25))}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setOfficerZoom(1)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <ImagePlaceholder 
                    type="Officer" 
                    hasImage={comparison.hasOfficerImage} 
                    zoom={officerZoom}
                  />
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Visit: {comparison.officerVisitDate}</span>
                      <span className="text-blue-600 font-medium">By {comparison.officerName}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'slider' && (
              <div className="relative h-64 lg:h-96 bg-gray-100 rounded-xl overflow-hidden border-2 border-green-200">
                <div className="absolute inset-0 flex">
                  <SliderImagePlaceholder 
                    type="Farmer" 
                    hasImage={comparison.hasFarmerImage}
                    width={sliderPosition}
                  />
                  <SliderImagePlaceholder 
                    type="Officer" 
                    hasImage={comparison.hasOfficerImage}
                    width={100 - sliderPosition}
                  />
                </div>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-green-500 cursor-col-resize transform -translate-x-1/2 shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full p-2 shadow-lg">
                    <ArrowLeftRight className="h-4 w-4 text-white" />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
                />
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  Farmer: {Math.round(sliderPosition)}%
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  Officer: {100 - Math.round(sliderPosition)}%
                </div>
              </div>
            )}

            {activeTab === 'overlay' && (
              <div className="relative h-64 lg:h-96 bg-gray-100 rounded-xl overflow-hidden border-2 border-green-200 group">
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  {comparison.hasFarmerImage ? (
                    <div className="text-center">
                      <Image className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <span className="text-lg font-semibold text-green-600">Farmer Image</span>
                      <span className="block text-sm text-gray-500 mt-2">Base Layer</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <span className="text-lg font-semibold text-gray-500">No Farmer Image</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-blue-50 opacity-0 hover:opacity-100 transition-opacity duration-500">
                  {comparison.hasOfficerImage ? (
                    <div className="text-center">
                      <Image className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                      <span className="text-lg font-semibold text-blue-600">Officer Image</span>
                      <span className="block text-sm text-gray-500 mt-2">Overlay (Hover)</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <span className="text-lg font-semibold text-gray-500">No Officer Image</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  Hover to compare
                </div>
              </div>
            )}
          </div>

          {/* Discrepancies */}
          {comparison.discrepancies.length > 0 && (
            <div className="p-6 bg-yellow-50 border-t border-yellow-200">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-800 mb-3">
                <AlertTriangle className="h-5 w-5" />
                Detected Discrepancies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {comparison.discrepancies.map((disc, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-3 bg-yellow-100 rounded-lg border border-yellow-200 animate-pulse"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-700">{disc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compare Images</h1>
          <p className="text-gray-600">Side-by-side comparison of farmer and officer images</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={resetZoom}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600 transition-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sidebar - Comparison List */}
        <div className="xl:col-span-1 space-y-4">
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search comparisons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filterItem) => (
                  <button
                    key={filterItem.value}
                    onClick={() => setFilter(filterItem.value)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      filter === filterItem.value
                        ? getStatusColor(filterItem.value)
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {getStatusIcon(filterItem.value)}
                    <span className="ml-2">{filterItem.label}</span>
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {filterItem.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison List */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
            <div className="p-4 border-b border-green-100">
              <h3 className="font-semibold text-gray-900">Comparisons ({filteredComparisons.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredComparisons.map((comparison) => (
                <div
                  key={comparison.id}
                  onClick={() => {
                    setSelectedComparison(comparison)
                    resetZoom()
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-green-50 group ${
                    selectedComparison?.id === comparison.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-700">
                      {comparison.farmerName}
                    </h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(comparison.status)}`}>
                      {comparison.matchScore}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>{comparison.plotId} • {comparison.crop}</div>
                    <div className="flex items-center gap-4">
                      <span>{comparison.village}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        comparison.locationMatch ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Comparison View */}
        <div className="xl:col-span-3">
          {selectedComparison ? (
            <ComparisonView comparison={selectedComparison} />
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-green-100">
              <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a comparison</h3>
              <p className="text-gray-600">Choose a farmer submission from the list to start comparing images</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompareImages