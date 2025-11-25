import { useState, useEffect } from "react";
import { autoDetectGalleryImages } from "../utils/imageLoader";

export interface ImageType {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  year?: string;
  description?: string;
  category?: string;
  width?: number;
  height?: number;
}

export const useImageData = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Automatically detect and load images from public/images directory
        const detectedImages = await autoDetectGalleryImages();

        setImages(detectedImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setError("Failed to load images. Please try again later.");
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, loading, error };
};

export default useImageData;
