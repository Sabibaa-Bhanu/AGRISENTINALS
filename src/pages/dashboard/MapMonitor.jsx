import React, { useMemo, useState } from 'react'
import {
  Search,
  Download,
  AlertTriangle,
  MapPin,
  Sprout,
  ShieldAlert,
  Activity,
  Navigation,
  Eye,
  Clock,
  CheckCircle2
} from 'lucide-react'

const MapMonitor = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlot, setSelectedPlot] = useState(null)

  // Demo data - will be replaced by backend/API data later
  const plots = [
    {
      id: 'AG-001',
      position: { top: '28%', left: '36%' },
      farmerName: 'Ramesh Patil',
      village: 'Nashik Rural',
      crop: 'Paddy',
      stage: 'Flowering',
      health: 'Good',
      risk: 'Low',
      disease: 'Healthy',
      confidence: 96.4,
      lastImage: '16 Sep 2026',
      officerVisited: true,
      validation: 'Validated'
    },
    {
      id: 'AG-002',
      position: { top: '42%', left: '55%' },
      farmerName: 'Suresh Yadav',
      village: 'Dindori',
      crop: 'Paddy',
      stage: 'Vegetative',
      health: 'Moderate',
      risk: 'Medium',
      disease: 'Bacterial Blight',
      confidence: 91.2,
      lastImage: '15 Sep 2026',
      officerVisited: false,
      validation: 'Pending'
    },
    {
      id: 'AG-003',
      position: { top: '63%', left: '29%' },
      farmerName: 'Mahesh Shinde',
      village: 'Igatpuri',
      crop: 'Cotton',
      stage: 'Flowering',
      health: 'Critical',
      risk: 'High',
      disease: 'Pest / Disease Risk',
      confidence: 88.7,
      lastImage: '14 Sep 2026',
      officerVisited: false,
      validation: 'Pending'
    },
    {
      id: 'AG-004',
      position: { top: '67%', left: '64%' },
      farmerName: 'Ganesh Pawar',
      village: 'Yeola',
      crop: 'Wheat',
      stage: 'Early',
      health: 'Good',
      risk: 'Low',
      disease: 'Healthy',
      confidence: 97.1,
      lastImage: '16 Sep 2026',
      officerVisited: true,
      validation: 'Validated'
    },
    {
      id: 'AG-005',
      position: { top: '34%', left: '76%' },
      farmerName: 'Vijay More',
      village: 'Sinnar',
      crop: 'Corn',
      stage: 'Maturity',
      health: 'Moderate',
      risk: 'Medium',
      disease: 'Disease Risk',
      confidence: 84.6,
      lastImage: '13 Sep 2026',
      officerVisited: false,
      validation: 'Pending'
    },
    {
      id: 'AG-006',
      position: { top: '76%', left: '47%' },
      farmerName: 'Sunil Jadhav',
      village: 'Niphad',
      crop: 'Paddy',
      stage: 'Flowering',
      health: 'Critical',
      risk: 'High',
      disease: 'Blast Risk',
      confidence: 93.5,
      lastImage: '12 Sep 2026',
      officerVisited: false,
      validation: 'Pending'
    }
  ]

  const filters = [
    { value: 'all', label: 'All Fields' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'pending', label: 'Pending Validation' }
  ]

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      const search = searchTerm.toLowerCase()

      const matchesSearch =
        plot.farmerName.toLowerCase().includes(search) ||
        plot.id.toLowerCase().includes(search) ||
        plot.village.toLowerCase().includes(search) ||
        plot.crop.toLowerCase().includes(search) ||
        plot.disease.toLowerCase().includes(search)

      let matchesFilter = true

      if (filter === 'high') {
        matchesFilter = plot.risk === 'High'
      } else if (filter === 'medium') {
        matchesFilter = plot.risk === 'Medium'
      } else if (filter === 'healthy') {
        matchesFilter = plot.health === 'Good'
      } else if (filter === 'pending') {
        matchesFilter = plot.validation === 'Pending'
      }

      return matchesSearch && matchesFilter
    })
  }, [filter, searchTerm])

  const getMarkerClass = (plot) => {
    if (plot.risk === 'High') {
      return 'bg-red-500 border-red-200 shadow-red-300'
    }

    if (plot.risk === 'Medium') {
      return 'bg-yellow-500 border-yellow-200 shadow-yellow-300'
    }

    return 'bg-green-500 border-green-200 shadow-green-300'
  }

  const getHealthBadge = (health) => {
    if (health === 'Good') {
      return 'bg-green-100 text-green-700'
    }

    if (health === 'Moderate') {
      return 'bg-yellow-100 text-yellow-700'
    }

    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Field & Hotspot Map
            </h1>
          </div>

          <p className="text-gray-600 mt-1">
            Monitor crop health, disease risks and field-level hotspots
          </p>
        </div>

        <button className="flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm">
          <Download className="h-4 w-4 mr-2" />
          Export Field Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fields Monitored</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">486</p>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <Sprout className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High-Risk Fields</p>
              <p className="text-2xl font-bold text-red-600 mt-1">18</p>
            </div>

            <div className="p-3 bg-red-100 rounded-xl">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-yellow-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Disease Hotspots</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">12</p>
            </div>

            <div className="p-3 bg-yellow-100 rounded-xl">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Follow-ups</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">27</p>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search farmer, field ID, village, crop or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                  filter === item.value
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Map + Hotspots */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Map */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

          <div className="px-5 py-4 border-b border-green-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Field Risk Map
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Demo geospatial visualization
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
              <Navigation className="h-4 w-4" />
              Locate
            </button>
          </div>

          {/* Demo Map */}
          <div className="relative h-[450px] overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">

            {/* Background field patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-8 left-8 w-48 h-28 border-2 border-green-300 rounded-[40%] rotate-12" />
              <div className="absolute top-32 right-16 w-56 h-32 border-2 border-green-300 rounded-[40%] -rotate-6" />
              <div className="absolute bottom-20 left-20 w-64 h-32 border-2 border-green-300 rounded-[45%] rotate-6" />
              <div className="absolute bottom-10 right-20 w-48 h-28 border-2 border-green-300 rounded-[40%] -rotate-12" />
            </div>

            {/* Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300/60 rotate-6" />
            <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-300/60 -rotate-12" />

            {/* Map label */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
              <p className="text-xs font-semibold text-gray-700">
                Nashik Monitoring Zone
              </p>
            </div>

            {/* Markers */}
            {filteredPlots.map((plot) => (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                style={{
                  top: plot.position.top,
                  left: plot.position.left
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-4 ${getMarkerClass(
                  plot
                )} shadow-lg hover:scale-125 transition-transform duration-200 z-10`}
                title={`${plot.id} - ${plot.disease}`}
              >
                <span className="sr-only">{plot.farmerName}</span>
              </button>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-md p-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Risk Level
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600">Low Risk</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-xs text-gray-600">Medium Risk</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-gray-600">High Risk</span>
                </div>
              </div>
            </div>

            {/* Selected Plot Popup */}
            {selectedPlot && (
              <div className="absolute top-4 right-4 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20">

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">
                      {selectedPlot.id}
                    </p>
                    <h3 className="font-semibold text-gray-900">
                      {selectedPlot.farmerName}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedPlot(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Crop</span>
                    <span className="font-medium">{selectedPlot.crop}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Risk</span>
                    <span
                      className={
                        selectedPlot.risk === 'High'
                          ? 'font-medium text-red-600'
                          : selectedPlot.risk === 'Medium'
                          ? 'font-medium text-yellow-600'
                          : 'font-medium text-green-600'
                      }
                    >
                      {selectedPlot.risk}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Detection</span>
                    <span className="font-medium text-right ml-3">
                      {selectedPlot.disease}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Confidence</span>
                    <span className="font-medium">
                      {selectedPlot.confidence}%
                    </span>
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* Hotspot Panel */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

          <div className="px-5 py-4 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Active Hotspots
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fields requiring attention
                </p>
              </div>

              <Activity className="h-5 w-5 text-red-500" />
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[450px] overflow-y-auto">

            {plots
              .filter((plot) => plot.risk === 'High')
              .map((plot) => (
                <div
                  key={plot.id}
                  className="p-4 hover:bg-red-50/40 transition-colors"
                >

                  <div className="flex items-start gap-3">

                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {plot.id}
                        </h3>

                        <span className="px-2 py-1 text-[10px] font-semibold bg-red-100 text-red-700 rounded-full">
                          HIGH
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {plot.farmerName} · {plot.village}
                      </p>

                      <p className="text-xs font-medium text-red-600 mt-2">
                        {plot.disease}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] text-gray-500">
                          AI Confidence: {plot.confidence}%
                        </span>

                        <button
                          onClick={() => setSelectedPlot(plot)}
                          className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        </div>

      </div>

      {/* Field List */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

        <div className="px-6 py-4 border-b border-green-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Monitored Fields
            </h2>

            <p className="text-sm text-gray-500">
              Showing {filteredPlots.length} matching field records
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">

          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="p-5 hover:bg-green-50/40 transition-colors"
            >

              <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                {/* Field Identity */}
                <div className="flex items-center gap-3 flex-1">

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plot.risk === 'High'
                        ? 'bg-red-100'
                        : plot.risk === 'Medium'
                        ? 'bg-yellow-100'
                        : 'bg-green-100'
                    }`}
                  >
                    <Sprout
                      className={`h-5 w-5 ${
                        plot.risk === 'High'
                          ? 'text-red-600'
                          : plot.risk === 'Medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {plot.id}
                      </h3>

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthBadge(
                          plot.health
                        )}`}
                      >
                        {plot.health}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      {plot.farmerName} · {plot.village}
                    </p>
                  </div>

                </div>

                {/* Crop */}
                <div className="lg:w-28">
                  <p className="text-xs text-gray-400">Crop</p>
                  <p className="text-sm font-medium text-gray-800">
                    {plot.crop}
                  </p>
                </div>

                {/* Disease */}
                <div className="lg:w-44">
                  <p className="text-xs text-gray-400">AI Detection</p>
                  <p className="text-sm font-medium text-gray-800">
                    {plot.disease}
                  </p>
                </div>

                {/* Confidence */}
                <div className="lg:w-28">
                  <p className="text-xs text-gray-400">Confidence</p>
                  <p className="text-sm font-medium text-gray-800">
                    {plot.confidence}%
                  </p>
                </div>

                {/* Validation */}
                <div className="lg:w-32">
                  <p className="text-xs text-gray-400">Validation</p>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      plot.validation === 'Validated'
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }`}
                  >
                    {plot.validation === 'Validated' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}

                    {plot.validation}
                  </span>
                </div>

                {/* Action */}
                <button
                  onClick={() => setSelectedPlot(plot)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Details
                </button>

              </div>

            </div>
          ))}

          {filteredPlots.length === 0 && (
            <div className="p-10 text-center">
              <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-700">
                No fields found
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Try changing the search or risk filter.
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default MapMonitor