import React, { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, Search, Filter, Download, Eye, User, MapPin, Calendar, Image, RotateCcw } from 'lucide-react'

const ApprovalWorkflow = () => {
  const [submissions, setSubmissions] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data - replace with API call
    const mockSubmissions = [
      {
        id: 1,
        farmerName: 'Ramesh Patil',
        farmerId: 'FARM-001',
        plotId: 'PLOT-001',
        village: 'Shivaji Nagar',
        crop: 'Soybean',
        stage: 'Flowering',
        submissionDate: '2024-01-15',
        hasFarmerImage: true,
        hasOfficerImage: true,
        status: 'pending',
        aiConfidence: 94,
        healthScore: 85,
        discrepancies: [],
        officerName: 'Rajesh Kumar',
        officerVisitDate: '2024-01-15',
        locationMatch: true,
        qualityScore: 92
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
        hasFarmerImage: true,
        hasOfficerImage: true,
        status: 'approved',
        aiConfidence: 87,
        healthScore: 65,
        discrepancies: ['Growth stage mismatch'],
        officerName: 'Priya Sharma',
        officerVisitDate: '2024-01-14',
        locationMatch: true,
        qualityScore: 88
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
        hasFarmerImage: true,
        hasOfficerImage: false,
        status: 'rejected',
        aiConfidence: 76,
        healthScore: 45,
        discrepancies: ['Poor image quality', 'Location mismatch', 'Stage verification failed'],
        officerName: 'Amit Singh',
        officerVisitDate: '2024-01-13',
        locationMatch: false,
        qualityScore: 45
      },
      {
        id: 4,
        farmerName: 'Vikram Jadhav',
        farmerId: 'FARM-004',
        plotId: 'PLOT-004',
        village: 'Kisan Colony',
        crop: 'Rice',
        stage: 'Seedling',
        submissionDate: '2024-01-12',
        hasFarmerImage: true,
        hasOfficerImage: true,
        status: 'resubmission',
        aiConfidence: 82,
        healthScore: 78,
        discrepancies: ['Blurry image'],
        officerName: 'Neha Patel',
        officerVisitDate: '2024-01-12',
        locationMatch: true,
        qualityScore: 65
      }
    ]
    setSubmissions(mockSubmissions)
  }, [])

  const filters = [
    { value: 'all', label: 'All Submissions', count: submissions.length },
    { value: 'pending', label: 'Pending Review', count: submissions.filter(s => s.status === 'pending').length },
    { value: 'approved', label: 'Approved', count: submissions.filter(s => s.status === 'approved').length },
    { value: 'rejected', label: 'Rejected', count: submissions.filter(s => s.status === 'rejected').length },
    { value: 'resubmission', label: 'Resubmission', count: submissions.filter(s => s.status === 'resubmission').length }
  ]

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter
    const matchesSearch = submission.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.farmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.plotId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      approved: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
      resubmission: 'bg-blue-100 text-blue-700 border-blue-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle,
      resubmission: AlertCircle
    }
    const Icon = icons[status]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const getButtonVariant = (submission, action) => {
    if (submission.status === action) {
      return 'solid' // Current status - solid button
    }
    return 'outline' // Other actions - outline button
  }

  const handleApprove = (id) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'approved' } : sub
    ))
  }

  const handleReject = (id) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'rejected' } : sub
    ))
  }

  const handleRequestResubmission = (id) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'resubmission' } : sub
    ))
  }

  // Action Button Component
  const ActionButton = ({ submission, action, onClick, icon: Icon, label }) => {
    const variant = getButtonVariant(submission, action)
    
    const baseStyles = "flex items-center px-4 py-2 text-sm rounded-lg transition-all font-medium"
    
    const styles = {
      approve: {
        solid: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
        outline: "bg-white border border-green-600 text-green-600 hover:bg-green-50"
      },
      reject: {
        solid: "bg-red-600 text-white hover:bg-red-700 shadow-lg", 
        outline: "bg-white border border-red-600 text-red-600 hover:bg-red-50"
      },
      resubmission: {
        solid: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
        outline: "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
      }
    }

    return (
      <button 
        onClick={() => onClick(submission.id)}
        className={`${baseStyles} ${styles[action][variant]}`}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </button>
    )
  }

  // Image placeholder component
  const ImagePlaceholder = ({ type, hasImage }) => (
    <div className="h-32 bg-gray-100 rounded flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
      {hasImage ? (
        <>
          <Image className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-sm text-green-600 font-medium">{type} Image</span>
          <span className="text-xs text-gray-500 mt-1">Click to view</span>
        </>
      ) : (
        <>
          <Image className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">No {type} Image</span>
        </>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval/Verification Workflow</h1>
          <p className="text-gray-600">Review and verify farmer submissions with officer validations</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
          <div className="text-sm text-gray-600">Total Submissions</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">
            {submissions.filter(s => s.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">
            {submissions.filter(s => s.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <div className="text-2xl font-bold text-red-600">
            {submissions.filter(s => s.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by farmer name, ID, or plot ID..."
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

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div key={submission.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Submission Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                      {getStatusIcon(submission.status)}
                      <span className="ml-1 capitalize">{submission.status}</span>
                    </span>
                    <span className={`text-sm font-medium ${submission.locationMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {submission.locationMatch ? '📍 Location Match' : '📍 Location Mismatch'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Farmer</p>
                      <p className="font-semibold text-gray-900">{submission.farmerName}</p>
                      <p className="text-xs text-gray-500">{submission.farmerId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Plot & Village</p>
                      <p className="font-semibold text-gray-900">{submission.plotId}</p>
                      <p className="text-xs text-gray-500">{submission.village}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Crop & Stage</p>
                      <p className="font-semibold text-gray-900">
                        {submission.crop} • {submission.stage}
                      </p>
                    </div>
                  </div>

                  {/* Image Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Farmer Submission</span>
                      </div>
                      <ImagePlaceholder type="Farmer" hasImage={submission.hasFarmerImage} />
                      <div className="mt-2 text-xs text-gray-500">
                        Submitted: {submission.submissionDate}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Officer Verification</span>
                      </div>
                      <ImagePlaceholder type="Officer" hasImage={submission.hasOfficerImage} />
                      <div className="mt-2 text-xs text-gray-500">
                        Officer: {submission.officerName}
                        <br />
                        Visit: {submission.officerVisitDate}
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis & Discrepancies */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">AI Confidence</p>
                      <p className={`font-semibold ${
                        submission.aiConfidence >= 90 ? 'text-green-600' :
                        submission.aiConfidence >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {submission.aiConfidence}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Health Score</p>
                      <p className={`font-semibold ${
                        submission.healthScore >= 80 ? 'text-green-600' :
                        submission.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {submission.healthScore}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quality Score</p>
                      <p className={`font-semibold ${
                        submission.qualityScore >= 80 ? 'text-green-600' :
                        submission.qualityScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {submission.qualityScore}/100
                      </p>
                    </div>
                  </div>

                  {/* Discrepancies */}
                  {submission.discrepancies.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm font-medium text-yellow-800 mb-2">⚠️ Discrepancies Found:</p>
                      <div className="flex flex-wrap gap-2">
                        {submission.discrepancies.map((disc, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-lg"
                          >
                            {disc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions - ALWAYS SHOW ALL BUTTONS */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <ActionButton
                    submission={submission}
                    action="approve"
                    onClick={handleApprove}
                    icon={CheckCircle}
                    label="Approve"
                  />
                  <ActionButton
                    submission={submission}
                    action="reject"
                    onClick={handleReject}
                    icon={XCircle}
                    label="Reject"
                  />
                  <ActionButton
                    submission={submission}
                    action="resubmission"
                    onClick={handleRequestResubmission}
                    icon={RotateCcw}
                    label="Resubmit"
                  />
                  
                  {/* View Details Button */}
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-green-500 hover:text-green-600 transition-all font-medium">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="text-sm text-gray-600">
                Last updated: {submission.officerVisitDate} by {submission.officerName}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Submission: {submission.submissionDate}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Visit: {submission.officerVisitDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubmissions.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-green-100">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms' : 'All submissions have been processed'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ApprovalWorkflow