import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloorPlanForm from "../components/FloorPlanForm";
import { CheckCircle } from "lucide-react";

import {
  updateFloorPlan,
  getAllVersions,
} from "../api/floorPlanApi"; // ✅ Axios-based functions

export default function UpdatePlans({ user = "demo_user", onClose }) {
  const [version, setVersion] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [allVersions, setAllVersions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const formRef = useRef();

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const res = await getAllVersions();
      setAllVersions(res.data);
    } catch (err) {
      setAllVersions([]);
    }
  };

  const handleSubmit = async (floors) => {
    setError("");
    setIsLoading(true);

    if (allVersions.includes(version.trim())) {
      setError("This version already exists. Please use a new version.");
      setIsLoading(false);
      return;
    }

    const floorDTOs = floors.map((floor, i) => ({
      floorNumber: i + 1,
      rooms: floor.rooms,
    }));

    try {
      const payload = {
        username: user,
        version: version.trim(),
        floorDTOs,
      };

      const res = await updateFloorPlan(payload);

      if (res.status === 200) {
        setMessage(res.data);
        setShowSuccess(true);
        setVersion("");
        if (formRef.current && formRef.current.resetForm) {
          formRef.current.resetForm();
        }
        fetchVersions();
        setTimeout(() => {
          setShowSuccess(false);
          setTimeout(() => {
            setIsOpen(false);
            onClose && setTimeout(() => onClose(), 300);
          }, 1000);
        }, 2500);
      } else {
        setError(res.data || "Failed to update floor plan.");
      }
    } catch (err) {
      setError("An error occurred while updating the floor plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading && !showSuccess) {
      setIsOpen(false);
      if (onClose) {
        setTimeout(() => onClose(), 300);
      }
    }
  };

  if (!isOpen) return null;


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <motion.div
            className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm px-8 py-6 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight drop-shadow-sm">
                    Update Floor Plans
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 opacity-90">
                    Create and manage your building floor configurations
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isLoading || showSuccess}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 shadow-lg"
                  aria-label="Close dialog"
                >
                  X
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-8 bg-white/30 backdrop-blur-sm">
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3 drop-shadow-sm">
                  Version Number
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/60 focus:bg-white/80 transition-all duration-200 disabled:bg-white/40 disabled:cursor-not-allowed shadow-lg"
                  placeholder="e.g., v3.0, 2024.1, etc."
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  disabled={showSuccess || isLoading}
                />
                {error && (
                  <motion.div
                    className="mt-3 p-3 bg-red-100/80 backdrop-blur-sm border border-red-200/60 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm font-medium text-red-700">{error}</p>
                  </motion.div>
                )}
              </div>

              <div className="mb-6">
                <FloorPlanForm onSubmit={handleSubmit} ref={formRef} />
              </div>

              {allVersions.length > 0 && (
                <div className="mt-8 p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide drop-shadow-sm">
                    Existing Versions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allVersions.map((v, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/60 backdrop-blur-sm text-slate-600 text-sm font-medium rounded-full border border-white/40 shadow-md"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {message && !error && !showSuccess && (
                <motion.div
                  className="mt-6 p-4 bg-green-100/80 backdrop-blur-sm border border-green-200/60 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm font-medium text-green-700">{message}</p>
                </motion.div>
              )}
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center border border-white/20 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col items-center space-y-4 p-8 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-semibold text-slate-600 drop-shadow-sm">Updating floor plan...</p>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="absolute inset-0 bg-white/80 backdrop-blur-lg flex items-center justify-center rounded-2xl border border-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="flex flex-col items-center space-y-6 p-8 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle size={80} className="text-green-500 drop-shadow-lg" /> {/* ✅ Fixed usage */}
                    </motion.div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-slate-800 drop-shadow-sm">Success!</h3>
                      <p className="text-slate-600 font-medium opacity-90">Floor plan has been updated successfully</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
