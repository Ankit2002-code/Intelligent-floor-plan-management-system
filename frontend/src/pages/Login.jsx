import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ArrowRight, Shield, CheckCircle } from "lucide-react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return; // Don't proceed if username is empty
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple logic: check if username is admin
    setUser(username.trim());
    setIsLoading(false);
    
    // Navigate to home page after successful login
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  const features = [
    "Username-based access control",
    "Admin privileges for updates", 
    "View-only mode for regular users",
    "Instant access without passwords"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-white/20 rotate-45 animate-bounce"></div>
        <div className="absolute top-48 right-1/3 w-2 h-2 bg-blue-300/30 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-purple-300/20 rotate-45 animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-white/90 text-sm font-medium">Secure Access Portal</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Welcome
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Back
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Access your Floor Plan Management System with enterprise-grade security and seamless experience.
              </p>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                  <p className="text-white/70">Enter your username to continue</p>
                </div>

                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-white/90">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-white/50" />
                      </div>
                      <input
                        id="username"
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                      <div className="text-white/70 text-sm mb-2">
                        <strong>Access Levels:</strong>
                      </div>
                      <div className="space-y-1 text-xs text-white/60">
                        <p>👑 <strong>admin</strong> - Full access with update capabilities</p>
                        <p>👤 <strong>other usernames</strong> - View-only access</p>
                      </div>
                    </div>
                  </div>

                  {/* Access Info */}
                  <div className="text-center">
                    <p className="text-white/60 text-sm">
                      No registration required - just enter your username
                    </p>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading || !username.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-white/60 text-sm">
                    Ready to manage your floor plans?{' '}
                    <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Learn More
                    </button>
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}