import React, { useState } from "react";
import {
  Sprout,
  Wheat,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Droplets,
  Sun,
  Search,
} from "lucide-react";

const GrowthAnalysis = () => {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedField, setSelectedField] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------------------------------------------------
  // DEMO DATA — UI ONLY
  // ---------------------------------------------------------
  const fields = [
    {
      id: "AG-001",
      farmer: "Ramesh Kumar",
      village: "Niphad",
      crop: "Paddy",
      stage: "Flowering",
      progress: 72,
      health: 91,
      risk: "Low",
      lastUpdate: "Today",
      nextStage: "Maturity",
      days: 18,
    },
    {
      id: "AG-002",
      farmer: "Suresh Patil",
      village: "Sinnar",
      crop: "Paddy",
      stage: "Mid Growth",
      progress: 58,
      health: 78,
      risk: "Medium",
      lastUpdate: "Today",
      nextStage: "Flowering",
      days: 12,
    },
    {
      id: "AG-003",
      farmer: "Anita Shinde",
      village: "Dindori",
      crop: "Wheat",
      stage: "Flowering",
      progress: 74,
      health: 88,
      risk: "Low",
      lastUpdate: "Yesterday",
      nextStage: "Maturity",
      days: 16,
    },
    {
      id: "AG-004",
      farmer: "Vijay More",
      village: "Yeola",
      crop: "Cotton",
      stage: "Early Growth",
      progress: 35,
      health: 69,
      risk: "Medium",
      lastUpdate: "Yesterday",
      nextStage: "Mid Growth",
      days: 14,
    },
    {
      id: "AG-005",
      farmer: "Priya Pawar",
      village: "Igatpuri",
      crop: "Corn",
      stage: "Maturity",
      progress: 94,
      health: 95,
      risk: "Low",
      lastUpdate: "2 days ago",
      nextStage: "Harvest",
      days: 7,
    },
    {
      id: "AG-006",
      farmer: "Mahesh Jadhav",
      village: "Malegaon",
      crop: "Paddy",
      stage: "Early Growth",
      progress: 28,
      health: 61,
      risk: "High",
      lastUpdate: "Today",
      nextStage: "Mid Growth",
      days: 11,
    },
  ];

  const stageData = [
    { name: "Early Growth", count: 96, percentage: 20 },
    { name: "Mid Growth", count: 124, percentage: 26 },
    { name: "Flowering", count: 142, percentage: 29 },
    { name: "Maturity", count: 124, percentage: 25 },
  ];

  const filteredFields = fields.filter((field) => {
    const matchesCrop =
      selectedCrop === "All" || field.crop === selectedCrop;

    const matchesSearch =
      field.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.village.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCrop && matchesSearch;
  });

  const getRiskStyle = (risk) => {
    if (risk === "High") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (risk === "Medium") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  const getHealthStyle = (health) => {
    if (health >= 80) return "text-green-600";
    if (health >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* -------------------------------------------------
            HEADER
        ------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Sprout className="h-7 w-7 text-green-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Crop Monitoring
                </h1>

                <p className="text-gray-600">
                  Monitor crop growth stages, health and field progress
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm text-green-700">
              <span className="font-semibold">Demo Monitoring Mode</span>
              {" "}• UI demonstration data
            </p>
          </div>
        </div>

        {/* -------------------------------------------------
            SUMMARY CARDS
        ------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Fields Monitored
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  486
                </p>

                <p className="text-xs text-green-600 mt-2">
                  +24 this week
                </p>
              </div>

              <div className="p-3 bg-green-100 rounded-xl">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Paddy Fields
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  218
                </p>

                <p className="text-xs text-blue-600 mt-2">
                  44.8% of monitored fields
                </p>
              </div>

              <div className="p-3 bg-blue-100 rounded-xl">
                <Wheat className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Flowering Stage
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  142
                </p>

                <p className="text-xs text-purple-600 mt-2">
                  29% of monitored fields
                </p>
              </div>

              <div className="p-3 bg-purple-100 rounded-xl">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Fields At Risk
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  18
                </p>

                <p className="text-xs text-red-600 mt-2">
                  Requires attention
                </p>
              </div>

              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            CROP FILTER + SEARCH
        ------------------------------------------------- */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Field Monitoring
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Track growth stage and crop health across monitored fields
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search field, farmer or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-72 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">

            {["All", "Paddy", "Wheat", "Corn", "Cotton"].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCrop === crop
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {crop}
              </button>
            ))}

          </div>
        </div>

        {/* -------------------------------------------------
            GROWTH STAGE DISTRIBUTION
        ------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Growth Stage Distribution
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Current stage across monitored fields
                </p>
              </div>

              <Activity className="h-5 w-5 text-green-600" />
            </div>

            <div className="space-y-5">

              {stageData.map((stage) => (
                <div key={stage.name}>

                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {stage.name}
                    </span>

                    <span className="text-sm text-gray-500">
                      {stage.count} fields
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {stage.percentage}% of monitored fields
                  </p>

                </div>
              ))}

            </div>
          </div>

          {/* Growth Health Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Crop Health Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Overall monitoring indicators
                </p>
              </div>

              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Healthy Fields
                  </span>

                  <span className="font-semibold text-green-600">
                    72%
                  </span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full">
                  <div
                    className="h-3 bg-green-500 rounded-full"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Moderate Risk
                  </span>

                  <span className="font-semibold text-yellow-600">
                    24%
                  </span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full">
                  <div
                    className="h-3 bg-yellow-400 rounded-full"
                    style={{ width: "24%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    High Risk
                  </span>

                  <span className="font-semibold text-red-600">
                    4%
                  </span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full">
                  <div
                    className="h-3 bg-red-500 rounded-full"
                    style={{ width: "4%" }}
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Irrigation
                  </span>
                </div>

                <p className="text-lg font-semibold text-blue-900 mt-1">
                  86%
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Weather Impact
                  </span>
                </div>

                <p className="text-lg font-semibold text-yellow-900 mt-1">
                  Moderate
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            FIELD TABLE
        ------------------------------------------------- */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">

          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Monitored Fields
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Growth and health status of individual fields
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {filteredFields.length} fields
              </span>

            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Field
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Farmer
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Crop
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Growth Stage
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Progress
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Health
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Risk
                  </th>

                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredFields.map((field) => (

                  <tr
                    key={field.id}
                    className="hover:bg-green-50/40 transition-colors"
                  >

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {field.id}
                      </p>

                      <p className="text-xs text-gray-500">
                        {field.village}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {field.farmer}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                        {field.crop}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">
                        {field.stage}
                      </p>

                      <p className="text-xs text-gray-400">
                        Next: {field.nextStage}
                      </p>
                    </td>

                    <td className="px-6 py-4 min-w-[150px]">

                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          Growth
                        </span>

                        <span className="text-xs font-semibold text-gray-700">
                          {field.progress}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${field.progress}%` }}
                        />
                      </div>

                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${getHealthStyle(
                          field.health
                        )}`}
                      >
                        {field.health}/100
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 border rounded-full text-xs font-medium ${getRiskStyle(
                          field.risk
                        )}`}
                      >
                        {field.risk}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedField(field)}
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                        title="View field details"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>

        {/* -------------------------------------------------
            GROWTH MONITORING TIMELINE
        ------------------------------------------------- */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Growth Monitoring Cycle
              </h2>

              <p className="text-sm text-gray-500">
                Expected crop development stages
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {[
              {
                stage: "Early Growth",
                days: "Day 0–25",
                status: "Completed",
              },
              {
                stage: "Mid Growth",
                days: "Day 26–50",
                status: "Completed",
              },
              {
                stage: "Flowering",
                days: "Day 51–75",
                status: "Current",
              },
              {
                stage: "Maturity",
                days: "Day 76–110",
                status: "Upcoming",
              },
            ].map((item, index) => (

              <div key={item.stage} className="relative">

                <div
                  className={`p-5 rounded-xl border ${
                    item.status === "Current"
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-800">
                      {index + 1}
                    </span>

                    {item.status === "Current" ? (
                      <Activity className="h-4 w-4 text-green-600" />
                    ) : item.status === "Completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}

                  </div>

                  <h3 className="font-semibold text-gray-900 mt-4">
                    {item.stage}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.days}
                  </p>

                  <span
                    className={`inline-block mt-3 text-xs font-medium ${
                      item.status === "Current"
                        ? "text-green-700"
                        : item.status === "Completed"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>
        </div>

        {/* -------------------------------------------------
            FIELD DETAILS MODAL
        ------------------------------------------------- */}
        {selectedField && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

              <div className="p-6 border-b border-gray-100">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Field Monitoring
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                      {selectedField.id}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedField(null)}
                    className="text-gray-400 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>

                </div>

              </div>

              <div className="p-6 space-y-5">

                <div className="grid grid-cols-2 gap-4">

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">
                      Farmer
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedField.farmer}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">
                      Village
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedField.village}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">
                      Crop
                    </p>
                    <p className="font-semibold text-green-700 mt-1">
                      {selectedField.crop}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">
                      Growth Stage
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedField.stage}
                    </p>
                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Growth Progress
                    </span>

                    <span className="font-semibold text-green-600">
                      {selectedField.progress}%
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full">
                    <div
                      className="h-3 bg-green-500 rounded-full"
                      style={{
                        width: `${selectedField.progress}%`,
                      }}
                    />
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Health Score
                    </p>

                    <p
                      className={`text-2xl font-bold mt-1 ${getHealthStyle(
                        selectedField.health
                      )}`}
                    >
                      {selectedField.health}/100
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Risk Level
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 border rounded-full text-sm ${getRiskStyle(
                        selectedField.risk
                      )}`}
                    >
                      {selectedField.risk}
                    </span>
                  </div>

                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">

                  <p className="font-medium text-blue-900">
                    Next Stage
                  </p>

                  <p className="text-sm text-blue-700 mt-1">
                    Expected transition to{" "}
                    <span className="font-semibold">
                      {selectedField.nextStage}
                    </span>{" "}
                    in approximately{" "}
                    <span className="font-semibold">
                      {selectedField.days} days
                    </span>.
                  </p>

                </div>

                <button
                  onClick={() => setSelectedField(null)}
                  className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Close Details
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default GrowthAnalysis;