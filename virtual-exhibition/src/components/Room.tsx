import React, { useEffect, useState } from "react";
import { ImageType } from "../hooks/useImageData";
import Wall from "./Wall";
import FloorTiles from "./FloorTiles";
import { Texture } from "three";
import { loadTexture } from "../utils/textures";
import { useGallery } from "../context/GalleryContext";

interface RoomProps {
  images: ImageType[];
}

const Room: React.FC<RoomProps> = ({ images }) => {
  // Load floor texture
  const [floorTexture, setFloorTexture] = useState<Texture | null>(null);
  const { roomSize, halfRoomSize } = useGallery();

  // Load textures on component mount
  useEffect(() => {
    const texture = loadTexture("/textures/marble_floor.jpg", [12, 12]);

    // Enhance the texture for better quality
    if (texture) {
      texture.anisotropy = 16; // Improves texture quality at angles
    }

    setFloorTexture(texture);

    // Cleanup
    return () => {
      if (floorTexture) floorTexture.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove floorTexture as dependency to avoid infinite loop

  // Organize images into categories for different walls
  const distributeImages = () => {
    // If no images, return empty sets
    if (!images || images.length === 0) {
      return { north: [], east: [], south: [], west: [] };
    }

    // Total number of walls and images
    const totalWalls = 4;
    const totalImages = images.length;

    // Base images per wall - ensure even distribution
    const baseImagesPerWall = Math.floor(totalImages / totalWalls);

    // Calculate remainder to distribute
    const remainingImages = totalImages % totalWalls;

    // Calculate how many images each wall should get
    const northCount = baseImagesPerWall + (remainingImages > 0 ? 1 : 0);
    const eastCount = baseImagesPerWall + (remainingImages > 1 ? 1 : 0);
    const southCount = baseImagesPerWall + (remainingImages > 2 ? 1 : 0);
    const westCount = baseImagesPerWall;

    // Create image sets with even distribution
    let currentIndex = 0;

    // Create balanced image sets
    const imageSets = {
      north: images.slice(currentIndex, (currentIndex += northCount)),
      east: images.slice(currentIndex, (currentIndex += eastCount)),
      south: images.slice(currentIndex, (currentIndex += southCount)),
      west: images.slice(currentIndex, (currentIndex += westCount)),
    };

    return imageSets;
  };

  // Calculate room dimensions
  const imageSets = distributeImages();
  const wallHeight = 4.5;

  return (
    <group>
      {/* Basketball court floor */}
      <FloorTiles size={roomSize} textureType="basketball" />

      {/* Architectural Ceiling/Roof with white color scheme */}
      <group position={[0, wallHeight, 0]}>
        {/* Main flat ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.85} />
        </mesh>

        {/* Decorative ceiling borders */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[roomSize - 1, 0.1, roomSize - 1]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
        </mesh>

        {/* Decorative border beams */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[roomSize - 3, 0.2, roomSize - 3]} />
          <meshStandardMaterial color="#EEEEEE" roughness={0.8} />
        </mesh>

        {/* Center roof structure */}
        <group position={[0, 0, 0]}>
          {/* Center square */}
          <mesh position={[0, 0.3, 0]} receiveShadow>
            <boxGeometry args={[roomSize / 3, 0.3, roomSize / 3]} />
            <meshStandardMaterial color="#E0E0E0" roughness={0.7} />
          </mesh>

          {/* Raised center */}
          <mesh position={[0, 0.6, 0]} receiveShadow>
            <boxGeometry args={[roomSize / 4, 0.6, roomSize / 4]} />
            <meshStandardMaterial color="#FAFAFA" roughness={0.7} />
          </mesh>

          {/* Roof peak */}
          <mesh position={[0, 1.2, 0]} receiveShadow>
            <cylinderGeometry args={[0, roomSize / 8, 1.2, 4, 1]} />
            <meshStandardMaterial
              color="#FFFFFF"
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        </group>

        {/* Add beams connecting to the corners */}
        <mesh
          position={[roomSize / 6, 0.15, roomSize / 6]}
          rotation={[0, Math.PI / 4, 0]}
          receiveShadow
        >
          <boxGeometry args={[roomSize / 4, 0.2, 0.3]} />
          <meshStandardMaterial color="#F0F0F0" roughness={0.8} />
        </mesh>

        <mesh
          position={[-roomSize / 6, 0.15, roomSize / 6]}
          rotation={[0, -Math.PI / 4, 0]}
          receiveShadow
        >
          <boxGeometry args={[roomSize / 4, 0.2, 0.3]} />
          <meshStandardMaterial color="#F0F0F0" roughness={0.8} />
        </mesh>

        <mesh
          position={[roomSize / 6, 0.15, -roomSize / 6]}
          rotation={[0, -Math.PI / 4, 0]}
          receiveShadow
        >
          <boxGeometry args={[roomSize / 4, 0.2, 0.3]} />
          <meshStandardMaterial color="#F0F0F0" roughness={0.8} />
        </mesh>

        <mesh
          position={[-roomSize / 6, 0.15, -roomSize / 6]}
          rotation={[0, Math.PI / 4, 0]}
          receiveShadow
        >
          <boxGeometry args={[roomSize / 4, 0.2, 0.3]} />
          <meshStandardMaterial color="#F0F0F0" roughness={0.8} />
        </mesh>
      </group>

      {/* North Wall */}
      <Wall
        position={[0, wallHeight / 2, -halfRoomSize]}
        rotation={[0, 0, 0]}
        width={roomSize}
        height={wallHeight}
        images={imageSets.north}
      />

      {/* East Wall */}
      <Wall
        position={[halfRoomSize, wallHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={roomSize}
        height={wallHeight}
        images={imageSets.east}
      />

      {/* South Wall */}
      <Wall
        position={[0, wallHeight / 2, halfRoomSize]}
        rotation={[0, Math.PI, 0]}
        width={roomSize}
        height={wallHeight}
        images={imageSets.south}
      />

      {/* West Wall */}
      <Wall
        position={[-halfRoomSize, wallHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={roomSize}
        height={wallHeight}
        images={imageSets.west}
      />
    </group>
  );
};

export default Room;
