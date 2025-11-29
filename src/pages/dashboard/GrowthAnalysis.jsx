import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, RefreshCw, Filter } from 'lucide-react';
import GrowthStageChart from '../../components/charts/GrowthStageChart';

const GrowthAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [allAnalysis, setAllAnalysis] = useState([]);

  useEffect(() => {
    // Get data passed from AIAnalysisPanel
    if (location.state) {
      setSelectedAnalysis(location.state.selectedAnalysis);
      setAllAnalysis(location.state.allAnalysis || []);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate('/dashboard/ai-analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to AI Analysis
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Growth Stage Analysis</h1>
              <p className="text-gray-600">
                {selectedAnalysis 
                  ? `Detailed growth analysis for ${selectedAnalysis.farmerName}'s ${selectedAnalysis.crop}`
                  : 'Comprehensive crop growth stage monitoring and analysis'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-green-500 transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Selected Analysis Summary */}
        {selectedAnalysis && (
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Crop Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Farmer</p>
                <p className="font-semibold text-gray-900">{selectedAnalysis.farmerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Crop</p>
                <p className="font-semibold text-gray-900">{selectedAnalysis.crop}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Stage</p>
                <p className="font-semibold text-green-600">{selectedAnalysis.growthData.currentStage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Health Score</p>
                <p className={`font-semibold ${
                  selectedAnalysis.healthScore >= 80 ? 'text-green-600' :
                  selectedAnalysis.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedAnalysis.healthScore}/100
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Growth Stage Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <GrowthStageChart />
        </div>

        {/* Additional Growth Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Statistics */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Average Growth Rate</span>
                <span className="font-semibold text-green-600">Optimal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Stage Completion</span>
                <span className="font-semibold text-blue-600">78%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">UV Impact</span>
                <span className="font-semibold text-yellow-600">Moderate</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Risk Level</span>
                <span className="font-semibold text-green-600">Low</span>
              </div>
            </div>
          </div>

          {/* Stage Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">Current Stage: {selectedAnalysis?.growthData.currentStage || 'Multiple'}</p>
                <p className="text-sm text-blue-700 mt-1">
                  Monitor soil moisture and provide adequate nutrients for optimal growth.
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-900">Next Stage: {selectedAnalysis?.growthData.nextStage || 'Varies'}</p>
                <p className="text-sm text-green-700 mt-1">
                  Prepare for stage transition in {selectedAnalysis?.growthData.estimatedDaysToNext || '5-10'} days.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900">UV Protection</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Consider shade during peak hours to reduce UV stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthAnalysis;