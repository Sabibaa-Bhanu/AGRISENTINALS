import React, { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  User,
  MapPin,
  Calendar,
  Image as ImageIcon,
  RotateCcw,
  ShieldCheck,
  Brain,
  Leaf,
  Activity,
  FileCheck,
  X,
  MessageSquare,
  Navigation,
  UserCheck
} from 'lucide-react'

const ApprovalWorkflow = () => {
  const [validations, setValidations] = useState([
    {
      id: 1,
      farmerName: 'Ramesh Patil',
      farmerId: 'FARM-001',
      fieldId: 'AG-001',
      village: 'Shivaji Nagar',
      crop: 'Paddy',
      stage: 'Flowering',
      disease: 'Bacterial Blight',
      aiConfidence: 94,
      cropConfidence: 97,
      stageConfidence: 91,
      diseaseConfidence: 89,
      healthScore: 72,
      imageQuality: 94,
      status: 'pending',
      source: 'Farmer App',
      submittedBy: 'Ramesh Patil',
      submissionDate: '16 Sep 2026',
      captureDate: '16 Sep 2026',
      latitude: '20.0059',
      longitude: '73.7897',
      locationMatch: true,
      expertNote: '',
      imageAvailable: true
    },
    {
      id: 2,
      farmerName: 'Suresh Yadav',
      farmerId: 'FARM-002',
      fieldId: 'AG-002',
      village: 'Gandhi Gram',
      crop: 'Paddy',
      stage: 'Vegetative',
      disease: 'Healthy',
      aiConfidence: 91,
      cropConfidence: 95,
      stageConfidence: 88,
      diseaseConfidence: 90,
      healthScore: 88,
      imageQuality: 92,
      status: 'validated',
      source: 'Field Official',
      submittedBy: 'Priya Sharma',
      submissionDate: '15 Sep 2026',
      captureDate: '15 Sep 2026',
      latitude: '20.0121',
      longitude: '73.8012',
      locationMatch: true,
      expertNote: 'AI result matches field image.',
      imageAvailable: true
    },
    {
      id: 3,
      farmerName: 'Anita Deshmukh',
      farmerId: 'FARM-003',
      fieldId: 'AG-003',
      village: 'Mohan Nagar',
      crop: 'Paddy',
      stage: 'Maturity',
      disease: 'Blast',
      aiConfidence: 78,
      cropConfidence: 93,
      stageConfidence: 71,
      diseaseConfidence: 76,
      healthScore: 54,
      imageQuality: 68,
      status: 'needs_review',
      source: 'Field Official',
      submittedBy: 'Amit Singh',
      submissionDate: '14 Sep 2026',
      captureDate: '14 Sep 2026',
      latitude: '19.9981',
      longitude: '73.7764',
      locationMatch: true,
      expertNote: 'Disease symptoms require closer inspection.',
      imageAvailable: true
    },
    {
      id: 4,
      farmerName: 'Vikram Jadhav',
      farmerId: 'FARM-004',
      fieldId: 'AG-004',
      village: 'Kisan Colony',
      crop: 'Paddy',
      stage: 'Early',
      disease: 'Healthy',
      aiConfidence: 69,
      cropConfidence: 82,
      stageConfidence: 67,
      diseaseConfidence: 61,
      healthScore: 79,
      imageQuality: 58,
      status: 'rejected',
      source: 'Farmer App',
      submittedBy: 'Vikram Jadhav',
      submissionDate: '13 Sep 2026',
      captureDate: '13 Sep 2026',
      latitude: '20.0213',
      longitude: '73.8145',
      locationMatch: false,
      expertNote: 'Image quality insufficient for reliable validation.',
      imageAvailable: true
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValidation, setSelectedValidation] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const filters = [
    {
      value: 'all',
      label: 'All',
      count: validations.length
    },
    {
      value: 'pending',
      label: 'Pending Review',
      count: validations.filter(v => v.status === 'pending').length
    },
    {
      value: 'validated',
      label: 'Validated',
      count: validations.filter(v => v.status === 'validated').length
    },
    {
      value: 'needs_review',
      label: 'Needs Review',
      count: validations.filter(v => v.status === 'needs_review').length
    },
    {
      value: 'rejected',
      label: 'Rejected',
      count: validations.filter(v => v.status === 'rejected').length
    }
  ]

  const filteredValidations = validations.filter(item => {
    const matchesFilter =
      filter === 'all' || item.status === filter

    const search = searchTerm.toLowerCase()

    const matchesSearch =
      item.farmerName.toLowerCase().includes(search) ||
      item.farmerId.toLowerCase().includes(search) ||
      item.fieldId.toLowerCase().includes(search) ||
      item.village.toLowerCase().includes(search) ||
      item.crop.toLowerCase().includes(search) ||
      item.disease.toLowerCase().includes(search)

    return matchesFilter && matchesSearch
  })

  const updateStatus = (id, status) => {
    setValidations(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status }
          : item
      )
    )

    if (selectedValidation?.id === id) {
      setSelectedValidation(prev => ({
        ...prev,
        status
      }))
    }
  }

  const getStatusStyle = status => {
    const styles = {
      pending:
        'bg-yellow-100 text-yellow-700 border-yellow-300',
      validated:
        'bg-green-100 text-green-700 border-green-300',
      needs_review:
        'bg-orange-100 text-orange-700 border-orange-300',
      rejected:
        'bg-red-100 text-red-700 border-red-300'
    }

    return styles[status] ||
      'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getStatusIcon = status => {
    const icons = {
      pending: Clock,
      validated: CheckCircle,
      needs_review: AlertCircle,
      rejected: XCircle
    }

    const Icon = icons[status]

    return Icon ? (
      <Icon className="h-4 w-4" />
    ) : null
  }

  const getStatusLabel = status => {
    const labels = {
      pending: 'Pending Review',
      validated: 'Validated',
      needs_review: 'Needs Review',
      rejected: 'Rejected'
    }

    return labels[status] || status
  }

  const getConfidenceColor = confidence => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getHealthColor = score => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const openDetails = item => {
    setSelectedValidation(item)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedValidation(null)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Expert Validation
          </h1>

          <p className="text-gray-600">
            Review and validate AI-generated crop health findings
          </p>
        </div>

        <button
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Validation Report
        </button>
      </div>

      {/* Prototype Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />

        <div>
          <p className="font-semibold text-green-800">
            Prototype Validation Mode
          </p>

          <p className="text-sm text-green-700 mt-1">
            The records shown here are demonstration data.
            Validation actions currently update the UI only and
            are not connected to the backend.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-gray-900">
            {validations.length}
          </div>
          <div className="text-sm text-gray-600">
            AI Findings
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">
            {validations.filter(v => v.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">
            Pending Review
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">
            {validations.filter(v => v.status === 'needs_review').length}
          </div>
          <div className="text-sm text-gray-600">
            Needs Review
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">
            {validations.filter(v => v.status === 'validated').length}
          </div>
          <div className="text-sm text-gray-600">
            Validated
          </div>
        </div>

      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1">
            <div className="relative">

              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search farmer, field ID, village, crop or disease..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

            </div>
          </div>

          <div className="flex flex-wrap gap-2">

            {filters.map(item => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                  filter === item.value
                    ? getStatusStyle(item.value)
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                }`}
              >

                {item.value !== 'all' && getStatusIcon(item.value)}

                {item.value === 'all' && (
                  <Filter className="h-4 w-4" />
                )}

                <span className="ml-2">
                  {item.label}
                </span>

                <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {item.count}
                </span>

              </button>
            ))}

          </div>

        </div>
      </div>

      {/* Validation Cards */}
      <div className="space-y-4">

        {filteredValidations.map(item => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow"
          >

            <div className="p-6">

              <div className="flex flex-col xl:flex-row gap-6">

                {/* Main Information */}
                <div className="flex-1">

                  {/* Status Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">

                    <span
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(item.status)}`}
                    >
                      {getStatusIcon(item.status)}

                      <span className="ml-1">
                        {getStatusLabel(item.status)}
                      </span>
                    </span>

                    <span
                      className={`flex items-center text-sm font-medium ${
                        item.locationMatch
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      <Navigation className="h-4 w-4 mr-1" />

                      {item.locationMatch
                        ? 'Geo-location Matched'
                        : 'Geo-location Mismatch'}
                    </span>

                    <span className="text-xs text-gray-500">
                      Source: {item.source}
                    </span>

                  </div>

                  {/* Farmer / Field Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">

                    <div>
                      <p className="text-xs text-gray-500">
                        Farmer
                      </p>

                      <p className="font-semibold text-gray-900">
                        {item.farmerName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.farmerId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Field
                      </p>

                      <p className="font-semibold text-gray-900">
                        {item.fieldId}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.village}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Crop
                      </p>

                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-600" />

                        <p className="font-semibold text-gray-900">
                          {item.crop}
                        </p>
                      </div>

                      <p className="text-xs text-gray-500">
                        Stage: {item.stage}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        AI Detection
                      </p>

                      <p className="font-semibold text-gray-900">
                        {item.disease}
                      </p>

                      <p
                        className={`text-sm font-semibold ${getConfidenceColor(
                          item.diseaseConfidence
                        )}`}
                      >
                        {item.diseaseConfidence}% confidence
                      </p>
                    </div>

                  </div>

                  {/* AI Pipeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">

                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-green-600" />

                        <span className="text-sm font-medium text-gray-700">
                          Crop Classification
                        </span>
                      </div>

                      <p className="font-semibold text-gray-900">
                        {item.crop}
                      </p>

                      <p className={`text-sm font-semibold ${getConfidenceColor(item.cropConfidence)}`}>
                        {item.cropConfidence}% confidence
                      </p>

                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-blue-600" />

                        <span className="text-sm font-medium text-gray-700">
                          Growth Stage
                        </span>
                      </div>

                      <p className="font-semibold text-gray-900">
                        {item.stage}
                      </p>

                      <p className={`text-sm font-semibold ${getConfidenceColor(item.stageConfidence)}`}>
                        {item.stageConfidence}% confidence
                      </p>

                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />

                        <span className="text-sm font-medium text-gray-700">
                          Disease Detection
                        </span>
                      </div>

                      <p className="font-semibold text-gray-900">
                        {item.disease}
                      </p>

                      <p className={`text-sm font-semibold ${getConfidenceColor(item.diseaseConfidence)}`}>
                        {item.diseaseConfidence}% confidence
                      </p>

                    </div>

                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">
                          Overall AI Confidence
                        </span>

                        <span className={`font-semibold ${getConfidenceColor(item.aiConfidence)}`}>
                          {item.aiConfidence}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${item.aiConfidence}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">
                          Crop Health
                        </span>

                        <span className={`font-semibold ${getHealthColor(item.healthScore)}`}>
                          {item.healthScore}/100
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${item.healthScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">
                          Image Quality
                        </span>

                        <span className={`font-semibold ${getConfidenceColor(item.imageQuality)}`}>
                          {item.imageQuality}/100
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${item.imageQuality}%` }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Review Warning */}
                  {(item.status === 'needs_review' ||
                    !item.locationMatch ||
                    item.imageQuality < 70) && (

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">

                      <div className="flex items-start gap-2">

                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />

                        <div>

                          <p className="text-sm font-semibold text-yellow-800">
                            Validation Attention Required
                          </p>

                          <p className="text-xs text-yellow-700 mt-1">
                            Review image quality, AI confidence and
                            geo-location evidence before validating
                            this finding.
                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 xl:w-48">

                  <button
                    onClick={() => updateStatus(item.id, 'validated')}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all font-medium"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, 'needs_review')}
                    className="flex items-center justify-center px-4 py-2 bg-white border border-orange-500 text-orange-600 text-sm rounded-lg hover:bg-orange-50 transition-all font-medium"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Needs Review
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, 'rejected')}
                    className="flex items-center justify-center px-4 py-2 bg-white border border-red-500 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-all font-medium"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Finding
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, 'pending')}
                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-green-500 hover:text-green-600 transition-all font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Review
                  </button>

                  <button
                    onClick={() => openDetails(item)}
                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-green-500 hover:text-green-600 transition-all font-medium"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Evidence
                  </button>

                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row justify-between gap-2">

              <div className="flex items-center gap-4 text-xs text-gray-600">

                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Captured: {item.captureDate}
                </span>

                <span className="flex items-center">
                  <UserCheck className="h-3 w-3 mr-1" />
                  Uploaded by: {item.submittedBy}
                </span>

              </div>

              <div className="text-xs text-gray-500">
                Field: {item.fieldId}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Empty State */}
      {filteredValidations.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-green-100">

          <FileCheck className="h-12 w-12 text-green-400 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No validation records found
          </h3>

          <p className="text-gray-600">
            Try adjusting your search or validation filter.
          </p>

        </div>
      )}

      {/* Evidence Modal */}
      {showDetails && selectedValidation && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Validation Evidence
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedValidation.farmerName} • {selectedValidation.fieldId}
                </p>
              </div>

              <button
                onClick={closeDetails}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh]">

              {/* Demo Notice */}
              <div className="mb-5 bg-green-50 border border-green-200 rounded-xl p-4">

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />

                  <p className="font-semibold text-green-800">
                    Evidence Review — Prototype Mode
                  </p>
                </div>

                <p className="text-sm text-green-700 mt-1">
                  Images and validation information shown here
                  are demonstration data.
                </p>

              </div>

              {/* Image Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="border border-gray-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-3">

                    <User className="h-5 w-5 text-green-600" />

                    <h3 className="font-semibold text-gray-900">
                      Submitted Crop Image
                    </h3>

                  </div>

                  <div className="h-64 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">

                    {selectedValidation.imageAvailable ? (
                      <>
                        <ImageIcon className="h-12 w-12 text-green-500 mb-3" />

                        <p className="text-sm font-medium text-green-700">
                          Crop Image Available
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Geo-tagged image
                        </p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />

                        <p className="text-sm text-gray-500">
                          No image available
                        </p>
                      </>
                    )}

                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Source: {selectedValidation.source}
                  </div>

                </div>

                {/* AI Result */}
                <div className="border border-green-200 rounded-xl p-4 bg-green-50/40">

                  <div className="flex items-center gap-2 mb-4">

                    <Brain className="h-5 w-5 text-green-600" />

                    <h3 className="font-semibold text-gray-900">
                      AI Analysis
                    </h3>

                  </div>

                  <div className="space-y-3">

                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Crop
                      </p>
                      <p className="font-semibold">
                        {selectedValidation.crop}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Growth Stage
                      </p>
                      <p className="font-semibold">
                        {selectedValidation.stage}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Disease
                      </p>
                      <p className="font-semibold">
                        {selectedValidation.disease}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">
                        Overall AI Confidence
                      </p>
                      <p className={`font-bold ${getConfidenceColor(selectedValidation.aiConfidence)}`}>
                        {selectedValidation.aiConfidence}%
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Location Evidence */}
              <div className="mt-5 border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-2 mb-4">

                  <MapPin className="h-5 w-5 text-green-600" />

                  <h3 className="font-semibold text-gray-900">
                    Geo-location Evidence
                  </h3>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Latitude
                    </p>

                    <p className="font-medium">
                      {selectedValidation.latitude}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Longitude
                    </p>

                    <p className="font-medium">
                      {selectedValidation.longitude}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Location Status
                    </p>

                    <p
                      className={`font-semibold ${
                        selectedValidation.locationMatch
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {selectedValidation.locationMatch
                        ? 'Matched'
                        : 'Mismatch'}
                    </p>
                  </div>

                </div>

              </div>

              {/* Validation Information */}
              <div className="mt-5 border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-2 mb-4">

                  <MessageSquare className="h-5 w-5 text-green-600" />

                  <h3 className="font-semibold text-gray-900">
                    Validation Information
                  </h3>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Current Status
                    </p>

                    <span
                      className={`inline-flex items-center mt-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                        selectedValidation.status
                      )}`}
                    >
                      {getStatusLabel(selectedValidation.status)}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Uploaded By
                    </p>

                    <p className="font-medium mt-1">
                      {selectedValidation.submittedBy}
                    </p>
                  </div>

                </div>

                <div className="mt-4 bg-gray-50 rounded-lg p-4">

                  <p className="text-xs text-gray-500 mb-1">
                    Existing Expert Note
                  </p>

                  <p className="text-sm text-gray-700">
                    {selectedValidation.expertNote ||
                      'No expert note added yet.'}
                  </p>

                </div>

              </div>

              {/* Modal Actions */}
              <div className="mt-5 flex flex-wrap gap-3 justify-end">

                <button
                  onClick={() =>
                    updateStatus(
                      selectedValidation.id,
                      'rejected'
                    )
                  }
                  className="flex items-center px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 font-medium"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Finding
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedValidation.id,
                      'needs_review'
                    )
                  }
                  className="flex items-center px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 font-medium"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Needs Review
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedValidation.id,
                      'validated'
                    )
                  }
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validate Finding
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default ApprovalWorkflow