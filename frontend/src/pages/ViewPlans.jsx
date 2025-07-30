import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Eye,
  RefreshCw,
  AlertCircle,
  Package,
  User,
  Grid3X3,
} from "lucide-react";
import {
  getFloorPlans,
  deleteFloorPlan,
  getAllVersions,
} from "../api/floorPlanApi"; 


const FloorPlanTable = ({ plans }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
    <div className="px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10">
      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
        <Grid3X3 className="w-5 h-5 text-blue-600" />
        Floor Plans ({plans.length})
      </h4>
    </div>
    <div className="p-6">
      {plans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No floor plans found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-white/30"
            >
              <div>
                <h5 className="font-medium text-gray-900">{plan.name}</h5>
                <p className="text-sm text-gray-600">
                  Version {plan.version} • Created {plan.created}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default function ViewPlans({ user = "demo-user" }) {
  const [version, setVersion] = useState("");
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [allVersions, setAllVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const isAdmin = user === "admin";

  useEffect(() => {
    if (isAdmin) fetchVersions();
  }, [isAdmin]);

  const fetchPlans = async (v = version) => {
    if (!v.trim()) {
      setError("Please enter a version number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await getFloorPlans(user, v);
      setPlans(res.data);
    } catch (err) {
      setPlans([]);
      setError("Failed to fetch floor plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVersions = async () => {
    setVersionsLoading(true);
    try {
      const res = await getAllVersions();
      setAllVersions(res.data);
    } catch (err) {
      setAllVersions([]);
      setError("Failed to fetch versions");
    } finally {
      setVersionsLoading(false);
    }
  };

  const handleDelete = async (v) => {
    if (
      !window.confirm(
        `Are you sure you want to delete version '${v}'? This action cannot be undone.`
      )
    )
      return;

    try {
      await deleteFloorPlan(user, v);
      await fetchVersions();
      setPlans([]);
      setVersion("");
    } catch (err) {
      setError("Failed to delete floor plan. Please try again.");
    }
  };

  const handleVersionSelect = (v) => {
    setVersion(v);
    fetchPlans(v);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchPlans();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Floor Plans Dashboard
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <User className="w-4 h-4" />
              <span>Welcome, {user}</span>
              {isAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm ml-2">
                  Admin Access
                </span>
              )}
            </div>
          </div>

          {/* Search section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              Search Floor Plans
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="version-input"
                  className="block text-sm font-medium text-white/90 mb-3"
                >
                  Version Number
                </label>
                <input
                  id="version-input"
                  type="text"
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Enter version (e.g., 1.0, 2.1)"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="sm:pt-8">
                <button
                  onClick={() => fetchPlans()}
                  disabled={loading || !version.trim()}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search Plans
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl">
                <div className="flex items-center text-red-200">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {(plans.length > 0 || loading) && (
            <div className="mb-8">
              {loading ? (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-12">
                  <div className="flex flex-col items-center justify-center text-white">
                    <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                    <span className="text-lg">Loading floor plans...</span>
                  </div>
                </div>
              ) : (
                <FloorPlanTable plans={plans} />
              )}
            </div>
          )}

          {/* Admin version management */}
          {isAdmin && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  Version Management
                </h2>
                <button
                  onClick={fetchVersions}
                  disabled={versionsLoading}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${versionsLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>

              {versionsLoading ? (
                <div className="flex items-center justify-center py-12 text-white">
                  <RefreshCw className="w-6 h-6 animate-spin mr-3" />
                  <span>Loading versions...</span>
                </div>
              ) : allVersions.length === 0 ? (
                <div className="text-center py-12 text-white/70">
                  <Package className="w-16 h-16 mx-auto mb-4 text-white/30" />
                  <p className="text-lg">No versions found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allVersions.map((v) => (
                    <div
                      key={v}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:from-white/10 hover:to-white/15 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                        <span className="font-mono text-xl font-medium text-white">
                          Version {v}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVersionSelect(v)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(v)}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
