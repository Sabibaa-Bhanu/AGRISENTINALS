import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  MapPin,
  Clock,
  Users,
  Crop,
  Shield,
  Eye,
  ZoomIn,
  ZoomOut,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const RiskPriorityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('matrix'); // 'matrix', 'bar', 'pie', 'trend'
  const [riskFilter, setRiskFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [zoom, setZoom] = useState(1);

  // Mock risk priority data
  const mockData = [
    {
      id: 1,
      riskType: 'Pest Infestation',
      priority: 'Critical',
      severity: 9.2,
      probability: 8.5,
      impactScore: 85,
      farmersAffected: 45,
      areaAffected: '120 acres',
      location: 'Nashik District',
      crop: 'Cotton',
      trend: 'increasing',
      lastReported: '2024-01-15',
      mitigationStatus: 'active',
      color: '#EF4444',
      riskScore: 92
    },
    {
      id: 2,
      riskType: 'Weather Damage',
      priority: 'High',
      severity: 7.8,
      probability: 7.2,
      impactScore: 72,
      farmersAffected: 28,
      areaAffected: '85 acres',
      location: 'Pune District',
      crop: 'Soybean',
      trend: 'stable',
      lastReported: '2024-01-14',
      mitigationStatus: 'monitoring',
      color: '#F59E0B',
      riskScore: 78
    },
    {
      id: 3,
      riskType: 'Disease Outbreak',
      priority: 'Critical',
      severity: 8.9,
      probability: 6.8,
      impactScore: 79,
      farmersAffected: 32,
      areaAffected: '95 acres',
      location: 'Nagpur Division',
      crop: 'Wheat',
      trend: 'increasing',
      lastReported: '2024-01-13',
      mitigationStatus: 'active',
      color: '#EF4444',
      riskScore: 89
    },
    {
      id: 4,
      riskType: 'Soil Degradation',
      priority: 'Medium',
      severity: 6.5,
      probability: 5.8,
      impactScore: 58,
      farmersAffected: 18,
      areaAffected: '65 acres',
      location: 'Aurangabad Zone',
      crop: 'Multiple',
      trend: 'decreasing',
      lastReported: '2024-01-12',
      mitigationStatus: 'planned',
      color: '#10B981',
      riskScore: 65
    },
    {
      id: 5,
      riskType: 'Water Shortage',
      priority: 'High',
      severity: 8.2,
      probability: 7.9,
      impactScore: 81,
      farmersAffected: 35,
      areaAffected: '150 acres',
      location: 'Marathwada Region',
      crop: 'Rice',
      trend: 'increasing',
      lastReported: '2024-01-11',
      mitigationStatus: 'urgent',
      color: '#F59E0B',
      riskScore: 82
    },
    {
      id: 6,
      riskType: 'Market Price Drop',
      priority: 'Medium',
      severity: 5.8,
      probability: 6.2,
      impactScore: 62,
      farmersAffected: 52,
      areaAffected: '200 acres',
      location: 'Multiple',
      crop: 'All Crops',
      trend: 'stable',
      lastReported: '2024-01-10',
      mitigationStatus: 'monitoring',
      color: '#10B981',
      riskScore: 58
    },
    {
      id: 7,
      riskType: 'Equipment Failure',
      priority: 'Low',
      severity: 4.2,
      probability: 3.8,
      impactScore: 38,
      farmersAffected: 8,
      areaAffected: '25 acres',
      location: 'Kolhapur',
      crop: 'Sugarcane',
      trend: 'decreasing',
      lastReported: '2024-01-09',
      mitigationStatus: 'resolved',
      color: '#3B82F6',
      riskScore: 42
    }
  ];

  const riskMatrixData = [
    { x: 2, y: 3, z: 100, risk: 'Low', count: 5 },
    { x: 5, y: 4, z: 400, risk: 'Medium', count: 12 },
    { x: 7, y: 6, z: 800, risk: 'High', count: 8 },
    { x: 9, y: 8, z: 1200, risk: 'Critical', count: 3 }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const trendData = [
    { month: 'Jan', critical: 3, high: 8, medium: 12, low: 5 },
    { month: 'Feb', critical: 2, high: 6, medium: 10, low: 7 },
    { month: 'Mar', critical: 4, high: 9, medium: 14, low: 4 },
    { month: 'Apr', critical: 5, high: 11, medium: 16, low: 3 },
    { month: 'May', critical: 3, high: 8, medium: 13, low: 6 },
    { month: 'Jun', critical: 6, high: 12, medium: 18, low: 2 }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredData = data.filter(item => {
    const matchesPriority = priorityFilter === 'all' || 
      item.priority.toLowerCase() === priorityFilter;
    return matchesPriority;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{data.riskType || label}</p>
          <div className="space-y-1 text-sm">
            {data.priority && (
              <p>
                <span className="text-gray-600">Priority:</span>{' '}
                <span className={`font-semibold ${
                  data.priority === 'Critical' ? 'text-red-600' :
                  data.priority === 'High' ? 'text-orange-600' :
                  data.priority === 'Medium' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {data.priority}
                </span>
              </p>
            )}
            {data.severity && (
              <p>
                <span className="text-gray-600">Severity:</span>{' '}
                <span className="font-semibold text-red-600">{data.severity}/10</span>
              </p>
            )}
            {data.probability && (
              <p>
                <span className="text-gray-600">Probability:</span>{' '}
                <span className="font-semibold text-purple-600">{data.probability}/10</span>
              </p>
            )}
            {data.farmersAffected && (
              <p>
                <span className="text-gray-600">Farmers Affected:</span>{' '}
                <span className="font-semibold text-orange-600">{data.farmersAffected}</span>
              </p>
            )}
            {data.riskScore && (
              <p>
                <span className="text-gray-600">Risk Score:</span>{' '}
                <span className="font-semibold text-red-600">{data.riskScore}/100</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const RiskMatrixTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.risk} Risk</p>
          <p className="text-sm text-gray-600">{data.count} incidents</p>
          <p className="text-xs text-gray-500">Severity: {data.y}/10, Probability: {data.x}/10</p>
        </div>
      );
    }
    return null;
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#10B981';
      case 'low': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const exportData = () => {
    alert('Exporting risk priority data...');
  };

  const RiskCard = ({ risk }) => (
    <div 
      className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-lg ${
        selectedRisk?.id === risk.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
      }`}
      onClick={() => setSelectedRisk(risk)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${
            risk.priority === 'Critical' ? 'text-red-600' :
            risk.priority === 'High' ? 'text-orange-600' :
            risk.priority === 'Medium' ? 'text-green-600' : 'text-blue-600'
          }`} />
          <h4 className="font-semibold text-gray-900">{risk.riskType}</h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          risk.priority === 'Critical' ? 'bg-red-100 text-red-700' :
          risk.priority === 'High' ? 'bg-orange-100 text-orange-700' :
          risk.priority === 'Medium' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {risk.priority}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Severity:</span>
          <span className="font-semibold text-red-600">{risk.severity}/10</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Probability:</span>
          <span className="font-semibold text-purple-600">{risk.probability}/10</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{risk.farmersAffected} farmers</span>
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon(risk.trend)}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading risk analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Risk Priority Matrix</h2>
          <p className="text-gray-600">Monitor and prioritize agricultural risks</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportData}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-red-500 hover:text-red-600 transition-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>

            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
              <button
                onClick={() => setChartType('matrix')}
                className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
                  chartType === 'matrix' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
                  chartType === 'bar' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
                  chartType === 'pie' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                }`}
              >
                <PieChartIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setChartType('trend')}
                className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
                  chartType === 'trend' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 min-w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">
                {chartType === 'matrix' && 'Risk Probability vs Impact Matrix'}
                {chartType === 'bar' && 'Risk Priority Distribution'}
                {chartType === 'pie' && 'Risk Category Breakdown'}
                {chartType === 'trend' && 'Risk Trends Over Time'}
              </h3>
            </div>

            <div className="h-80" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'matrix' ? (
                  <ScatterChart data={riskMatrixData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Probability" 
                      domain={[0, 10]}
                      label={{ value: 'Probability', position: 'bottom' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Severity" 
                      domain={[0, 10]}
                      label={{ value: 'Severity', angle: -90, position: 'left' }}
                    />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Impact" />
                    <Tooltip content={<RiskMatrixTooltip />} />
                    <Scatter name="Risks" data={riskMatrixData} fill="#8884d8">
                      {riskMatrixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getPriorityColor(entry.risk)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                ) : chartType === 'bar' ? (
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="riskType" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="riskScore" name="Risk Score" radius={[4, 4, 0, 0]}>
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getPriorityColor(entry.priority)} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : chartType === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={filteredData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ priority, percent }) => `${priority}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="riskScore"
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getPriorityColor(entry.priority)} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                ) : (
                  <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="critical" name="Critical" stroke="#EF4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="high" name="High" stroke="#F59E0B" strokeWidth={3} />
                    <Line type="monotone" dataKey="medium" name="Medium" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="low" name="Low" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Risk Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {data.filter(r => r.priority === 'Critical').length}
                </div>
                <div className="text-gray-600">Critical</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {data.filter(r => r.priority === 'High').length}
                </div>
                <div className="text-gray-600">High</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {data.filter(r => r.priority === 'Medium').length}
                </div>
                <div className="text-gray-600">Medium</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {data.filter(r => r.priority === 'Low').length}
                </div>
                <div className="text-gray-600">Low</div>
              </div>
            </div>
          </div>

          {/* Top Risks */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Top Risks</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data
                .sort((a, b) => b.riskScore - a.riskScore)
                .slice(0, 5)
                .map(risk => (
                  <RiskCard key={risk.id} risk={risk} />
                ))}
            </div>
          </div>

          {/* Selected Risk Details */}
          {selectedRisk && (
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Risk Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{selectedRisk.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crop:</span>
                  <span className="font-medium">{selectedRisk.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area Affected:</span>
                  <span className="font-medium">{selectedRisk.areaAffected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Reported:</span>
                  <span className="font-medium">
                    {new Date(selectedRisk.lastReported).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mitigation:</span>
                  <span className={`font-medium ${
                    selectedRisk.mitigationStatus === 'active' ? 'text-green-600' :
                    selectedRisk.mitigationStatus === 'urgent' ? 'text-red-600' :
                    selectedRisk.mitigationStatus === 'monitoring' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {selectedRisk.mitigationStatus}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center">
          <div className="text-2xl font-bold text-red-600">
            {data.reduce((sum, risk) => sum + risk.farmersAffected, 0)}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Farmers at Risk</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {Math.max(...data.map(r => r.riskScore))}
          </div>
          <div className="text-sm text-gray-600 mt-1">Highest Risk Score</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {(data.reduce((sum, risk) => sum + risk.riskScore, 0) / data.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 mt-1">Average Risk Score</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.filter(r => r.trend === 'increasing').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Rising Risks</div>
        </div>
      </div>
    </div>
  );
};

export default RiskPriorityChart;