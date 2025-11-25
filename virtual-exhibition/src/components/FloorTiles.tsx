import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshPhysicalMaterial } from "three";
import { loadTexture } from "../utils/textures";

interface FloorTilesProps {
  size: number;
  height?: number;
  position?: [number, number, number];
  textureType?: "marble" | "wood" | "tile" | "basketball";
}

const FloorTiles: React.FC<FloorTilesProps> = ({
  size,
  height = 0,
  position = [0, 0, 0],
  textureType = "marble",
}) => {
  const floorRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);

  // Set up textures and material
  useEffect(() => {
    // Only load textures for non-basketball floors
    if (textureType !== "basketball") {
      const texture = loadTexture(
        `/textures/${textureType}_floor.jpg`,
        [12, 12]
      );

      // Enhance texture quality
      texture.anisotropy = 16;

      // Apply to material
      if (materialRef.current) {
        materialRef.current.map = texture;
        materialRef.current.needsUpdate = true;
      }

      // Cleanup
      return () => {
        if (texture) texture.dispose();
      };
    }
  }, [textureType]);

  // Add subtle animation for reflective surfaces
  useFrame(({ clock }) => {
    if (materialRef.current && textureType === "marble") {
      // Subtle pulsing of reflectivity to simulate light changes
      materialRef.current.reflectivity =
        0.05 + Math.sin(clock.getElapsedTime() * 0.2) * 0.02;
    }
  });

  // Different floor based on texture type
  if (textureType === "basketball") {
    return (
      <mesh
        ref={floorRef}
        position={[position[0], position[1] + height, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[size, size, 32, 32]} />
        <meshStandardMaterial
          color="#C96B26" // Medium brown color for basketball court
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
    );
  }

  return (
    <mesh
      ref={floorRef}
      position={[position[0], position[1] + height, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[size, size, 32, 32]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color={
          textureType === "marble"
            ? "#f5f5f5"
            : textureType === "wood"
            ? "#a67c52"
            : "#e0e0e0"
        }
        roughness={
          textureType === "marble" ? 0.3 : textureType === "wood" ? 0.7 : 0.5
        }
        metalness={textureType === "marble" ? 0.05 : 0.0}
        clearcoat={
          textureType === "marble" ? 0.8 : textureType === "wood" ? 0.3 : 0.0
        }
        clearcoatRoughness={0.2}
        reflectivity={textureType === "marble" ? 0.1 : 0.02}
      />
    </mesh>
  );
};

export default FloorTiles;
