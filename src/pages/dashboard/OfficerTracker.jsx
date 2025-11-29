import React, { useState, useEffect } from 'react';
import {
  Search, Filter, MapPin, Phone, Mail, Calendar,
  CheckCircle, XCircle, Clock, User, Shield,
  Download, Eye, Navigation, PhoneCall, MessageCircle,
  BarChart3, TrendingUp, TrendingDown, RefreshCw,
  MoreVertical, Edit, Trash2, Plus, Filter as FilterIcon
} from 'lucide-react';

const OfficerTracker = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'map'
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock data for field officers
  const mockOfficers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      badgeNumber: 'OFF-001',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@pmfby.gov.in',
      location: 'Shivaji Nagar',
      district: 'Pune',
      status: 'active',
      lastActive: '2024-01-15T10:30:00',
      totalVisits: 147,
      completedVisits: 132,
      pendingVisits: 15,
      performance: 89,
      currentAssignment: {
        farmer: 'Ramesh Patil',
        plotId: 'PLOT-001',
        crop: 'Soybean',
        priority: 'high',
        deadline: '2024-01-20'
      },
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      badgeNumber: 'OFF-002',
      phone: '+91 98765 43211',
      email: 'priya.sharma@pmfby.gov.in',
      location: 'Gandhi Gram',
      district: 'Nashik',
      status: 'active',
      lastActive: '2024-01-15T09:15:00',
      totalVisits: 89,
      completedVisits: 85,
      pendingVisits: 4,
      performance: 95,
      currentAssignment: {
        farmer: 'Suresh Yadav',
        plotId: 'PLOT-002',
        crop: 'Cotton',
        priority: 'medium',
        deadline: '2024-01-18'
      },
      coordinates: { lat: 20.0059, lng: 73.7909 }
    },
    {
      id: 3,
      name: 'Sanjay Verma',
      badgeNumber: 'OFF-003',
      phone: '+91 98765 43212',
      email: 'sanjay.verma@pmfby.gov.in',
      location: 'Mahatma Nagar',
      district: 'Nagpur',
      status: 'on_break',
      lastActive: '2024-01-14T16:45:00',
      totalVisits: 203,
      completedVisits: 195,
      pendingVisits: 8,
      performance: 96,
      currentAssignment: null,
      coordinates: { lat: 21.1458, lng: 79.0882 }
    },
    {
      id: 4,
      name: 'Meena Patel',
      badgeNumber: 'OFF-004',
      phone: '+91 98765 43213',
      email: 'meena.patel@pmfby.gov.in',
      location: 'Nehru Colony',
      district: 'Aurangabad',
      status: 'inactive',
      lastActive: '2024-01-10T14:20:00',
      totalVisits: 78,
      completedVisits: 72,
      pendingVisits: 6,
      performance: 92,
      currentAssignment: null,
      coordinates: { lat: 19.8762, lng: 75.3433 }
    },
    {
      id: 5,
      name: 'Amit Singh',
      badgeNumber: 'OFF-005',
      phone: '+91 98765 43214',
      email: 'amit.singh@pmfby.gov.in',
      location: 'Tagore Nagar',
      district: 'Kolhapur',
      status: 'active',
      lastActive: '2024-01-15T11:00:00',
      totalVisits: 56,
      completedVisits: 50,
      pendingVisits: 6,
      performance: 89,
      currentAssignment: {
        farmer: 'Anita Deshmukh',
        plotId: 'PLOT-003',
        crop: 'Wheat',
        priority: 'high',
        deadline: '2024-01-16'
      },
      coordinates: { lat: 16.7050, lng: 74.2433 }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOfficers(mockOfficers);
      setLoading(false);
    }, 1000);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Officers', color: 'gray' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'on_break', label: 'On Break', color: 'yellow' },
    { value: 'inactive', label: 'Inactive', color: 'red' }
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    on_break: 'bg-yellow-100 text-yellow-700',
    inactive: 'bg-red-100 text-red-700'
  };

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || officer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'on_break':
        return <Clock className="h-4 w-4" />;
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const exportData = () => {
    // Simulate export functionality
    alert('Exporting officer data...');
  };

  const OfficerCard = ({ officer }) => {
    const isSelected = selectedOfficer?.id === officer.id;

    return (
      <div
        className={`bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
          isSelected
            ? 'border-green-500 shadow-xl bg-green-50'
            : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
        }`}
        onClick={() => setSelectedOfficer(officer)}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                {officer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{officer.name}</h3>
                <p className="text-sm text-gray-600">{officer.badgeNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[officer.status]}`}>
                {getStatusIcon(officer.status)}
                <span className="ml-1 capitalize">{officer.status.replace('_', ' ')}</span>
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{officer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{officer.location}</span>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{officer.totalVisits}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{officer.completedVisits}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{officer.pendingVisits}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>

          {/* Current Assignment */}
          {officer.currentAssignment ? (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Current Assignment</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[officer.currentAssignment.priority]}`}>
                  {officer.currentAssignment.priority} priority
                </span>
              </div>
              <div className="text-sm text-blue-800">
                <div>{officer.currentAssignment.farmer}</div>
                <div className="text-xs">{officer.currentAssignment.plotId} • {officer.currentAssignment.crop}</div>
                <div className="text-xs mt-1">
                  Due: {new Date(officer.currentAssignment.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gray-100 rounded-lg text-center">
              <span className="text-sm text-gray-600">No current assignment</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              <PhoneCall className="h-4 w-4" />
              Call
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <MessageCircle className="h-4 w-4" />
              Message
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              <Navigation className="h-4 w-4" />
              Track
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OfficerDetails = ({ officer }) => {
    if (!officer) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                {officer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{officer.name}</h2>
                <p className="text-gray-600">{officer.badgeNumber} • {officer.district} District</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusColors[officer.status]}`}>
                {getStatusIcon(officer.status)}
                <span className="ml-2 capitalize">{officer.status.replace('_', ' ')}</span>
              </span>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{officer.performance}%</div>
                <div className="text-sm text-gray-600">Performance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Performance Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{officer.totalVisits}</div>
                  <div className="text-sm text-gray-600">Total Visits</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{officer.completedVisits}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{officer.pendingVisits}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{officer.performance}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Farm Visit Completed</div>
                    <div className="text-sm text-gray-600">Ramesh Patil - Soybean</div>
                  </div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Damage Assessment</div>
                    <div className="text-sm text-gray-600">Suresh Yadav - Cotton</div>
                  </div>
                  <div className="text-sm text-gray-500">5 hours ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Report Submitted</div>
                    <div className="text-sm text-gray-600">Weather damage analysis</div>
                  </div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{officer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{officer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{officer.location}, {officer.district}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">
                    Last active: {new Date(officer.lastActive).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PhoneCall className="h-4 w-4" />
                  Make Call
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Send Message
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Navigation className="h-4 w-4" />
                  Track Location
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading officer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Field Official Verification Tracker</h1>
            <p className="text-gray-600">Monitor officer visits, assignments, and performance</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Assign Task
            </button>
            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
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
                  placeholder="Search by officer name, badge number, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setView(view === 'list' ? 'map' : 'list')}
                className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-green-500 transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {view === 'list' ? 'Map View' : 'List View'}
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                  statusFilter === option.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{option.label}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  statusFilter === option.value
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {officers.filter(o => option.value === 'all' || o.status === option.value).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Officers List */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Field Officers ({filteredOfficers.length})
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredOfficers.length > 0 ? (
                  filteredOfficers.map((officer) => (
                    <OfficerCard
                      key={officer.id}
                      officer={officer}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No officers found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Officer Details */}
          <div className="xl:col-span-2">
            {selectedOfficer ? (
              <OfficerDetails officer={selectedOfficer} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Officer Selected</h3>
                <p className="text-gray-600">Select an officer from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerTracker;