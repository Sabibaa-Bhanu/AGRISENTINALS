import React, { useState, useEffect } from 'react'
import {
  Search,
  Download,
  Eye,
  User,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  FileText,
  Image,
  Shield,
  MoreVertical,
  Send,
  MessageCircle,
  Upload,
  CreditCard,
  LandPlot,
  IdCard,
  Building2,
  Sprout,
  FileCheck,
  X
} from 'lucide-react'

const FarmerTracker = () => {
  const [farmers, setFarmers] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [showProfile, setShowProfile] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)

  useEffect(() => {
    const mockFarmers = [
      {
        id: 1,
        name: 'Ramesh Patil',
        farmerId: 'FARM-001',
        phone: '+91 98765 43210',
        email: 'ramesh.patil@example.com',
        village: 'Shivaji Nagar',
        taluk: 'Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422001',

        totalPlots: 3,
        totalArea: '4.2 acres',
        joinedDate: '2026-06-15',

        crops: ['Paddy', 'Wheat'],
        progress: 100,
        aiConfidence: 94,

        status: 'active',
        submissionStatus: 'completed',
        submissionStage: 'Crop Monitoring',

        officerAssigned: 'Rajesh Kumar',
        nextDeadline: '2026-09-25',

        ownershipType: 'Owner',
        pattaChittaNo: 'PATTA-2026-001',
        surveyNo: '142/3A',
        acres: '4.2',

        aadhaar: 'XXXX XXXX 4582',
        aadhaarStatus: 'uploaded',

        pan: 'ABCDE****F',
        panStatus: 'optional',

        voterId: 'VOTER-****782',
        voterStatus: 'optional',

        drivingLicense: 'DL-****4512',
        drivingLicenseStatus: 'optional',

        nregaJobCard: '',
        nregaStatus: 'optional',

        kisanPassbook: 'kisan_passbook_demo.pdf',
        kisanPassbookStatus: 'optional',

        landOwnershipProof: '7_12_extract_demo.pdf',
        landOwnershipStatus: 'verified',

        bankName: 'State Bank of India',
        branch: 'Nashik Main',
        accountNo: 'XXXX XXXX 4521',
        ifsc: 'SBIN0001234',
        bankPassbook: 'bank_passbook_demo.pdf',
        cancelledCheque: 'cancelled_cheque_demo.pdf',

        crop: 'Paddy',
        season: 'Kharif 2026',
        sownArea: '2.5 acres',
        sowingDate: '2026-07-10',
        sowingCertificate: 'sowing_certificate_demo.pdf',
        selfDeclaration: 'self_declaration_demo.pdf',

        tenantAgreement: '',
        tenantSelfDeclaration: '',

        cropLoanTaken: true,
        loanProvider: 'SBI Agriculture Loan',
        loanReference: 'LOAN-2026-001',
        loanDocument: 'crop_loan_demo.pdf',

        verification: {
          identity: 'verified',
          land: 'verified',
          bank: 'verified',
          sowing: 'verified',
          overall: 'verified'
        },

        imageQuality: 'excellent',
        notes: 'Regular monitoring. Documents verified.'
      },

      {
        id: 2,
        name: 'Suresh Yadav',
        farmerId: 'FARM-002',
        phone: '+91 87654 32109',
        email: 'suresh.yadav@example.com',
        village: 'Gandhi Gram',
        taluk: 'Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422003',

        totalPlots: 2,
        totalArea: '3.1 acres',
        joinedDate: '2026-06-20',

        crops: ['Paddy', 'Cotton'],
        progress: 66,
        aiConfidence: 87,

        status: 'active',
        submissionStatus: 'completed',
        submissionStage: 'Crop Monitoring',

        officerAssigned: 'Priya Sharma',
        nextDeadline: '2026-09-28',

        ownershipType: 'Tenant',
        pattaChittaNo: 'N/A',
        surveyNo: '98/2B',
        acres: '3.1',

        aadhaar: 'XXXX XXXX 7291',
        aadhaarStatus: 'uploaded',

        pan: '',
        panStatus: 'optional',

        voterId: 'VOTER-****219',
        voterStatus: 'optional',

        drivingLicense: '',
        drivingLicenseStatus: 'optional',

        nregaJobCard: 'nrega_demo.pdf',
        nregaStatus: 'optional',

        kisanPassbook: '',
        kisanPassbookStatus: 'optional',

        landOwnershipProof: 'land_record_demo.pdf',
        landOwnershipStatus: 'pending',

        bankName: 'Bank of Maharashtra',
        branch: 'Gandhi Gram',
        accountNo: 'XXXX XXXX 8214',
        ifsc: 'MAHB0002456',
        bankPassbook: 'bank_passbook_demo.pdf',
        cancelledCheque: '',

        crop: 'Paddy',
        season: 'Kharif 2026',
        sownArea: '2.0 acres',
        sowingDate: '2026-07-15',
        sowingCertificate: 'sowing_certificate_demo.pdf',
        selfDeclaration: 'tenant_self_declaration_demo.pdf',

        tenantAgreement: 'landowner_agreement_demo.pdf',
        tenantSelfDeclaration: 'tenant_declaration_demo.pdf',

        cropLoanTaken: false,
        loanProvider: '',
        loanReference: '',
        loanDocument: '',

        verification: {
          identity: 'verified',
          land: 'pending',
          bank: 'verified',
          sowing: 'verified',
          overall: 'pending'
        },

        imageQuality: 'good',
        notes: 'Tenant farmer. Land ownership documents pending verification.'
      },

      {
        id: 3,
        name: 'Anita Deshmukh',
        farmerId: 'FARM-003',
        phone: '+91 76543 21098',
        email: 'anita.deshmukh@example.com',
        village: 'Mohan Nagar',
        taluk: 'Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422005',

        totalPlots: 4,
        totalArea: '5.8 acres',
        joinedDate: '2026-06-10',

        crops: ['Paddy', 'Wheat'],
        progress: 33,
        aiConfidence: 65,

        status: 'active',
        submissionStatus: 'delayed',
        submissionStage: 'Document Verification',

        officerAssigned: 'Amit Singh',
        nextDeadline: '2026-09-18',

        ownershipType: 'Owner',
        pattaChittaNo: 'PATTA-2026-003',
        surveyNo: '211/4C',
        acres: '5.8',

        aadhaar: 'XXXX XXXX 6137',
        aadhaarStatus: 'uploaded',

        pan: '',
        panStatus: 'optional',

        voterId: '',
        voterStatus: 'optional',

        drivingLicense: '',
        drivingLicenseStatus: 'optional',

        nregaJobCard: '',
        nregaStatus: 'optional',

        kisanPassbook: '',
        kisanPassbookStatus: 'optional',

        landOwnershipProof: '',
        landOwnershipStatus: 'pending',

        bankName: 'Canara Bank',
        branch: 'Mohan Nagar',
        accountNo: 'XXXX XXXX 6543',
        ifsc: 'CNRB0004567',
        bankPassbook: '',
        cancelledCheque: '',

        crop: 'Paddy',
        season: 'Kharif 2026',
        sownArea: '3.0 acres',
        sowingDate: '',
        sowingCertificate: '',
        selfDeclaration: '',

        tenantAgreement: '',
        tenantSelfDeclaration: '',

        cropLoanTaken: true,
        loanProvider: 'Canara Bank Agriculture Loan',
        loanReference: 'LOAN-2026-003',
        loanDocument: '',

        verification: {
          identity: 'verified',
          land: 'pending',
          bank: 'pending',
          sowing: 'pending',
          overall: 'pending'
        },

        imageQuality: 'poor',
        notes: 'Land and bank documents require verification.'
      },

      {
        id: 4,
        name: 'Vikram Jadhav',
        farmerId: 'FARM-004',
        phone: '+91 65432 10987',
        email: 'vikram.jadhav@example.com',
        village: 'Kisan Colony',
        taluk: 'Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422010',

        totalPlots: 1,
        totalArea: '1.5 acres',
        joinedDate: '2026-07-05',

        crops: ['Paddy'],
        progress: 0,
        aiConfidence: 0,

        status: 'inactive',
        submissionStatus: 'not_started',
        submissionStage: 'Not Started',

        officerAssigned: 'Neha Patel',
        nextDeadline: '2026-09-30',

        ownershipType: 'Owner',
        pattaChittaNo: '',
        surveyNo: '301/1A',
        acres: '1.5',

        aadhaar: '',
        aadhaarStatus: 'required',

        pan: '',
        panStatus: 'optional',

        voterId: '',
        voterStatus: 'optional',

        drivingLicense: '',
        drivingLicenseStatus: 'optional',

        nregaJobCard: '',
        nregaStatus: 'optional',

        kisanPassbook: '',
        kisanPassbookStatus: 'optional',

        landOwnershipProof: '',
        landOwnershipStatus: 'pending',

        bankName: '',
        branch: '',
        accountNo: '',
        ifsc: '',
        bankPassbook: '',
        cancelledCheque: '',

        crop: 'Paddy',
        season: 'Kharif 2026',
        sownArea: '1.5 acres',
        sowingDate: '',
        sowingCertificate: '',
        selfDeclaration: '',

        tenantAgreement: '',
        tenantSelfDeclaration: '',

        cropLoanTaken: false,
        loanProvider: '',
        loanReference: '',
        loanDocument: '',

        verification: {
          identity: 'pending',
          land: 'pending',
          bank: 'pending',
          sowing: 'pending',
          overall: 'pending'
        },

        imageQuality: 'none',
        notes: 'New farmer. Aadhaar and initial documents pending.'
      }
    ]

    setFarmers(mockFarmers)
    setSelectedFarmer(mockFarmers[0])
  }, [])

  const filters = [
    {
      value: 'all',
      label: 'All Farmers',
      count: farmers.length
    },
    {
      value: 'active',
      label: 'Active',
      count: farmers.filter(f => f.status === 'active').length
    },
    {
      value: 'verified',
      label: 'Verified',
      count: farmers.filter(f => f.verification.overall === 'verified').length
    },
    {
      value: 'pending',
      label: 'Pending Verification',
      count: farmers.filter(f => f.verification.overall === 'pending').length
    },
    {
      value: 'not_started',
      label: 'Not Started',
      count: farmers.filter(f => f.submissionStatus === 'not_started').length
    }
  ]

  const filteredFarmers = farmers.filter(farmer => {
    let matchesFilter = true

    if (filter === 'active') {
      matchesFilter = farmer.status === 'active'
    }

    if (filter === 'verified') {
      matchesFilter = farmer.verification.overall === 'verified'
    }

    if (filter === 'pending') {
      matchesFilter = farmer.verification.overall === 'pending'
    }

    if (filter === 'not_started') {
      matchesFilter = farmer.submissionStatus === 'not_started'
    }

    const term = searchTerm.toLowerCase()

    const matchesSearch =
      farmer.name.toLowerCase().includes(term) ||
      farmer.farmerId.toLowerCase().includes(term) ||
      farmer.village.toLowerCase().includes(term) ||
      farmer.crops.some(crop => crop.toLowerCase().includes(term))

    return matchesFilter && matchesSearch
  })

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    let aValue
    let bValue

    switch (sortBy) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break

      case 'progress':
        aValue = a.progress
        bValue = b.progress
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
    }

    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
  })

  const getStatusColor = status => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      completed: 'bg-green-100 text-green-700',
      delayed: 'bg-red-100 text-red-700',
      not_started: 'bg-yellow-100 text-yellow-700',
      verified: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700',
      uploaded: 'bg-blue-100 text-blue-700',
      required: 'bg-red-100 text-red-700',
      optional: 'bg-gray-100 text-gray-600'
    }

    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = status => {
    const icons = {
      active: CheckCircle,
      inactive: XCircle,
      completed: CheckCircle,
      delayed: AlertCircle,
      not_started: Clock,
      verified: CheckCircle,
      pending: Clock,
      rejected: XCircle
    }

    const Icon = icons[status]

    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const getProgressColor = progress => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress > 0) return 'bg-orange-500'
    return 'bg-gray-300'
  }

  const handleSort = column => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const toggleRowExpand = farmerId => {
    const newExpanded = new Set(expandedRows)

    if (newExpanded.has(farmerId)) {
      newExpanded.delete(farmerId)
    } else {
      newExpanded.add(farmerId)
    }

    setExpandedRows(newExpanded)
  }

  const openProfile = farmer => {
    setSelectedFarmer(farmer)
    setShowProfile(true)
    setShowDocuments(false)
  }

  const openDocuments = farmer => {
    setSelectedFarmer(farmer)
    setShowDocuments(true)
    setShowProfile(false)
  }

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  const SortableHeader = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 font-semibold text-gray-700 hover:text-green-600"
    >
      {children}

      <div className="flex flex-col">
        <ChevronUp
          className={`h-3 w-3 ${
            sortBy === column && sortOrder === 'asc'
              ? 'text-green-600'
              : 'text-gray-400'
          }`}
        />

        <ChevronDown
          className={`h-3 w-3 -mt-1 ${
            sortBy === column && sortOrder === 'desc'
              ? 'text-green-600'
              : 'text-gray-400'
          }`}
        />
      </div>
    </button>
  )

  const DocumentUpload = ({
    label,
    value,
    required = false,
    onChange
  }) => (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium text-gray-900">
            {label}

            {required ? (
              <span className="ml-2 text-xs font-semibold text-red-600">
                Required
              </span>
            ) : (
              <span className="ml-2 text-xs font-medium text-gray-500">
                Optional
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            PDF, JPG or PNG
          </div>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onChange}
          />

          <span className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100">
            <Upload className="h-4 w-4" />
            Upload
          </span>
        </label>
      </div>

      <div className="mt-3">
        {value ? (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
            <FileCheck className="h-4 w-4" />
            {value}
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            No document uploaded
          </div>
        )}
      </div>
    </div>
  )

  const VerificationBadge = ({ status }) => (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      {status === 'verified'
        ? 'Verified'
        : status === 'pending'
        ? 'Pending'
        : status}
    </span>
  )

  const FarmerProfile = () => {
    if (!selectedFarmer) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Farmer Profile
              </h2>

              <p className="text-sm text-gray-500">
                {selectedFarmer.name} • {selectedFarmer.farmerId}
              </p>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(92vh-80px)] p-6 space-y-6">

            {/* Demo notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />

                <div>
                  <div className="font-semibold text-green-800">
                    UI Demonstration Mode
                  </div>

                  <p className="text-sm text-green-700 mt-1">
                    The documents and verification statuses shown here are
                    prototype/demo data. Real document storage and verification
                    will be connected later.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal details */}
            <section className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />

                <h3 className="text-lg font-semibold text-gray-900">
                  Personal & Address Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <label className="text-xs text-gray-500">
                    Farmer Name
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.name}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Farmer ID
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.farmerId}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Mobile
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.phone}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Email
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.email}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Village
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.village}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Taluk
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.taluk}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    District
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.district}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    State
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.state}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    PIN Code
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.pincode}
                  </p>
                </div>
              </div>
            </section>

            {/* Land */}
            <section className="bg-white border border-green-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <LandPlot className="h-5 w-5 text-green-600" />

                <h3 className="text-lg font-semibold text-gray-900">
                  Land Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div>
                  <label className="text-xs text-gray-500">
                    Ownership Type
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.ownershipType}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Patta / Chitta No.
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.pattaChittaNo || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Survey No.
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.surveyNo}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Total Acres
                  </label>

                  <p className="font-medium text-gray-900">
                    {selectedFarmer.acres}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <DocumentUpload
                  label="Land Ownership Proof"
                  value={selectedFarmer.landOwnershipProof}
                />
              </div>
            </section>

            {/* Identity */}
            <section className="bg-white border border-green-100 rounded-2xl p-5">

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IdCard className="h-5 w-5 text-green-600" />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Identity Proof
                    </h3>

                    <p className="text-sm text-gray-500">
                      Aadhaar is the primary identity document for this
                      prototype. Other identity documents are optional.
                    </p>
                  </div>
                </div>

                <VerificationBadge
                  status={selectedFarmer.verification.identity}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Aadhaar - REQUIRED */}
                <div className="md:col-span-2">
                  <DocumentUpload
                    label="Aadhaar Card"
                    value={
                      selectedFarmer.aadhaarStatus === 'uploaded'
                        ? `Aadhaar document • ${selectedFarmer.aadhaar}`
                        : ''
                    }
                    required={true}
                  />
                </div>

                {/* Optional */}
                <DocumentUpload
                  label="PAN Card"
                  value={
                    selectedFarmer.pan
                      ? `PAN document • ${selectedFarmer.pan}`
                      : ''
                  }
                />

                <DocumentUpload
                  label="Voter ID"
                  value={
                    selectedFarmer.voterId
                      ? `Voter ID • ${selectedFarmer.voterId}`
                      : ''
                  }
                />

                <DocumentUpload
                  label="Driving Licence"
                  value={
                    selectedFarmer.drivingLicense
                      ? `Driving Licence • ${selectedFarmer.drivingLicense}`
                      : ''
                  }
                />

                <DocumentUpload
                  label="NREGA Job Card"
                  value={selectedFarmer.nregaJobCard}
                />

                <DocumentUpload
                  label="Kisan Photo Passbook"
                  value={selectedFarmer.kisanPassbook}
                />
              </div>
            </section>

            {/* Bank */}
            <section className="bg-white border border-green-100 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-green-600" />

                <h3 className="text-lg font-semibold text-gray-900">
                  Bank Account Details
                </h3>

                <VerificationBadge
                  status={selectedFarmer.verification.bank}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div>
                  <label className="text-xs text-gray-500">
                    Bank Name
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.bankName || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Branch
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.branch || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Account Number
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.accountNo || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    IFSC
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.ifsc || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                <DocumentUpload
                  label="Bank Passbook"
                  value={selectedFarmer.bankPassbook}
                />

                <DocumentUpload
                  label="Cancelled Cheque"
                  value={selectedFarmer.cancelledCheque}
                />

              </div>
            </section>

            {/* Sowing */}
            <section className="bg-white border border-green-100 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-5 w-5 text-green-600" />

                <h3 className="text-lg font-semibold text-gray-900">
                  Cultivation & Sowing Details
                </h3>

                <VerificationBadge
                  status={selectedFarmer.verification.sowing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <div>
                  <label className="text-xs text-gray-500">
                    Crop
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.crop}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Season
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.season}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Survey No.
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.surveyNo}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Sown Area
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.sownArea}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Sowing Date
                  </label>

                  <p className="font-medium">
                    {selectedFarmer.sowingDate || 'Not provided'}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                <DocumentUpload
                  label="Sowing Certificate"
                  value={selectedFarmer.sowingCertificate}
                />

                <DocumentUpload
                  label="Self Declaration"
                  value={selectedFarmer.selfDeclaration}
                />

              </div>
            </section>

            {/* Tenant */}
            {selectedFarmer.ownershipType === 'Tenant' && (
              <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Tenant Farmer Documents
                    </h3>

                    <p className="text-sm text-gray-600">
                      Displayed because this farmer is registered as a tenant.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <DocumentUpload
                    label="Landowner Agreement"
                    value={selectedFarmer.tenantAgreement}
                  />

                  <DocumentUpload
                    label="Tenant Self Declaration"
                    value={selectedFarmer.tenantSelfDeclaration}
                  />

                </div>
              </section>
            )}

            {/* Loan */}
            {selectedFarmer.cropLoanTaken && (
              <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-yellow-600" />

                  <h3 className="text-lg font-semibold text-gray-900">
                    Crop Loan Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                  <div>
                    <label className="text-xs text-gray-500">
                      Loan Provider
                    </label>

                    <p className="font-medium">
                      {selectedFarmer.loanProvider}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Loan Reference
                    </label>

                    <p className="font-medium">
                      {selectedFarmer.loanReference}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Status
                    </label>

                    <span className="inline-flex mt-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Loan Taken
                    </span>
                  </div>

                </div>

                <DocumentUpload
                  label="Crop Loan Document"
                  value={selectedFarmer.loanDocument}
                />

              </section>
            )}

            {/* Verification */}
            <section className="bg-gray-50 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-600" />

                <h3 className="text-lg font-semibold text-gray-900">
                  Document Verification
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

                <div className="bg-white rounded-xl p-4 border">
                  <p className="text-xs text-gray-500 mb-2">
                    Identity
                  </p>

                  <VerificationBadge
                    status={selectedFarmer.verification.identity}
                  />
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <p className="text-xs text-gray-500 mb-2">
                    Land Ownership
                  </p>

                  <VerificationBadge
                    status={selectedFarmer.verification.land}
                  />
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <p className="text-xs text-gray-500 mb-2">
                    Bank Details
                  </p>

                  <VerificationBadge
                    status={selectedFarmer.verification.bank}
                  />
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <p className="text-xs text-gray-500 mb-2">
                    Sowing
                  </p>

                  <VerificationBadge
                    status={selectedFarmer.verification.sowing}
                  />
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <p className="text-xs text-gray-500 mb-2">
                    Overall
                  </p>

                  <VerificationBadge
                    status={selectedFarmer.verification.overall}
                  />
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>
    )
  }

  const FarmerDocuments = () => {
    if (!selectedFarmer) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">

          <div className="flex items-center justify-between px-6 py-4 border-b">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Farmer Documents
              </h2>

              <p className="text-sm text-gray-500">
                {selectedFarmer.name} • {selectedFarmer.farmerId}
              </p>
            </div>

            <button
              onClick={() => setShowDocuments(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">

              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />

                <span className="font-semibold text-green-800">
                  Identity Document Priority
                </span>
              </div>

              <p className="text-sm text-green-700 mt-1">
                Aadhaar is the primary required identity document in this
                prototype. All other identity documents are optional.
              </p>

            </div>

            <div className="space-y-4">

              <DocumentUpload
                label="Aadhaar Card"
                value={
                  selectedFarmer.aadhaarStatus === 'uploaded'
                    ? `Aadhaar document • ${selectedFarmer.aadhaar}`
                    : ''
                }
                required={true}
              />

              <DocumentUpload
                label="PAN Card"
                value={
                  selectedFarmer.pan
                    ? `PAN document • ${selectedFarmer.pan}`
                    : ''
                }
              />

              <DocumentUpload
                label="Voter ID"
                value={
                  selectedFarmer.voterId
                    ? `Voter ID • ${selectedFarmer.voterId}`
                    : ''
                }
              />

              <DocumentUpload
                label="Driving Licence"
                value={
                  selectedFarmer.drivingLicense
                    ? `Driving Licence • ${selectedFarmer.drivingLicense}`
                    : ''
                }
              />

              <DocumentUpload
                label="NREGA Job Card"
                value={selectedFarmer.nregaJobCard}
              />

              <DocumentUpload
                label="Kisan Photo Passbook"
                value={selectedFarmer.kisanPassbook}
              />

              <DocumentUpload
                label="Land Ownership Proof"
                value={selectedFarmer.landOwnershipProof}
              />

              <DocumentUpload
                label="Bank Passbook"
                value={selectedFarmer.bankPassbook}
              />

              <DocumentUpload
                label="Cancelled Cheque"
                value={selectedFarmer.cancelledCheque}
              />

              <DocumentUpload
                label="Sowing Certificate"
                value={selectedFarmer.sowingCertificate}
              />

              <DocumentUpload
                label="Self Declaration"
                value={selectedFarmer.selfDeclaration}
              />

              {selectedFarmer.ownershipType === 'Tenant' && (
                <>
                  <DocumentUpload
                    label="Landowner Agreement"
                    value={selectedFarmer.tenantAgreement}
                  />

                  <DocumentUpload
                    label="Tenant Self Declaration"
                    value={selectedFarmer.tenantSelfDeclaration}
                  />
                </>
              )}

              {selectedFarmer.cropLoanTaken && (
                <DocumentUpload
                  label="Crop Loan Document"
                  value={selectedFarmer.loanDocument}
                />
              )}

            </div>

          </div>
        </div>
      </div>
    )
  }

  const FarmerRow = ({ farmer }) => {
    const isExpanded = expandedRows.has(farmer.id)

    return (
      <>
        <tr
          className={`border-b border-gray-100 hover:bg-green-50 transition-all cursor-pointer ${
            isExpanded ? 'bg-green-50' : ''
          }`}
          onClick={() => toggleRowExpand(farmer.id)}
        >

          {/* Farmer */}
          <td className="px-4 py-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <div className="font-semibold text-gray-900">
                  {farmer.name}
                </div>

                <div className="text-sm text-gray-500">
                  {farmer.farmerId}
                </div>
              </div>

            </div>

          </td>

          {/* Contact */}
          <td className="px-4 py-4">

            <div className="text-sm space-y-1">

              <div className="flex items-center gap-1 text-gray-600">
                <Phone className="h-3 w-3" />
                {farmer.phone}
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-3 w-3" />
                {farmer.village}
              </div>

            </div>

          </td>

          {/* Crops */}
          <td className="px-4 py-4">

            <div className="text-sm">

              <div className="font-medium text-gray-900">
                {farmer.crops.join(', ')}
              </div>

              <div className="text-gray-500">
                {farmer.totalPlots} plots • {farmer.totalArea}
              </div>

            </div>

          </td>

          {/* Verification */}
          <td className="px-4 py-4">

            <VerificationBadge
              status={farmer.verification.overall}
            />

            <div className="text-xs text-gray-500 mt-2">
              Identity: {farmer.verification.identity}
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

          {/* AI */}
          <td className="px-4 py-4">

            <div className="text-center">

              <div
                className={`text-lg font-bold ${
                  farmer.aiConfidence >= 80
                    ? 'text-green-600'
                    : farmer.aiConfidence >= 60
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {farmer.aiConfidence}%
              </div>

              <div className="text-xs text-gray-500">
                Confidence
              </div>

            </div>

          </td>

          {/* Actions */}
          <td
            className="px-4 py-4"
            onClick={e => e.stopPropagation()}
          >

            <div className="flex items-center gap-2">

              <button
                onClick={() => openProfile(farmer)}
                title="View Farmer Profile"
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
              >
                <Eye className="h-4 w-4" />
              </button>

              <button
                onClick={() => openDocuments(farmer)}
                title="View Documents"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <FileText className="h-4 w-4" />
              </button>

              <button
                title="Send Reminder"
                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

          </td>

        </tr>

        {/* Expanded row */}
        {isExpanded && (
          <tr className="bg-green-25 border-b border-green-100">

            <td colSpan="7" className="px-4 py-6">

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">

                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-green-600" />
                    Document Verification Summary
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-xs text-gray-500">
                        Aadhaar
                      </div>

                      <div className="mt-2">
                        <VerificationBadge
                          status={
                            farmer.aadhaarStatus === 'uploaded'
                              ? 'verified'
                              : 'pending'
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-xs text-gray-500">
                        Land
                      </div>

                      <div className="mt-2">
                        <VerificationBadge
                          status={farmer.verification.land}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-xs text-gray-500">
                        Bank
                      </div>

                      <div className="mt-2">
                        <VerificationBadge
                          status={farmer.verification.bank}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-xs text-gray-500">
                        Sowing
                      </div>

                      <div className="mt-2">
                        <VerificationBadge
                          status={farmer.verification.sowing}
                        />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="bg-white p-4 rounded-lg border">

                  <h4 className="font-semibold text-gray-900 mb-3">
                    Farmer Information
                  </h4>

                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Ownership
                      </span>

                      <span className="font-medium">
                        {farmer.ownershipType}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Survey No.
                      </span>

                      <span className="font-medium">
                        {farmer.surveyNo}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Area
                      </span>

                      <span className="font-medium">
                        {farmer.totalArea}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Assigned Officer
                      </span>

                      <span className="font-medium text-blue-600">
                        {farmer.officerAssigned}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              <div className="mt-4 flex flex-wrap gap-3">

                <button
                  onClick={() => openProfile(farmer)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <User className="h-4 w-4" />
                  View Farmer Profile
                </button>

                <button
                  onClick={() => openDocuments(farmer)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4" />
                  View Documents
                </button>

              </div>

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
          <h1 className="text-2xl font-bold text-gray-900">
            Farmer Tracker
          </h1>

          <p className="text-gray-600">
            Monitor farmer profiles, documents, verification and crop progress
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 hover:text-green-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>

          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>

        </div>

      </div>

      {/* Demo notice */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">

        <div className="flex items-start gap-3">

          <Shield className="h-5 w-5 text-green-600 mt-0.5" />

          <div>

            <div className="font-semibold text-green-800">
              AgriSentinels — Prototype Mode
            </div>

            <p className="text-sm text-green-700 mt-1">
              Farmer information and document statuses shown here are
              demonstration data. Backend document storage and verification
              will be integrated later.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-gray-900">
            {farmers.length}
          </div>

          <div className="text-sm text-gray-600">
            Total Farmers
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">

          <div className="text-2xl font-bold text-green-600">
            {farmers.filter(
              f => f.verification.overall === 'verified'
            ).length}
          </div>

          <div className="text-sm text-gray-600">
            Fully Verified
          </div>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-yellow-100">

          <div className="text-2xl font-bold text-yellow-600">
            {farmers.filter(
              f => f.verification.overall === 'pending'
            ).length}
          </div>

          <div className="text-sm text-gray-600">
            Pending Verification
          </div>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">

          <div className="text-2xl font-bold text-blue-600">
            {farmers.length
              ? Math.round(
                  farmers.reduce(
                    (acc, f) => acc + f.progress,
                    0
                  ) / farmers.length
                )
              : 0}%
          </div>

          <div className="text-sm text-gray-600">
            Avg Monitoring Progress
          </div>

        </div>

      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">

        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

          <div className="flex-1">

            <div className="relative">

              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search farmers by name, ID, village, or crop..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {filters.map(filterItem => (

              <button
                key={filterItem.value}
                onClick={() => setFilter(filterItem.value)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${
                  filter === filterItem.value
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >

                <span>
                  {filterItem.label}
                </span>

                <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {filterItem.count}
                </span>

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Table */}
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

                <th className="px-4 py-3 text-left">
                  Contact & Location
                </th>

                <th className="px-4 py-3 text-left">
                  Crops & Area
                </th>

                <th className="px-4 py-3 text-left">
                  Verification
                </th>

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

                <th className="px-4 py-3 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {sortedFarmers.map(farmer => (
                <FarmerRow
                  key={farmer.id}
                  farmer={farmer}
                />
              ))}

            </tbody>

          </table>

        </div>

        {sortedFarmers.length === 0 && (
          <div className="p-12 text-center">

            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No farmers found
            </h3>

            <p className="text-gray-600">
              Try adjusting your search or filters.
            </p>

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">

        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">

          <div>
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {sortedFarmers.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900">
              {farmers.length}
            </span>{' '}
            farmers
          </div>

          <div className="flex items-center gap-4">

            <span>
              Avg AI Confidence:{' '}
              <span className="font-semibold text-green-600">
                {farmers.length
                  ? Math.round(
                      farmers.reduce(
                        (acc, f) => acc + f.aiConfidence,
                        0
                      ) / farmers.length
                    )
                  : 0}%
              </span>
            </span>

            <span>
              Overall Progress:{' '}
              <span className="font-semibold text-blue-600">
                {farmers.length
                  ? Math.round(
                      farmers.reduce(
                        (acc, f) => acc + f.progress,
                        0
                      ) / farmers.length
                    )
                  : 0}%
              </span>
            </span>

          </div>

        </div>

      </div>

      {/* Modals */}
      {showProfile && <FarmerProfile />}
      {showDocuments && <FarmerDocuments />}

    </div>
  )
}

export default FarmerTracker