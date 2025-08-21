"use client"
import type React from "react"
import { useState, useCallback } from "react"
import { ImageIcon} from "lucide-react"
import UploadForm from "@/components/UploadForm"
import CustomCursor from "@/components/custom-cursor"
import PremiumNavigation from "@/components/premium-navigation"
import FeatureCards from "@/components/FeatureCards"
import ProcessedResult from "@/components/ProcessedResult"
import HeaderSection from "@/components/HeaderSection"

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [blurredImage, setBlurredImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return
    setLoading(true)

    const reader = new FileReader()
    reader.onload = async (event) => {
      const img = new window.Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.filter = "blur(12px)"
          ctx.drawImage(img, 0, 0)
          setBlurredImage(canvas.toDataURL())
        }
        setLoading(false)
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen mindcraft-bg">
      <CustomCursor />

      <PremiumNavigation />

      <div className="fixed top-6 left-6 z-50">
        <h1 className="font-sans font-bold text-2xl text-white">Mindcraft</h1>
      </div>
          <HeaderSection />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div className="premium-glass rounded-3xl p-10 space-y-8 luxury-shadow-xl mindcraft-glow">
              <div className="space-y-6">
                <h2 className="font-sans font-bold text-4xl text-white">Upload & Process</h2>
                <p className="text-white/90 leading-relaxed text-lg">
                  Drag and drop your image or click to select. Our advanced algorithms will automatically detect and
                  mask sensitive information.
                </p>
              </div>

               <UploadForm
                  selectedFile={selectedFile}
                  dragActive={dragActive}
                  loading={loading}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  handleFileSelect={handleFileSelect}
                  handleUpload={handleUpload}
                />       
            </div>
          
          <div className="flex justify-center">
              <FeatureCards />
            </div>
            </div>

          <div className="space-y-10">
            {blurredImage ? (
            <div className="space-y-10">
            {blurredImage ? (
              <ProcessedResult blurredImage={blurredImage} />
            ) : (
              <div className="premium-glass rounded-3xl p-20 text-center space-y-8 luxury-shadow-xl mindcraft-glow">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-white/20 to-blue-400/20 flex items-center justify-center">
                  <ImageIcon className="w-14 h-14 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-2xl text-white">Ready to Process</h3>
                  <p className="text-white/80 text-lg">Upload an image to see the PII masking results here</p>
                </div>
              </div>
            )}
          </div>
            ) : (
              <div className="premium-glass rounded-3xl p-20 text-center space-y-8 luxury-shadow-xl mindcraft-glow">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-white/20 to-blue-400/20 flex items-center justify-center">
                  <ImageIcon className="w-14 h-14 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-2xl text-white">Ready to Process</h3>
                  <p className="text-white/80 text-lg">Upload an image to see the PII masking results here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <p className="text-white/90 text-xl font-light">
              © 2024 PII Masking Labs. Professional image processing with privacy protection.
            </p>
            <div className="flex justify-center gap-12 text-white/80">
              <a href="#" className="hover:text-blue-400 transition-colors font-semibold text-lg">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors font-semibold text-lg">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors font-semibold text-lg">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
