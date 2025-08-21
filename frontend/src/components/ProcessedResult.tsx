import React from "react"

interface ProcessedResultProps {
  blurredImage: string
}

const ProcessedResult: React.FC<ProcessedResultProps> = ({ blurredImage }) => (
  <div className="space-y-8">
    <div className="premium-glass rounded-3xl p-10 space-y-6 luxury-shadow-xl mindcraft-glow">
      <h3 className="font-sans font-bold text-3xl text-white">Processed Result</h3>
      <p className="text-white/90 text-lg">
        Your image has been successfully processed with PII masking applied.
      </p>
    </div>

    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700"></div>
      <div className="relative premium-glass rounded-3xl p-10 luxury-shadow-xl">
        <img
          src={blurredImage}
          alt="Processed result with PII masking"
          className="w-full h-auto rounded-2xl luxury-shadow"
          style={{ maxHeight: 400, objectFit: "contain" }}
        />
        <div className="mt-8 flex justify-between items-center">
          <span className="text-white/80 text-lg">Processing complete</span>
          <a
            href={blurredImage}
            download="processed-image.png"
            className="btn-luxury-gold text-white font-bold px-8 py-3 rounded-2xl premium-hover luxury-shadow transition-all duration-500 mindcraft-glow"
          >
            Download Result
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default ProcessedResult