import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Image,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});

  // Mock data
  const mockData = {
    stats: {
      totalFarmers: 1247,
      farmersChange: 5.2,
      imagesAnalyzed: 894,
      imagesChange: 12.8,
      activeOfficers: 23,
      officersChange: -2.1,
      damageCases: 12,
      damageChange: 8.3,
      pendingApprovals: 8,
      completedVisits: 156,
      aiAccuracy: 94.7,
      coverageArea: 78.3
    },
    recentActivity: [
      {
        id: 1,
        type: 'image_submission',
        title: '5 new images submitted',
        description: 'Farmers uploaded crop health images',
        time: '10 minutes ago',
        status: 'completed',
        icon: '📸'
      },
      {
        id: 2,
        type: 'officer_visit',
        title: '3 officer visits completed',
        description: 'Field verification in Pune district',
        time: '2 hours ago',
        status: 'completed',
        icon: '👮'
      },
      {
        id: 3,
        type: 'damage_report',
        title: '1 damage case reported',
        description: 'Weather damage in Nashik region',
        time: '4 hours ago',
        status: 'pending',
        icon: '⚠️'
      },
      {
        id: 4,
        type: 'ai_analysis',
        title: 'AI analysis completed',
        description: 'Processed 47 images with 96% accuracy',
        time: '6 hours ago',
        status: 'completed',
        icon: '🤖'
      },
      {
        id: 5,
        type: 'approval',
        title: '2 claims approved',
        description: 'Insurance claims processed automatically',
        time: '1 day ago',
        status: 'completed',
        icon: '✅'
      }
    ],
    systemStatus: {
      aiAnalysis: { status: 'operational', latency: '120ms' },
      imageProcessing: { status: 'operational', queue: 12 },
      dataSync: { status: 'active', lastSync: '2 min ago' },
      apiHealth: { status: 'healthy', uptime: '99.9%' }
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockData.stats);
      setRecentActivity(mockData.recentActivity);
      setSystemStatus(mockData.systemStatus);
      setLoading(false);
    }, 1500);
  }, []);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const exportReport = () => {
    // Simulate export functionality
    alert('Exporting dashboard report...');
  };

  const StatCard = ({ title, value, change, icon, color, suffix = '' }) => {
    const isPositive = change >= 0;
    
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-3xl font-bold mt-2 ${color}`}>
              {value}{suffix}
            </p>
            <div className={`flex items-center mt-2 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? 
                <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                <ArrowDownRight className="h-4 w-4 mr-1" />
              }
              {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
            </div>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </div>
    );
  };

  const StatusIndicator = ({ status }) => {
    const config = {
      operational: { color: 'text-green-600', bg: 'bg-green-100', label: 'Operational' },
      active: { color: 'text-green-600', bg: 'bg-green-100', label: 'Active' },
      healthy: { color: 'text-green-600', bg: 'bg-green-100', label: 'Healthy' },
      pending: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
      warning: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Warning' },
      error: { color: 'text-red-600', bg: 'bg-red-100', label: 'Error' }
    };

    const { color, bg, label } = config[status] || config.pending;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>
        <div className={`w-2 h-2 rounded-full ${color} mr-1`}></div>
        {label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to PMFBY CROPIC Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Real-time Data
          </div>
          <button 
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-green-500 hover:text-green-600 transition-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={exportReport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Farmers"
          value={stats.totalFarmers}
          change={stats.farmersChange}
          icon="👨‍🌾"
          color="text-green-600"
        />
        <StatCard
          title="Images Analyzed"
          value={stats.imagesAnalyzed}
          change={stats.imagesChange}
          icon="📸"
          color="text-blue-600"
        />
        <StatCard
          title="Active Officers"
          value={stats.activeOfficers}
          change={stats.officersChange}
          icon="👮"
          color="text-purple-600"
        />
        <StatCard
          title="Damage Cases"
          value={stats.damageCases}
          change={stats.damageChange}
          icon="⚠️"
          color="text-red-600"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
            <div className="text-sm text-gray-600 mt-1">Pending Approvals</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.completedVisits}</div>
            <div className="text-sm text-gray-600 mt-1">Completed Visits</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{stats.aiAccuracy}%</div>
            <div className="text-sm text-gray-600 mt-1">AI Accuracy</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600">{stats.coverageArea}%</div>
            <div className="text-sm text-gray-600 mt-1">Coverage Area</div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">View Pending Approvals</div>
                  <div className="text-sm text-gray-600">8 approvals waiting</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>
            
            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Check Damage Alerts</div>
                  <div className="text-sm text-gray-600">12 active cases</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>
            
            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Generate Reports</div>
                  <div className="text-sm text-gray-600">Monthly analytics</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>

            <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Monitor Field Officers</div>
                  <div className="text-sm text-gray-600">23 officers active</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{activity.title}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
                <StatusIndicator status={activity.status} />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-green-600 hover:text-green-700 font-medium py-2">
            View All Activity →
          </button>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">AI Analysis</div>
                <div className="text-sm text-gray-600">Latency: {systemStatus.aiAnalysis?.latency}</div>
              </div>
              <StatusIndicator status={systemStatus.aiAnalysis?.status} />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Image Processing</div>
                <div className="text-sm text-gray-600">Queue: {systemStatus.imageProcessing?.queue} images</div>
              </div>
              <StatusIndicator status={systemStatus.imageProcessing?.status} />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Data Sync</div>
                <div className="text-sm text-gray-600">Last: {systemStatus.dataSync?.lastSync}</div>
              </div>
              <StatusIndicator status={systemStatus.dataSync?.status} />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">API Health</div>
                <div className="text-sm text-gray-600">Uptime: {systemStatus.apiHealth?.uptime}</div>
              </div>
              <StatusIndicator status={systemStatus.apiHealth?.status} />
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Image Processing Speed</span>
              <span className="font-medium text-green-600">+15% faster</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Claim Approval Time</span>
              <span className="font-medium text-green-600">-40% reduction</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Farmer Satisfaction</span>
              <span className="font-medium text-green-600">92% positive</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Accuracy Rate</span>
              <span className="font-medium text-green-600">94.7% accurate</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Regional Coverage</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pune District</span>
              <span className="font-medium text-blue-600">85% covered</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nashik Region</span>
              <span className="font-medium text-blue-600">78% covered</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nagpur Division</span>
              <span className="font-medium text-blue-600">65% covered</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Aurangabad Zone</span>
              <span className="font-medium text-blue-600">72% covered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;