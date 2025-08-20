"use client";
import Image from "next/image";

import React, { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock API: Blurs the image client-side and returns it
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          PII Masking Demo (Mock)
        </h1>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Mask PII (Blur Image)"}
          </button>
        </form>
        {blurredImage && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Blurred Image Result</h2>
            <img
              src={blurredImage}
              alt="Blurred result"
              className="mx-auto rounded border shadow"
              style={{ maxWidth: "100%", maxHeight: 400 }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
