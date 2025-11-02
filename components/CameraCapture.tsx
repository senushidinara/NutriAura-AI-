import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon, UploadIcon } from './icons';
import Stepper from './Stepper';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  imagePreview?: string | null;
  onConfirm?: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, imagePreview = null, onConfirm }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const stopCameraStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraReady(false);
      setIsCameraStarting(false);
    }
  }, [stream]);

  const startCamera = async () => {
    if (stream) stopCameraStream();
    setError(null);
    setIsCameraStarting(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      let message = "Could not access camera. Please check permissions in your browser settings.";
      if (err instanceof Error && err.name === 'NotAllowedError') {
        message = "Camera access denied. To fix this, please grant camera permission in your browser's address bar (usually a camera icon) and refresh the page.";
      }
      setError(message);
      setIsCameraStarting(false);
    }
  };
  
  const handleCanPlay = () => {
    setIsCameraReady(true);
    setIsCameraStarting(false);
  };

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
        stopCameraStream();
      }
    }
  }, [onCapture, isCameraReady, stopCameraStream]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        stopCameraStream();
        onCapture(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    return () => stopCameraStream();
  }, [stopCameraStream]);

  const renderInitialState = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-4">
      <button onClick={startCamera} className="w-full text-lg max-w-xs bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-slate-700">
        <CameraIcon className="w-7 h-7" />
        Use Camera
      </button>
      <button onClick={handleUploadClick} className="w-full text-lg max-w-xs bg-slate-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-slate-700 transition flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-700">
        <UploadIcon className="w-7 h-7" />
        Upload Photo
      </button>
    </div>
  );

  const renderCameraView = () => (
    <>
      <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onCanPlay={handleCanPlay}
          className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
      />
      {(isCameraStarting || !isCameraReady) && (
           <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
           </div>
      )}
    </>
  );

  const renderPreview = () => (
    <img src={imagePreview!} alt="User submission preview" className="w-full h-full object-cover" />
  );

  return (
    <div className="flex flex-col items-center w-full interactive-card rounded-xl shadow-lg p-6 sm:p-8">
        <Stepper currentStep={1} totalSteps={3} />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">AI Face Scan</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 text-center">Take a selfie or upload a photo in good lighting.</p>
        
        <div className="relative w-full aspect-square max-w-md bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden shadow-inner border-4 border-white dark:border-slate-700">
            {imagePreview ? renderPreview() : stream ? renderCameraView() : renderInitialState()}
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        
        <div className="mt-6 w-full max-w-xs flex flex-col gap-3">
          {imagePreview && onConfirm ? (
             <button
              onClick={onConfirm}
              className="w-full text-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:focus-visible:ring-emerald-700 flex items-center justify-center gap-2"
            >
              <span>Confirm & Continue</span>
            </button>
          ) : stream ? (
            <button
                onClick={handleCapture}
                disabled={!isCameraReady}
                className="w-full text-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:focus-visible:ring-emerald-700 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
            >
                <CameraIcon className="w-7 h-7" />
                <span>Take Photo</span>
            </button>
          ) : null }
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CameraCapture;
