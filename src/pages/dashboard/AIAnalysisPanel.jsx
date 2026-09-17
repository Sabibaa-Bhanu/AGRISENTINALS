import React, { useEffect, useState } from "react";
import {
  Upload,
  Brain,
  Sprout,
  Activity,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Droplets,
  Leaf,
  FlaskConical,
  RefreshCw,
  CheckCircle2,
  Loader2,
  FileImage,
  ScanSearch,
} from "lucide-react";

export default function AIAnalysisPanel() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      return;
    }

    setImage(selectedFile);
    setResult(null);
    setPipelineStep(0);

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const analyze = () => {
    if (!image) return;

    setLoading(true);
    setResult(null);
    setPipelineStep(1);

    // UI-only simulated AI processing
    setTimeout(() => {
      setPipelineStep(2);
    }, 900);

    setTimeout(() => {
      setPipelineStep(3);
    }, 1800);

    setTimeout(() => {
      setPipelineStep(4);

      setResult({
        crop: "Paddy",
        stage: "Flowering",
        disease: "Bacterial Blight",
        location_text: "Nashik District, Maharashtra",
        confidences: {
          crop: 0.964,
          stage: 0.912,
          disease: 0.887,
        },
        fertilizer_schedule:
          "Apply the recommended nitrogen and potassium dose according to the flowering-stage crop requirement. Avoid excessive nitrogen application.",
        irrigation_schedule:
          "Maintain adequate field moisture during the flowering stage. Avoid prolonged water stress and monitor field water levels regularly.",
        disease_advice:
          "Bacterial blight symptoms detected. Remove severely affected plant material where practical, maintain field hygiene, and follow locally recommended disease-management practices.",
      });

      setLoading(false);
    }, 2800);
  };

  const resetAnalysis = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
    setResult(null);
    setLoading(false);
    setPipelineStep(0);
  };

  const getConfidence = (value) => {
    const number = Number(value);

    if (Number.isNaN(number)) return "N/A";

    return `${(number <= 1 ? number * 100 : number).toFixed(1)}%`;
  };

  const isHealthy =
    result?.disease?.toLowerCase().includes("healthy") ||
    result?.disease?.toLowerCase().includes("none");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />

            <h1 className="text-2xl font-bold text-gray-900">
              AI Crop Analysis
            </h1>
          </div>

          <p className="text-gray-600 mt-1">
            Analyze crop images using the AgriSentinels AI pipeline
          </p>
        </div>

        {result && (
          <button
            onClick={resetAnalysis}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-green-300 hover:text-green-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            New Analysis
          </button>
        )}

      </div>


      {/* AI PIPELINE */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="font-semibold text-gray-900">
              AgriSentinels AI Pipeline
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Three-stage crop intelligence analysis
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            AI Engine Ready
          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* MODEL A */}
          <div
            className={`border rounded-xl p-4 transition-all ${
              pipelineStep >= 1
                ? "bg-green-50 border-green-300"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                <Sprout className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-green-600">
                  MODEL A
                </p>

                <h3 className="font-semibold text-gray-900">
                  Crop Classification
                </h3>
              </div>

            </div>

            <p className="text-xs text-gray-500 mt-3">
              Identifies the crop from the uploaded field image.
            </p>

            {pipelineStep >= 2 && (
              <div className="flex items-center gap-1 mt-3 text-xs text-green-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </div>
            )}

          </div>


          {/* MODEL B */}
          <div
            className={`border rounded-xl p-4 transition-all ${
              pipelineStep >= 2
                ? "bg-blue-50 border-blue-300"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-600">
                  MODEL B
                </p>

                <h3 className="font-semibold text-gray-900">
                  Growth Stage
                </h3>
              </div>

            </div>

            <p className="text-xs text-gray-500 mt-3">
              Determines the current growth stage of the detected crop.
            </p>

            {pipelineStep >= 3 && (
              <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </div>
            )}

          </div>


          {/* MODEL C */}
          <div
            className={`border rounded-xl p-4 transition-all ${
              pipelineStep >= 3
                ? "bg-red-50 border-red-300"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-red-600">
                  MODEL C
                </p>

                <h3 className="font-semibold text-gray-900">
                  Disease Detection
                </h3>
              </div>

            </div>

            <p className="text-xs text-gray-500 mt-3">
              Detects crop disease or identifies a healthy crop.
            </p>

            {pipelineStep >= 4 && (
              <div className="flex items-center gap-1 mt-3 text-xs text-red-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </div>
            )}

          </div>

        </div>

      </div>


      {/* UPLOAD + STATUS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* UPLOAD */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

          <div className="px-6 py-4 border-b border-green-100">

            <h2 className="font-semibold text-gray-900">
              Upload Crop Image
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upload a clear image of the crop for AI analysis
            </p>

          </div>

          <div className="p-6">

            {!preview ? (

              <label className="block cursor-pointer">

                <div className="border-2 border-dashed border-green-200 bg-green-50/50 rounded-2xl p-10 text-center hover:border-green-400 hover:bg-green-50 transition-all">

                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">

                    <Upload className="h-7 w-7 text-green-600" />

                  </div>

                  <h3 className="font-semibold text-gray-900">
                    Upload Crop Image
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Click to select an image from your computer
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    JPG, JPEG or PNG
                  </p>

                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

            ) : (

              <div>

                <div className="relative rounded-2xl overflow-hidden bg-gray-100">

                  <img
                    src={preview}
                    alt="Selected crop"
                    className="w-full h-80 object-cover"
                  />

                  {!loading && (
                    <button
                      onClick={resetAnalysis}
                      className="absolute top-3 right-3 px-3 py-2 bg-white/95 text-gray-700 text-sm rounded-lg shadow hover:bg-white"
                    >
                      Change Image
                    </button>
                  )}

                </div>

                <div className="mt-4 flex items-center gap-3">

                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileImage className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-sm font-medium text-gray-900 truncate">
                      {image?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {image
                        ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                        : ""}
                    </p>

                  </div>

                  <CheckCircle2 className="h-5 w-5 text-green-500" />

                </div>

              </div>

            )}


            {/* ANALYZE BUTTON */}
            <button
              onClick={analyze}
              disabled={!image || loading}
              className="w-full mt-5 flex items-center justify-center gap-2 px-5 py-3.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >

              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Crop...
                </>
              ) : (
                <>
                  <ScanSearch className="h-5 w-5" />
                  Analyze Crop
                </>
              )}

            </button>

          </div>

        </div>


        {/* ANALYSIS STATUS */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

          <div className="px-6 py-4 border-b border-green-100">

            <h2 className="font-semibold text-gray-900">
              Analysis Status
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI processing pipeline
            </p>

          </div>

          <div className="p-6">

            <div className="space-y-5">

              {/* MODEL A STATUS */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pipelineStep >= 1
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {loading && pipelineStep === 1 ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Sprout className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">

                  <p className="font-medium text-gray-900">
                    Model A — Crop Classification
                  </p>

                  <p className="text-xs text-gray-500">
                    Paddy / Wheat / Corn / Cotton
                  </p>

                </div>

                {pipelineStep >= 2 && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}

              </div>


              <div className="ml-5 h-4 border-l border-dashed border-gray-300" />


              {/* MODEL B STATUS */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pipelineStep >= 2
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {loading && pipelineStep === 2 ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Activity className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">

                  <p className="font-medium text-gray-900">
                    Model B — Growth Stage
                  </p>

                  <p className="text-xs text-gray-500">
                    Early / Mid / Flowering / Maturity
                  </p>

                </div>

                {pipelineStep >= 3 && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}

              </div>


              <div className="ml-5 h-4 border-l border-dashed border-gray-300" />


              {/* MODEL C STATUS */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pipelineStep >= 3
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {loading && pipelineStep === 3 ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">

                  <p className="font-medium text-gray-900">
                    Model C — Disease Detection
                  </p>

                  <p className="text-xs text-gray-500">
                    Healthy / Bacterial Blight / Blast
                  </p>

                </div>

                {pipelineStep >= 4 && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}

              </div>


              {/* STATUS */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-600">
                    Pipeline Status
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      loading
                        ? "bg-yellow-100 text-yellow-700"
                        : result
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {loading
                      ? "Processing"
                      : result
                      ? "Completed"
                      : "Waiting"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* RESULT */}
      {result && (

        <div className="space-y-6">

          {/* RESULT HEADER */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">

            <div className="px-6 py-5 border-b border-green-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <div className="flex items-center gap-2">

                  <CheckCircle2 className="h-6 w-6 text-green-600" />

                  <h2 className="text-xl font-bold text-gray-900">
                    AI Analysis Result
                  </h2>

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Demo result for UI presentation
                </p>

              </div>

              <span
                className={`px-3 py-2 rounded-xl text-sm font-medium ${
                  isHealthy
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isHealthy ? "Healthy Crop" : "Disease Detected"}
              </span>

            </div>


            <div className="p-6">

              {/* MAIN RESULT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* CROP */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="p-2 bg-green-100 rounded-lg">
                      <Sprout className="h-5 w-5 text-green-600" />
                    </div>

                    <p className="text-sm text-gray-500">
                      Detected Crop
                    </p>

                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    {result.crop}
                  </p>

                </div>


                {/* STAGE */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>

                    <p className="text-sm text-gray-500">
                      Growth Stage
                    </p>

                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    {result.stage}
                  </p>

                </div>


                {/* DISEASE */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-5">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>

                    <p className="text-sm text-gray-500">
                      Disease Detection
                    </p>

                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    {result.disease}
                  </p>

                </div>

              </div>


              {/* CONFIDENCE */}
              <div className="mt-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Model Confidence
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <ConfidenceCard
                    label="Crop Classification"
                    value={result.confidences.crop}
                  />

                  <ConfidenceCard
                    label="Growth Stage"
                    value={result.confidences.stage}
                  />

                  <ConfidenceCard
                    label="Disease Detection"
                    value={result.confidences.disease}
                  />

                </div>

              </div>


              {/* LOCATION */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">

                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />

                <div>

                  <p className="text-sm font-medium text-gray-900">
                    Field Location
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {result.location_text}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* RECOMMENDATIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* FERTILIZER */}
            <RecommendationCard
              icon={<FlaskConical className="h-5 w-5 text-green-600" />}
              iconBg="bg-green-100"
              title="Fertilizer Schedule"
              subtitle="AI recommendation"
              text={result.fertilizer_schedule}
            />

            {/* IRRIGATION */}
            <RecommendationCard
              icon={<Droplets className="h-5 w-5 text-blue-600" />}
              iconBg="bg-blue-100"
              title="Irrigation Schedule"
              subtitle="AI recommendation"
              text={result.irrigation_schedule}
            />

            {/* ADVICE */}
            <RecommendationCard
              icon={<Leaf className="h-5 w-5 text-orange-600" />}
              iconBg="bg-orange-100"
              title="Crop Health Advice"
              subtitle="AI-generated guidance"
              text={result.disease_advice}
            />

          </div>


          {/* DEMO NOTICE */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">

            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />

            <div>

              <p className="text-sm font-semibold text-yellow-800">
                UI Demonstration Mode
              </p>

              <p className="text-sm text-yellow-700 mt-1">
                The displayed prediction is demo data for the
                AgriSentinels interface. Real Model A, B and C
                predictions will be connected later.
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   CONFIDENCE CARD
========================================================= */

function ConfidenceCard({ label, value }) {
  const percentage = Number(value) * 100;

  return (
    <div className="bg-gray-50 rounded-xl p-4">

      <div className="flex items-center justify-between mb-2">

        <span className="text-sm text-gray-600">
          {label}
        </span>

        <span className="text-sm font-semibold text-gray-900">
          {percentage.toFixed(1)}%
        </span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-green-500 rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   RECOMMENDATION CARD
========================================================= */

function RecommendationCard({
  icon,
  iconBg,
  title,
  subtitle,
  text,
}) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">

      <div className="flex items-center gap-3 mb-4">

        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-gray-900">
            {title}
          </h3>

          <p className="text-xs text-gray-500">
            {subtitle}
          </p>

        </div>

      </div>

      <p className="text-sm text-gray-600 leading-6">
        {text}
      </p>

    </div>
  );
}