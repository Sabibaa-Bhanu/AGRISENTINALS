import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import MapMonitor from '../pages/dashboard/MapMonitor'
import AIAnalysisPanel from '../pages/dashboard/AIAnalysisPanel'
import CCEOptimization from '../pages/dashboard/CCEOptimization'
import ApprovalWorkflow from '../pages/dashboard/ApprovalWorkflow'
import CompareImages from '../pages/dashboard/CompareImages'
import DamageAlerts from '../pages/dashboard/DamageAlerts'
import FarmerTracker from '../pages/dashboard/FarmerTracker'
import HistoryTimeline from '../pages/dashboard/HistoryTimeline'
import ImageGallery from '../pages/dashboard/ImageGallery'
import OfficerTracker from '../pages/dashboard/OfficerTracker'
import Reports from '../pages/dashboard/Reports'
import Overview from '../pages/dashboard/Overview'
import GrowthAnalysis from '../pages/dashboard/GrowthAnalysis';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="map" element={<MapMonitor />} />
        <Route path="images" element={<ImageGallery />} />
        <Route path="ai-analysis" element={<AIAnalysisPanel />} />
        <Route path="farmers" element={<FarmerTracker />} />
        <Route path="officers" element={<OfficerTracker />} />
        <Route path="compare" element={<CompareImages />} />
        <Route path="alerts" element={<DamageAlerts />} />
        <Route path="approvals" element={<ApprovalWorkflow />} />
        <Route path="cce" element={<CCEOptimization />} />
        <Route path="reports" element={<Reports />} />
        <Route path="history" element={<HistoryTimeline />} />
        <Route path="growth-analysis" element={<GrowthAnalysis />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default AppRouter