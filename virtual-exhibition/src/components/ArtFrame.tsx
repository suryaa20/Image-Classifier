import React, { useState, useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import { TextureLoader, MeshStandardMaterial } from "three";
import { ImageType } from "../hooks/useImageData";
import { classifyImage } from "../utils/imageClassifier";
import { useGallery } from "../context/GalleryContext";

interface ArtFrameProps {
  position: [number, number, number];
  image: ImageType;
  width: number;
  height: number;
}

const ArtFrame: React.FC<ArtFrameProps> = ({
  position,
  image,
  width,
  height,
}) => {
  const [hovered, setHovered] = useState(false);
  const [artType, setArtType] = useState<string>("");
  const [classifying, setClassifying] = useState(false);
  const texture = useLoader(TextureLoader, image.url);

  // Use gallery context instead of local state for selection
  const { selectedImageId, setSelectedImageId } = useGallery();
  const isSelected = selectedImageId === image.id;

  // Refs for materials to animate them
  const frameMaterialRef = useRef<MeshStandardMaterial>(null);
  const glowMaterialRef = useRef<MeshStandardMaterial>(null);

  // Animation values for glow effect
  const pulseSpeed = 1.5; // Speed of the pulsing effect

  // Slightly thicker frame
  const frameThickness = 0.06;
  // Add padding around the image
  const frameWidth = width + frameThickness * 2;
  const frameHeight = height + frameThickness * 2;

  // Slightly larger glow frame
  const glowThickness = 0.03;
  const glowWidth = frameWidth + glowThickness * 2;
  const glowHeight = frameHeight + glowThickness * 2;

  // Adjust aspect ratio if needed
  const aspectRatio = texture.image
    ? texture.image.width / texture.image.height
    : 1;
  const adjustedHeight = width / aspectRatio;
  const finalHeight = height || adjustedHeight;

  // Animate glow effect when selected
  useFrame((state) => {
    if (isSelected && glowMaterialRef.current) {
      // Pulsing animation for the glow
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.4 + 0.6;
      glowMaterialRef.current.emissiveIntensity = pulse;
    }
  });

  // Classify the image when it's clicked
  useEffect(() => {
    if (isSelected && !artType && !classifying) {
      setClassifying(true);

      classifyImage(image.url)
        .then((result) => {
          setArtType(result);
          console.log(`Image classified as: ${result}`);
        })
        .catch((error) => {
          console.error("Error classifying image:", error);
          setArtType("Unknown");
        })
        .finally(() => {
          setClassifying(false);
        });
    }
  }, [isSelected, image.url, artType, classifying]);

  // Change cursor style on hover
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Handle image selection
  const handleClick = () => {
    if (isSelected) {
      // Deselect if already selected
      setSelectedImageId(null);
      // Reset classification when deselecting
      setArtType("");
    } else {
      // Select this image (and deselect others via context)
      setSelectedImageId(image.id);
    }
  };

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Highlight glow effect for selected image */}
      {isSelected && (
        <mesh castShadow position={[0, 0, -0.02]}>
          <boxGeometry args={[glowWidth, glowHeight, frameThickness + 0.01]} />
          <meshStandardMaterial
            ref={glowMaterialRef}
            color="#FFD700" // Golden glow
            emissive="#FFD700"
            emissiveIntensity={1}
            transparent={true}
            opacity={0.7}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      )}

      {/* Frame with shadow */}
      <mesh castShadow position={[0, 0, -0.01]}>
        <boxGeometry args={[frameWidth, frameHeight, frameThickness]} />
        <meshStandardMaterial
          ref={frameMaterialRef}
          color={isSelected ? "#B8860B" : hovered ? "#a97d50" : "#8B4513"} // Darker gold when selected
          roughness={0.3}
          metalness={isSelected ? 0.7 : 0.4}
          emissive={isSelected ? "#B8860B" : hovered ? "#553828" : "#000000"}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Mat board (white border inside frame) */}
      <mesh position={[0, 0, frameThickness / 2]}>
        <boxGeometry args={[width + 0.1, finalHeight + 0.1, 0.01]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Artwork */}
      <mesh position={[0, 0, frameThickness / 2 + 0.01]}>
        <planeGeometry args={[width, finalHeight]} />
        <meshStandardMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Show art type below image */}
      <Text
        position={[0, -(finalHeight / 2) - 0.15, 0.05]}
        fontSize={0.1}
        color={isSelected ? "#FFD700" : "#333333"} // Gold text when selected
        anchorX="center"
        anchorY="top"
      >
        {isSelected
          ? classifying
            ? "Analyzing..."
            : artType || "Analyzing..."
          : ""}
      </Text>

      {/* Crosshair indicator when hovering */}
      {hovered && !isSelected && (
        <Html position={[0, 0, 0.2]} center>
          <div
            style={{
              width: "20px",
              height: "20px",
              position: "relative",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "2px",
                backgroundColor: "white",
                top: "9px",
                boxShadow: "0 0 2px black",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "20px",
                backgroundColor: "white",
                left: "9px",
                boxShadow: "0 0 2px black",
              }}
            ></div>
          </div>
        </Html>
      )}

      {/* Selected indicator showing classification result */}
      {isSelected && artType && (
        <Html position={[0, finalHeight / 2 + 0.2, 0.1]} center>
          <div
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "3px 6px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: "bold",
              boxShadow: "0 0 4px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
          >
            {artType}
          </div>
        </Html>
      )}
    </group>
  );
};

export default ArtFrame;
