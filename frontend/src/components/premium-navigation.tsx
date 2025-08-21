"use client"
import { useState } from "react"

export default function PremiumNavigation() {
  const [activeItem, setActiveItem] = useState("services")

  const navItems = [
    { id: "services", label: "services" },
    { id: "process", label: "process" },
    { id: "team", label: "team" },
    { id: "pricing", label: "pricing" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "contact" },
  ]

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="premium-nav rounded-full px-8 py-4">
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`text-sm font-medium transition-all duration-300 ${
                activeItem === item.id ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
