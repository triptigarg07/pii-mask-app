import React from "react"
import { Shield, Zap, ImageIcon } from "lucide-react"

const features = [
  {
    icon: <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />,
    title: "Privacy First",
  },
  {
    icon: <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />,
    title: "Lightning Fast",
  },
  {
    icon: <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />,
    title: "High Quality",
  },
]

const FeatureCards: React.FC = () => (
  <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="text-center p-8 rounded-3xl premium-glass premium-hover luxury-shadow mindcraft-glow"
        >
          {feature.icon}
          <p className="font-bold text-white text-lg">{feature.title}</p>
        </div>
      ))}
    </div>
  </div>
)

export default FeatureCards