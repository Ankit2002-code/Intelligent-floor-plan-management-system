import { useState, useEffect } from "react";
import { ArrowRight, Eye, Shield, Layers, Zap, Users, CheckCircle, Star } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visual Management",
      description: "Intuitive interface for viewing and managing floor plans with real-time updates"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Version Control",
      description: "Track changes with comprehensive version history and rollback capabilities"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Admin Access",
      description: "Secure role-based permissions ensuring only authorized users can make changes"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant loading and seamless navigation"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "10k+", label: "Floor Plans" },
    { number: "500+", label: "Organizations" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-white/20 rotate-45 animate-bounce"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-300/30 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-purple-300/20 rotate-45 animate-bounce delay-700"></div>
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-pink-300/30 rotate-45 animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-16">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Industry Leading Floor Plan Solution</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Floor Plan
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Management
              </span>
              <br />
              System
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your organization's space management with our cutting-edge platform featuring 
              <span className="text-blue-300 font-semibold"> advanced version control</span>, 
              <span className="text-purple-300 font-semibold"> secure admin access</span>, and 
              <span className="text-pink-300 font-semibold"> real-time collaboration</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="/view" 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
              
              <a 
                href="/login" 
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5" />
                <span>Sign In</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Built for modern organizations that demand efficiency, security, and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
                <div className="mt-6">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="container mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Space Management?
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations already using our platform to streamline their floor plan operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/view" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
              </a>
              <a 
                href="/contact" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}