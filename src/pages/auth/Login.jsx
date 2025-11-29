import React, { useState } from 'react'
import { Eye, EyeOff, User, Shield, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'district.officer@pmfby.gov.in',
    password: 'password123',
    role: 'district_officer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const roles = [
    { value: 'state_admin', label: 'State Admin', color: 'bg-red-500', email: 'state.admin@pmfby.gov.in' },
    { value: 'district_officer', label: 'District Officer', color: 'bg-blue-500', email: 'district.officer@pmfby.gov.in' },
    { value: 'block_officer', label: 'Block Officer', color: 'bg-green-500', email: 'block.officer@pmfby.gov.in' },
    { value: 'insurance_staff', label: 'Insurance Staff', color: 'bg-purple-500', email: 'insurance.staff@pmfby.gov.in' }
  ]

  const handleRoleSelect = (role) => {
    setFormData({
      email: role.email,
      password: 'password123',
      role: role.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      console.log('Submitting login form...')
      const result = await login(formData.email, formData.password)
      console.log('Login result:', result)
      
      if (result.success) {
        console.log('Login successful, navigating to dashboard...')
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            PLANTIVE
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure Dashboard Access
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role (Auto-fills credentials)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === role.value
                      ? `${role.color} border-transparent text-white shadow-md`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs font-medium">{role.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="official@pmfby.gov.in"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Demo password: <strong>password123</strong>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing In...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Instructions:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Click any role button to auto-fill credentials</li>
            <li>• Password is always: <strong>password123</strong></li>
            <li>• Click "Sign In to Dashboard"</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          PLANTIVE - Crop Insurance Portal &copy; 2024
        </div>
      </div>
    </div>
  )
}

export default Login