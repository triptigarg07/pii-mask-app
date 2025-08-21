import React from "react"
import { Upload, Shield } from "lucide-react"

interface UploadFormProps {
  selectedFile: File | null
  dragActive: boolean
  loading: boolean
  handleDrag: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUpload: (e: React.FormEvent) => void
}

const UploadForm: React.FC<UploadFormProps> = ({
  selectedFile,
  dragActive,
  loading,
  handleDrag,
  handleDrop,
  handleFileSelect,
  handleUpload,
}) => (
  <form onSubmit={handleUpload} className="space-y-8">
    <div
      className={`relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-700 premium-hover flex items-center justify-center overflow-hidden ${
        dragActive
          ? "border-blue-400 bg-gradient-to-br from-blue-400/20 to-purple-600/20 scale-105 luxury-shadow-xl horizontal-upload-box"
          : "border-white/20 hover:border-blue-400/70 hover:bg-gradient-to-br hover:from-white/10 hover:to-blue-400/10 horizontal-upload-box"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        required
      />

      <div className="flex items-center gap-12">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ${
            dragActive
              ? "bg-gradient-to-br from-blue-400 to-purple-600 text-white scale-125 luxury-shadow-xl"
              : "bg-gradient-to-br from-white/20 to-blue-400/20 text-white group-hover:from-blue-400/30 group-hover:to-purple-600/30 group-hover:scale-110"
          }`}
        >
          <Upload className="w-12 h-12" />
        </div>

        <div className="text-left space-y-4">
          <p className="font-semibold text-white text-2xl">
            {selectedFile ? selectedFile.name : "Drop your image here"}
          </p>
          <p className="text-white/80 text-lg">or click to browse • PNG, JPG, WEBP up to 10MB</p>
        </div>
      </div>
    </div>

    <button
      type="submit"
      disabled={!selectedFile || loading}
      className="w-full btn-luxury-primary text-white font-bold py-6 px-10 rounded-3xl premium-hover luxury-shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-700 text-xl mindcraft-glow"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-3">Processing Image...</div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-6 h-6" />
          Mask PII & Process
        </div>
      )}
    </button>
  </form>
)

export default UploadForm