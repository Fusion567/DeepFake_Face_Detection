'use client'

import { motion } from 'framer-motion'
import { FiUpload, FiImage } from 'react-icons/fi'
import { useState, useCallback } from 'react'
import NextImage from 'next/image'


interface UploadAreaProps {
  onUpload: (file: File) => Promise<void>
  isLoading: boolean
}

export default function UploadArea({ onUpload, isLoading }: UploadAreaProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0])
    }
  }

  const handleFile = useCallback(async (file: File) => {
  if (!file.type.match('image.*')) {
    alert('Please upload an image file (JPEG, PNG)')
    return
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    alert('File size too large (max 5MB)')
    return
  }

  try {
    // Set preview
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Process upload
    await onUpload(file)
  } catch (error) {
    console.error('Upload failed:', error)
    setPreview(null)
    alert('Upload failed. Please try again.')
  }
}, [setPreview, onUpload]); // These dependencies ensure the hook stays stable unless they change

  const handleDrop = useCallback(async (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  }, [setDragActive, handleFile]); 

  return (
    <div className="bg-dark-200 rounded-xl p-6 shadow-lg h-full">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <p className="text-gray-400 mb-6">Upload or drag & drop an image to analyze</p>
      
      <motion.label
        htmlFor="upload-input"
        className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer transition-all ${
          dragActive ? 'border-blue-500 bg-dark-300' : 'border-gray-600 hover:border-gray-500'
        } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={!isLoading ? { scale: 1.01 } : {}}
        whileTap={!isLoading ? { scale: 0.99 } : {}}
      >
        <input
          id="upload-input"
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          disabled={isLoading}
        />
        
        {preview ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-64"
          >
            <NextImage
              src={preview}
              alt="Preview"
              fill
              className="object-contain rounded-md"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            <FiUpload className="text-4xl mb-4 text-gray-400" />
            <p className="text-center text-gray-400 mb-2">
              <span className="text-blue-400 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">JPG, PNG, WEBP (Max 5MB)</p>
          </>
        )}
      </motion.label>
      
      <div className="mt-6 flex flex-wrap gap-3">
        {['selfie', 'portrait', 'group'].map((type) => (
          <motion.button
            key={type}
            className={`px-4 py-2 rounded-lg text-sm flex items-center ${
              isLoading ? 'bg-dark-400 text-gray-500' : 'bg-dark-300 hover:bg-dark-400'
            }`}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading}
          >
            <FiImage className="mr-2" />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
