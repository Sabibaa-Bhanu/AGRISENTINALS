import React, { useState, useEffect } from 'react'
import { Target, Calendar, MapPin, User, ArrowRight, Filter } from 'lucide-react'

const CCEOptimization = () => {
  const [recommendations, setRecommendations] = useState([])
  const [filters, setFilters] = useState({
    priority: 'all',
    date: 'today'
  })

  useEffect(() => {
    const mockRecommendations = [
      {
        id: 1,
        plotId: 'PLOT-001',
        farmerName: 'Ramesh Patil',
        village: 'Shivaji Nagar',
        crop: 'Soybean',
        stage: 'Flowering',
        riskLevel: 'high',
        priority: 'must-visit',
        recommendedOfficer: 'Officer Rajesh',
        reason: 'Growth stage deviation detected',
        expectedStage: 'Flowering',
        actualStage: 'Late Vegetative',
        lastVisit: '5 days ago',
        coordinates: [19.9975, 73.7898]
      },
      {
        id: 2,
        plotId: 'PLOT-002',
        farmerName: 'Suresh Yadav',
        village: 'Gandhi Gram',
        crop: 'Cotton',
        stage: 'Vegetative',
        riskLevel: 'medium',
        priority: 'schedule-this-week',
        recommendedOfficer: 'Officer Priya',
        reason: 'Moderate pest risk',
        expectedStage: 'Vegetative',
        actualStage: 'Vegetative',
        lastVisit: '2 days ago',
        coordinates: [20.0000, 73.7950]
      }
    ]
    setRecommendations(mockRecommendations)
  }, [])

  const getPriorityColor = (priority) => {
    const colors = {
      'must-visit': 'bg-red-100 text-red-700 border-red-300',
      'schedule-today': 'bg-orange-100 text-orange-700 border-orange-300',
      'schedule-this-week': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'low-priority': 'bg-green-100 text-green-700 border-green-300'
    }
    return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getRiskColor = (risk) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    }
    return colors[risk] || 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CCE Optimization Panel</h1>
          <p className="text-gray-600">AI-powered field visit recommendations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
            <Target className="h-4 w-4 mr-2" />
            Generate New Plan
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-sm text-gray-600">Must Visit Today</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">45</div>
          <div className="text-sm text-gray-600">Schedule This Week</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-600">Low Priority</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">89%</div>
          <div className="text-sm text-gray-600">Optimization Score</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <select 
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="must-visit">Must Visit</option>
            <option value="schedule-today">Schedule Today</option>
            <option value="schedule-this-week">This Week</option>
            <option value="low-priority">Low Priority</option>
          </select>

          <select 
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
            <option value="next-week">Next Week</option>
          </select>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Plot Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${getRiskColor(rec.riskLevel)}`}>
                      {rec.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Plot ID</p>
                      <p className="font-semibold text-gray-900">{rec.plotId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Farmer</p>
                      <p className="font-semibold text-gray-900">{rec.farmerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Village</p>
                      <p className="font-semibold text-gray-900">{rec.village}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Crop & Stage</p>
                      <p className="font-semibold text-gray-900">
                        {rec.crop} • {rec.stage}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Growth Stage</p>
                      <p className="font-semibold text-gray-900">
                        Expected: {rec.expectedStage}
                      </p>
                      <p className={`text-sm ${rec.expectedStage !== rec.actualStage ? 'text-red-600' : 'text-green-600'}`}>
                        Actual: {rec.actualStage}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recommended Officer</p>
                      <p className="font-semibold text-green-600">{rec.recommendedOfficer}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Reason: </span>
                      {rec.reason}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:border-green-500 hover:text-green-600 transition-all">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all">
                    <User className="h-4 w-4 mr-2" />
                    Assign Officer
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-green-50 border-t border-green-100 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last visit: {rec.lastVisit}
              </div>
              <button className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium">
                View Complete Analysis
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Optimization Metrics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-600">67%</div>
            <div className="text-sm text-gray-600">Visit Efficiency</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">42%</div>
            <div className="text-sm text-gray-600">Travel Time Saved</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-600">Risk Coverage</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <div className="text-sm text-gray-600">Early Detection</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CCEOptimization