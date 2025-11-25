import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { useImageData } from "../hooks/useImageData";

interface GalleryContextType {
  selectedImageId: string | null;
  setSelectedImageId: (id: string | null) => void;
  roomSize: number;
  halfRoomSize: number;
}

// Calculate room size based on image count
const calculateRoomSize = (images: any[]) => {
  // Base room size (standard room)
  const baseSize = 20;

  // Max images per wall (for sizing calculations)
  const maxImagesPerWall = 6; // Standard wall can fit about 6 images comfortably

  // Calculate max images on any wall
  if (!images || images.length === 0) return baseSize;

  const totalImages = images.length;
  const totalWalls = 4;

  // Estimate max images on any wall
  const baseImagesPerWall = Math.floor(totalImages / totalWalls);
  const maxImagesOnAnyWall = baseImagesPerWall + 1; // Approximation

  // If we have more than max images on any wall, increase room size
  if (maxImagesOnAnyWall > maxImagesPerWall) {
    // Add 3 units for each additional 2 images
    const extraImagesOnWall = maxImagesOnAnyWall - maxImagesPerWall;
    const extraSize = Math.ceil(extraImagesOnWall / 2) * 3;
    return baseSize + extraSize;
  }

  return baseSize;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const { images } = useImageData();

  // Calculate room dimensions once and memoize them
  const roomDimensions = useMemo(() => {
    const size = calculateRoomSize(images);
    return {
      roomSize: size,
      halfRoomSize: size / 2,
    };
  }, [images]);

  return (
    <GalleryContext.Provider
      value={{
        selectedImageId,
        setSelectedImageId,
        roomSize: roomDimensions.roomSize,
        halfRoomSize: roomDimensions.halfRoomSize,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
