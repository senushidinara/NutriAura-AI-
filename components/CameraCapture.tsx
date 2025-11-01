import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon, UploadIcon } from './icons';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const startCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setUploadedImage(null);
    setIsCameraReady(false);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      let message = "Could not access camera. Please check permissions in your browser settings.";
      if (err instanceof Error && err.name === 'NotAllowedError') {
        message = "Camera access denied. Please grant permission in your browser's address bar and try again.";
      }
      setError(message);
    }
  };
  
  const handleCanPlay = () => setIsCameraReady(true);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current && isCameraReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
      }
    }
  }, [onCapture, isCameraReady]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setUploadedImage(dataUrl);
        onCapture(dataUrl);
      };
      reader.readAsDataURL(file);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const hasCamera = !!stream || isCameraReady;

  return (
    <div className="flex flex-col items-center w-full interactive-card rounded-xl shadow-lg p-6 sm:p-8">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Step 1 of 2: Face Scan</p>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">AI Face Scan</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-center">Take a selfie or upload a photo in good lighting.</p>
        <div className="relative w-full aspect-square max-w-md bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-inner border-4 border-white dark:border-slate-700">
            {uploadedImage ? (
              <img src={uploadedImage} alt="User upload preview" className="w-full h-full object-cover" />
            ) : hasCamera ? (
              <>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    onCanPlay={handleCanPlay}
                    className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
                />
                {!isCameraReady && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
                     </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <CameraIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4"/>
                 <button onClick={startCamera} className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition">Enable Camera</button>
              </div>
            )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        
        <div className="mt-6 w-full max-w-xs flex flex-col gap-3">
          <button
              onClick={handleCapture}
              disabled={!isCameraReady || !!uploadedImage}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
          >
              <CameraIcon className="w-6 h-6" />
              <span>Take Photo & Continue</span>
          </button>
          <button
              onClick={handleUploadClick}
              className="w-full bg-slate-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-500 flex items-center justify-center gap-2"
          >
              <UploadIcon className="w-6 h-6" />
              <span>Or Upload a Photo</span>
          </button>
        </div>
        {error && <p className="text-sm text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CameraCapture;