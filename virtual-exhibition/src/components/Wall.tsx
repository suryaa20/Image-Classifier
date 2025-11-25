import React from "react";
import { Vector3, Euler } from "three";
import { ImageType } from "../hooks/useImageData";
import ArtFrame from "./ArtFrame";

interface WallProps {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  images: ImageType[];
}

const Wall: React.FC<WallProps> = ({
  position,
  rotation,
  width,
  height,
  images,
}) => {
  const positionVector = new Vector3(...position);
  const rotationEuler = new Euler(...rotation);

  const arrangeImages = () => {
    const frames: React.ReactNode[] = [];

    // Skip if no images
    if (images.length === 0) return frames;

    // Safety margin from edges (scales with wall size)
    const safetyMargin = Math.max(1.5, width * 0.075); // At least 1.5 units or 7.5% of wall width
    const effectiveWidth = width - safetyMargin * 2;

    // Calculate available vertical space
    const verticalMargin = height * 0.2; // 20% margin from top and bottom
    const effectiveHeight = height - verticalMargin * 2;

    // Standard art frame dimensions - adjusted based on number of images
    const totalImages = images.length;

    // Calculate frame width based on available space and number of images
    // We want a single row that fits all images with proper spacing
    const minSpaceBetween = 0.8; // Minimum space between frames
    const maxFrameWidth = 2.2; // Maximum frame width for aesthetics
    const minFrameWidth = 1.2; // Minimum frame width for visibility

    // Calculate max width each frame can have
    // Available width / (total images + spaces between)
    const calculatedFrameWidth =
      (effectiveWidth - minSpaceBetween * (totalImages - 1)) / totalImages;

    // Clamp frame width between min and max
    const standardFrameWidth = Math.min(
      maxFrameWidth,
      Math.max(minFrameWidth, calculatedFrameWidth)
    );

    // Calculate aspect ratio (height = width * 1.25)
    const standardFrameHeight = standardFrameWidth * 1.25;

    // Calculate spacing between frames
    const totalWidthNeeded = standardFrameWidth * totalImages;
    const remainingSpace = effectiveWidth - totalWidthNeeded;

    // Distribute remaining space evenly between frames
    const spaceBetween =
      totalImages > 1 ? remainingSpace / (totalImages - 1) : 0;

    // Calculate starting position for the row
    const startX = -effectiveWidth / 2 + standardFrameWidth / 2;

    // Place all images in a single row
    images.forEach((image, index) => {
      // Calculate horizontal position
      const xPos = startX + index * (standardFrameWidth + spaceBetween);

      // All images at same vertical position (centered)
      const yPos = 0;

      // Add frame to the wall
      frames.push(
        <ArtFrame
          key={image.id}
          position={[xPos, yPos, 0.05]}
          image={image}
          width={standardFrameWidth}
          height={standardFrameHeight}
        />
      );
    });

    return frames;
  };

  return (
    <group position={positionVector} rotation={rotationEuler}>
      {/* Wall base */}
      <mesh receiveShadow>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
      </mesh>

      {/* Art frames */}
      <group position={[0, 0, 0.1]}>{arrangeImages()}</group>
    </group>
  );
};

export default Wall;
