import React, { useState, useEffect } from 'react'
import { 
  Search, Filter, Download, Eye, User, MapPin, Calendar, 
  CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, 
  BarChart3, Phone, Mail, ChevronDown, ChevronUp, 
  RefreshCw, ExternalLink, FileText, Image, Shield,
  MoreVertical, Edit, Send, MessageCircle
} from 'lucide-react'

const FarmerTracker = () => {
  const [farmers, setFarmers] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [expandedRows, setExpandedRows] = useState(new Set())

  useEffect(() => {
    // Mock data - replace with API call
    const mockFarmers = [
      {
        id: 1,
        name: 'Ramesh Patil',
        farmerId: 'FARM-001',
        phone: '+91 98765 43210',
        email: 'ramesh.patil@example.com',
        village: 'Shivaji Nagar',
        district: 'Nashik',
        state: 'Maharashtra',
        totalPlots: 3,
        totalArea: '4.2 acres',
        joinedDate: '2023-05-15',
        lastSubmission: '2024-01-15',
        submissionStatus: 'completed',
        submissionStage: 'Stage 3',
        imageQuality: 'excellent',
        aiConfidence: 94,
        status: 'active',
        crops: ['Soybean', 'Wheat'],
        progress: 100,
        submissions: [
          { stage: 'Stage 1', date: '2024-01-10', status: 'approved', images: 2 },
          { stage: 'Stage 2', date: '2024-01-12', status: 'approved', images: 3 },
          { stage: 'Stage 3', date: '2024-01-15', status: 'pending', images: 2 }
        ],
        officerAssigned: 'Rajesh Kumar',
        nextDeadline: '2024-01-25',
        notes: 'Regular submitter, good quality images'
      },
      {
        id: 2,
        name: 'Suresh Yadav',
        farmerId: 'FARM-002',
        phone: '+91 87654 32109',
        email: 'suresh.yadav@example.com',
        village: 'Gandhi Gram',
        district: 'Nashik',
        state: 'Maharashtra',
        totalPlots: 2,
        totalArea: '3.1 acres',
        joinedDate: '2023-06-20',
        lastSubmission: '2024-01-14',
        submissionStatus: 'completed',
        submissionStage: 'Stage 2',
        imageQuality: 'good',
        aiConfidence: 87,
        status: 'active',
        crops: ['Cotton', 'Pulses'],
        progress: 66,
        submissions: [
          { stage: 'Stage 1', date: '2024-01-08', status: 'approved', images: 2 },
          { stage: 'Stage 2', date: '2024-01-14', status: 'approved', images: 2 },
          { stage: 'Stage 3', date: null, status: 'pending', images: 0 }
        ],
        officerAssigned: 'Priya Sharma',
        nextDeadline: '2024-01-28',
        notes: 'Needs reminder for Stage 3 submission'
      },
      {
        id: 3,
        name: 'Anita Deshmukh',
        farmerId: 'FARM-003',
        phone: '+91 76543 21098',
        email: 'anita.deshmukh@example.com',
        village: 'Mohan Nagar',
        district: 'Nashik',
        state: 'Maharashtra',
        totalPlots: 4,
        totalArea: '5.8 acres',
        joinedDate: '2023-04-10',
        lastSubmission: '2024-01-10',
        submissionStatus: 'delayed',
        submissionStage: 'Stage 1',
        imageQuality: 'poor',
        aiConfidence: 65,
        status: 'active',
        crops: ['Wheat', 'Vegetables'],
        progress: 33,
        submissions: [
          { stage: 'Stage 1', date: '2024-01-10', status: 'rejected', images: 1 },
          { stage: 'Stage 2', date: null, status: 'pending', images: 0 },
          { stage: 'Stage 3', date: null, status: 'pending', images: 0 }
        ],
        officerAssigned: 'Amit Singh',
        nextDeadline: '2024-01-18',
        notes: 'Image quality issues, needs assistance'
      },
      {
        id: 4,
        name: 'Vikram Jadhav',
        farmerId: 'FARM-004',
        phone: '+91 65432 10987',
        email: 'vikram.jadhav@example.com',
        village: 'Kisan Colony',
        district: 'Nashik',
        state: 'Maharashtra',
        totalPlots: 1,
        totalArea: '1.5 acres',
        joinedDate: '2023-07-05',
        lastSubmission: null,
        submissionStatus: 'not_started',
        submissionStage: 'Not Started',
        imageQuality: 'none',
        aiConfidence: 0,
        status: 'inactive',
        crops: ['Rice'],
        progress: 0,
        submissions: [
          { stage: 'Stage 1', date: null, status: 'pending', images: 0 },
          { stage: 'Stage 2', date: null, status: 'pending', images: 0 },
          { stage: 'Stage 3', date: null, status: 'pending', images: 0 }
        ],
        officerAssigned: 'Neha Patel',
        nextDeadline: '2024-01-30',
        notes: 'New farmer, orientation pending'
      }
    ]
    setFarmers(mockFarmers)
    setSelectedFarmer(mockFarmers[0])
  }, [])

  const filters = [
    { value: 'all', label: 'All Farmers', count: farmers.length },
    { value: 'active', label: 'Active', count: farmers.filter(f => f.status === 'active').length },
    { value: 'completed', label: 'Completed', count: farmers.filter(f => f.submissionStatus === 'completed').length },
    { value: 'delayed', label: 'Delayed', count: farmers.filter(f => f.submissionStatus === 'delayed').length },
    { value: 'not_started', label: 'Not Started', count: farmers.filter(f => f.submissionStatus === 'not_started').length }
  ]

  const filteredFarmers = farmers.filter(farmer => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' ? farmer.status === 'active' : farmer.submissionStatus === filter)
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'progress':
        aValue = a.progress
        bValue = b.progress
        break
      case 'lastSubmission':
        aValue = new Date(a.lastSubmission || 0)
        bValue = new Date(b.lastSubmission || 0)
        break
      case 'aiConfidence':
        aValue = a.aiConfidence
        bValue = b.aiConfidence
        break
      default:
        aValue = a.name
        bValue = b.name
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      completed: 'bg-green-100 text-green-700',
      delayed: 'bg-red-100 text-red-700',
      not_started: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle,
      inactive: XCircle,
      completed: CheckCircle,
      delayed: AlertCircle,
      not_started: Clock,
      approved: CheckCircle,
      rejected: XCircle,
      pending: Clock
    }
    const Icon = icons[status]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const getQualityColor = (quality) => {
    const colors = {
      excellent: 'text-green-600',
      good: 'text-blue-600',
      poor: 'text-red-600',
      none: 'text-gray-400'
    }
    return colors[quality] || 'text-gray-400'
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress > 0) return 'bg-orange-500'
    return 'bg-gray-300'
  }

  const toggleRowExpand = (farmerId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(farmerId)) {
      newExpanded.delete(farmerId)
    } else {
      newExpanded.add(farmerId)
    }
    setExpandedRows(newExpanded)
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(progress)}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  const SortableHeader = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 font-semibold text-gray-700 hover:text-green-600 transition-colors"
    >
      {children}
      <div className="flex flex-col">
        <ChevronUp className={`h-3 w-3 ${sortBy === column && sortOrder === 'asc' ? 'text-green-600' : 'text-gray-400'}`} />
        <ChevronDown className={`h-3 w-3 -mt-1 ${sortBy === column && sortOrder === 'desc' ? 'text-green-600' : 'text-gray-400'}`} />
      </div>
    </button>
  )

  const FarmerRow = ({ farmer }) => {
    const isExpanded = expandedRows.has(farmer.id)

    return (
      <>
        <tr 
          className={`border-b border-gray-100 hover:bg-green-50 transition-all duration-200 cursor-pointer ${
            isExpanded ? 'bg-green-50' : ''
          }`}
          onClick={() => toggleRowExpand(farmer.id)}
        >
          {/* Farmer Info */}
          <td className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{farmer.name}</div>
                <div className="text-sm text-gray-500">{farmer.farmerId}</div>
              </div>
            </div>
          </td>

          {/* Contact & Location */}
          <td className="px-4 py-4">
            <div className="text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Phone className="h-3 w-3" />
                {farmer.phone}
              </div>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <MapPin className="h-3 w-3" />
                {farmer.village}
              </div>
            </div>
          </td>

          {/* Crops & Area */}
          <td className="px-4 py-4">
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                {farmer.crops.join(', ')}
              </div>
              <div className="text-gray-500">
                {farmer.totalPlots} plots • {farmer.totalArea}
              </div>
            </div>
          </td>

          {/* Submission Status */}
          <td className="px-4 py-4">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(farmer.submissionStatus)}`}>
                {getStatusIcon(farmer.submissionStatus)}
                <span className="ml-1 capitalize">{farmer.submissionStatus.replace('_', ' ')}</span>
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Stage: {farmer.submissionStage}
            </div>
          </td>

          {/* Progress */}
          <td className="px-4 py-4">
            <div className="space-y-2">
              <ProgressBar progress={farmer.progress} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{farmer.progress}%</span>
              </div>
            </div>
          </td>

          {/* AI Confidence */}
          <td className="px-4 py-4">
            <div className="text-center">
              <div className={`text-lg font-bold ${
                farmer.aiConfidence >= 80 ? 'text-green-600' :
                farmer.aiConfidence >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {farmer.aiConfidence}%
              </div>
              <div className="text-xs text-gray-500">Confidence</div>
            </div>
          </td>

          {/* Actions */}
          <td className="px-4 py-4">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Send className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>

        {/* Expanded Details */}
        {isExpanded && (
          <tr className="bg-green-25 border-b border-green-100">
            <td colSpan="7" className="px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Submission Timeline */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    Submission Timeline
                  </h4>
                  <div className="space-y-3">
                    {farmer.submissions.map((submission, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          submission.status === 'approved' ? 'bg-green-100 text-green-600' :
                          submission.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {getStatusIcon(submission.status)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{submission.stage}</div>
                          <div className="text-sm text-gray-500">
                            {submission.date ? new Date(submission.date).toLocaleDateString() : 'Not submitted'}
                            {submission.images > 0 && ` • ${submission.images} images`}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions & Info */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        Send Reminder
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <FileText className="h-4 w-4" />
                        Generate Report
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Image className="h-4 w-4" />
                        View Images
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Officer Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assigned Officer:</span>
                        <span className="font-medium text-blue-600">{farmer.officerAssigned}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Deadline:</span>
                        <span className="font-medium text-orange-600">
                          {farmer.nextDeadline ? new Date(farmer.nextDeadline).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Image Quality:</span>
                        <span className={`font-medium ${getQualityColor(farmer.imageQuality)}`}>
                          {farmer.imageQuality}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {farmer.notes && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-yellow-800">Notes:</span>
                      <p className="text-sm text-yellow-700 mt-1">{farmer.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </td>
          </tr>
        )}
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Submission Tracker</h1>
          <p className="text-gray-600">Monitor and manage farmer image submissions and progress</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600 transition-all">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-gray-900">{farmers.length}</div>
          <div className="text-sm text-gray-600">Total Farmers</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">
            {farmers.filter(f => f.submissionStatus === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">
            {farmers.filter(f => f.submissionStatus === 'delayed').length}
          </div>
          <div className="text-sm text-gray-600">Delayed</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(farmers.reduce((acc, f) => acc + f.progress, 0) / farmers.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmers by name, ID, village, or crop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  filter === filterItem.value
                    ? 'bg-green-100 text-green-700 border-green-300'
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

      {/* Farmers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <SortableHeader column="name">
                    Farmer Details
                  </SortableHeader>
                </th>
                <th className="px-4 py-3 text-left">Contact & Location</th>
                <th className="px-4 py-3 text-left">Crops & Area</th>
                <th className="px-4 py-3 text-left">Submission Status</th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader column="progress">
                    Progress
                  </SortableHeader>
                </th>
                <th className="px-4 py-3 text-left">
                  <SortableHeader column="aiConfidence">
                    AI Confidence
                  </SortableHeader>
                </th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedFarmers.map((farmer) => (
                <FarmerRow key={farmer.id} farmer={farmer} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedFarmers.length === 0 && (
          <div className="p-12 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No farmers found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'No farmers match the current filters'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>
            Showing <span className="font-semibold text-gray-900">{sortedFarmers.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{farmers.length}</span> farmers
          </div>
          <div className="flex items-center gap-4">
            <span>Avg AI Confidence: <span className="font-semibold text-green-600">
              {Math.round(farmers.reduce((acc, f) => acc + f.aiConfidence, 0) / farmers.length)}%
            </span></span>
            <span>Overall Progress: <span className="font-semibold text-blue-600">
              {Math.round(farmers.reduce((acc, f) => acc + f.progress, 0) / farmers.length)}%
            </span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerTracker