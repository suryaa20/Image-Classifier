import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, SpotLight } from "@react-three/drei";
import Room from "./Room";
import Player from "./Player";
import { useImageData } from "../hooks/useImageData";
import Crosshair from "./Crosshair";
import { GalleryProvider } from "../context/GalleryContext";
import { useGallery } from "../context/GalleryContext";

// Component that has access to the gallery context
const GalleryScene: React.FC<{ images: any[] }> = ({ images }) => {
  const { roomSize, halfRoomSize } = useGallery();

  return (
    <>
      {/* Improved fog for depth perception */}
      <fog attach="fog" args={["#1a1a1a", roomSize * 0.4, roomSize * 1.2]} />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />

      {/* Main directional light (simulates sun through skylight) */}
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-halfRoomSize}
        shadow-camera-right={halfRoomSize}
        shadow-camera-top={halfRoomSize}
        shadow-camera-bottom={-halfRoomSize}
      />

      {/* Spotlights for walls - one for each wall */}
      <SpotLight
        position={[0, 3, halfRoomSize * 0.6]}
        angle={0.6}
        distance={roomSize}
        intensity={1.5}
        color="#fff6e3"
        penumbra={0.5}
        castShadow
        target-position={[0, 1.5, -halfRoomSize]}
      />

      <SpotLight
        position={[-halfRoomSize * 0.6, 3, 0]}
        angle={0.6}
        distance={roomSize}
        intensity={1.5}
        color="#fff6e3"
        penumbra={0.5}
        castShadow
        target-position={[halfRoomSize, 1.5, 0]}
      />

      <SpotLight
        position={[0, 3, -halfRoomSize * 0.6]}
        angle={0.6}
        distance={roomSize}
        intensity={1.5}
        color="#fff6e3"
        penumbra={0.5}
        castShadow
        target-position={[0, 1.5, halfRoomSize]}
      />

      <SpotLight
        position={[halfRoomSize * 0.6, 3, 0]}
        angle={0.6}
        distance={roomSize}
        intensity={1.5}
        color="#fff6e3"
        penumbra={0.5}
        castShadow
        target-position={[-halfRoomSize, 1.5, 0]}
      />

      <Player />
      <Room images={images} />
      <OrbitControls enabled={false} />
      <Stats />
    </>
  );
};

const VirtualGallery: React.FC = () => {
  const { images, loading, error } = useImageData();

  if (loading) return <div>Loading gallery assets...</div>;
  if (error) return <div>Error loading images: {error}</div>;

  return (
    <GalleryProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 70 }}>
          <GalleryScene images={images} />
        </Canvas>
        <Crosshair />

        {/* Instructions overlay - moved from App.tsx for simplicity */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
          }}
        >
          <p style={{ margin: "0 0 5px 0" }}>
            WASD: Move | Mouse: Look | Shift: Run
          </p>
          <p style={{ margin: "0" }}>Click on artwork to view details</p>
        </div>
      </div>
    </GalleryProvider>
  );
};

export default VirtualGallery;
