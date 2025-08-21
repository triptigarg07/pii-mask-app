import React from "react"
import { Sparkles } from "lucide-react"

const HeaderSection: React.FC = () => (
  <header className="relative overflow-hidden pt-32">
    <div className="absolute inset-0 luxury-mesh-bg"></div>
    <div className="absolute inset-0 premium-mesh-overlay"></div>
    <div className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="text-center space-y-10">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full premium-glass text-white font-semibold text-sm backdrop-blur-sm luxury-shadow mindcraft-glow">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          innovate, automate, and excel in the digital era
        </div>
        <h1 className="font-sans font-black text-7xl md:text-9xl text-white leading-tight drop-shadow-2xl">
          PII Masking
          <span className="block text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text">
            Labs
          </span>
        </h1>
        <p className="text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
          Advanced image processing with intelligent privacy protection. Secure, fast, and professional-grade PII
          masking technology.
        </p>
        <div className="flex items-center justify-center gap-6 pt-8">
          <button className="btn-luxury-primary text-white font-bold py-4 px-8 rounded-full premium-hover luxury-shadow-xl transition-all duration-700 text-lg mindcraft-glow">
            our services
          </button>
          <button className="premium-glass text-white font-bold py-4 px-8 rounded-full premium-hover luxury-shadow transition-all duration-700 text-lg border border-white/20 mindcraft-glow">
            contact us →
          </button>
        </div>
      </div>
    </div>
  </header>
)

export default HeaderSection