import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, AlertTriangle, MapPin } from 'lucide-react'

const MapMonitor = () => {
  const [plots, setPlots] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const mockPlots = [
      {
        id: 1,
        position: [19.9975, 73.7898],
        farmerName: 'Ramesh Patil',
        crop: 'Soybean',
        stage: 'Flowering',
        health: 'Good',
        damage: 'None',
        lastImage: '2024-01-15',
        officerVisited: true
      },
      {
        id: 2,
        position: [20.0000, 73.7950],
        farmerName: 'Suresh Yadav',
        crop: 'Cotton',
        stage: 'Vegetative',
        health: 'Moderate',
        damage: 'Pest Attack',
        lastImage: '2024-01-14',
        officerVisited: false
      }
    ]
    setPlots(mockPlots)
  }, [])

  const filters = [
    { value: 'all', label: 'All Plots', color: 'gray' },
    { value: 'damage', label: 'Damage Reported', color: 'red' },
    { value: 'no-image', label: 'No Image Submitted', color: 'yellow' },
    { value: 'pending-visit', label: 'Pending Officer Visit', color: 'orange' }
  ]

  const filteredPlots = plots.filter(plot => {
    if (filter === 'damage') return plot.damage !== 'None'
    if (filter === 'no-image') return !plot.lastImage
    if (filter === 'pending-visit') return !plot.officerVisited
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Map-Based Monitoring</h1>
          <p className="text-gray-600">Real-time plot visualization and monitoring</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by farmer name, plot ID, village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === filterItem.value
                    ? `bg-${filterItem.color}-100 text-${filterItem.color}-700 border-2 border-${filterItem.color}-300`
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <div className="text-sm text-gray-600">Total Plots</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">894</div>
          <div className="text-sm text-gray-600">Images Submitted</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">127</div>
          <div className="text-sm text-gray-600">Pending Visits</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-sm text-gray-600">Damage Alerts</div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="h-96 lg:h-[500px] relative bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
            <p className="text-gray-500 mb-4">Map visualization will be integrated here</p>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Good Health</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Damage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plots List */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-green-100">
          <h2 className="text-lg font-semibold text-gray-900">Plots Overview ({filteredPlots.length})</h2>
        </div>
        <div className="divide-y divide-green-50">
          {filteredPlots.map((plot) => (
            <div key={plot.id} className="p-6 hover:bg-green-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{plot.farmerName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plot.health === 'Good' ? 'bg-green-100 text-green-700' :
                      plot.health === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {plot.health}
                    </span>
                    {plot.damage !== 'None' && (
                      <span className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {plot.damage}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Crop:</strong> {plot.crop}
                    </div>
                    <div>
                      <strong>Stage:</strong> {plot.stage}
                    </div>
                    <div>
                      <strong>Last Image:</strong> {plot.lastImage}
                    </div>
                    <div>
                      <strong>Officer Visit:</strong> 
                      <span className={plot.officerVisited ? 'text-green-600 ml-1' : 'text-orange-600 ml-1'}>
                        {plot.officerVisited ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MapMonitor