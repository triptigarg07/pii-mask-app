"use client";
import type React from "react";
import { useState, useCallback } from "react";
import { Upload, ImageIcon, Sparkles, Shield, Zap } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.filter = "blur(12px)";
          ctx.drawImage(img, 0, 0);
          setBlurredImage(canvas.toDataURL());
        }
        setLoading(false);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen premium-animated-bg">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 luxury-mesh-bg"></div>
        <div className="absolute inset-0 premium-mesh-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full premium-glass text-white font-semibold text-sm backdrop-blur-sm luxury-shadow">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Professional Grade Processing
            </div>
            <h1 className="font-sans font-black text-7xl md:text-9xl text-white leading-tight drop-shadow-2xl">
              PII Masking
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text">
                Studio
              </span>
            </h1>
            <p className="text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
              Advanced image processing with intelligent privacy protection.
              Secure, fast, and professional-grade PII masking technology.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div className="premium-glass rounded-3xl p-10 space-y-8 luxury-shadow-xl">
              <div className="space-y-6">
                <h2 className="font-sans font-bold text-4xl text-white">
                  Upload & Process
                </h2>
                <p className="text-white/90 leading-relaxed text-lg">
                  Drag and drop your image or click to select. Our advanced
                  algorithms will automatically detect and mask sensitive
                  information.
                </p>
              </div>

              <form onSubmit={handleUpload} className="space-y-8">
                <div
                  className={`relative group border-2 border-dashed rounded-3xl p-20 text-center transition-all duration-700 premium-hover ${
                    dragActive
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 scale-105 luxury-shadow-xl"
                      : "border-white/20 hover:border-yellow-400/70 hover:bg-gradient-to-br hover:from-white/10 hover:to-yellow-400/10"
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

                  <div className="space-y-8">
                    <div
                      className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ${
                        dragActive
                          ? "bg-gradient-to-br from-yellow-400 to-purple-600 text-white scale-125 luxury-shadow-xl"
                          : "bg-gradient-to-br from-white/20 to-yellow-400/20 text-white group-hover:from-yellow-400/30 group-hover:to-purple-600/30 group-hover:scale-110"
                      }`}
                    >
                      <Upload className="w-12 h-12" />
                    </div>

                    <div className="space-y-4">
                      <p className="font-semibold text-white text-xl">
                        {selectedFile
                          ? selectedFile.name
                          : "Drop your image here"}
                      </p>
                      <p className="text-white/80 text-lg">
                        or click to browse • PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedFile || loading}
                  className="w-full btn-luxury-primary text-white font-bold py-6 px-10 rounded-3xl premium-hover luxury-shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-700 text-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Image...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Shield className="w-6 h-6" />
                      Mask PII & Process
                    </div>
                  )}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-3xl premium-glass premium-hover luxury-shadow">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="font-bold text-white text-lg">Privacy First</p>
              </div>
              <div className="text-center p-8 rounded-3xl premium-glass premium-hover luxury-shadow">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="font-bold text-white text-lg">Lightning Fast</p>
              </div>
              <div className="text-center p-8 rounded-3xl premium-glass premium-hover luxury-shadow">
                <ImageIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="font-bold text-white text-lg">High Quality</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {blurredImage ? (
              <div className="space-y-8">
                <div className="premium-glass rounded-3xl p-10 space-y-6 luxury-shadow-xl">
                  <h3 className="font-sans font-bold text-3xl text-white">
                    Processed Result
                  </h3>
                  <p className="text-white/90 text-lg">
                    Your image has been successfully processed with PII masking
                    applied.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700"></div>
                  <div className="relative premium-glass rounded-3xl p-10 luxury-shadow-xl">
                    <img
                      src={blurredImage || "/placeholder.svg"}
                      alt="Processed result with PII masking"
                      className="w-full h-auto rounded-2xl luxury-shadow"
                      style={{ maxHeight: 400, objectFit: "contain" }}
                    />
                    <div className="mt-8 flex justify-between items-center">
                      <span className="text-white/80 text-lg">
                        Processing complete
                      </span>
                      <button className="btn-luxury-gold text-white font-bold px-8 py-3 rounded-2xl premium-hover luxury-shadow transition-all duration-500">
                        Download Result
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="premium-glass rounded-3xl p-20 text-center space-y-8 luxury-shadow-xl">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-white/20 to-yellow-400/20 flex items-center justify-center">
                  <ImageIcon className="w-14 h-14 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-2xl text-white">
                    Ready to Process
                  </h3>
                  <p className="text-white/80 text-lg">
                    Upload an image to see the PII masking results here
                  </p>
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
              © 2024 PII Masking Studio. Professional image processing with
              privacy protection.
            </p>
            <div className="flex justify-center gap-12 text-white/80">
              <a
                href="#"
                className="hover:text-yellow-400 transition-colors font-semibold text-lg"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition-colors font-semibold text-lg"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition-colors font-semibold text-lg"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
