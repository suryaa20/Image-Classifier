import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { PointerLockControls } from "@react-three/drei";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useGallery } from "../context/GalleryContext";

const MOVEMENT_SPEED = 0.1;
const RUN_MULTIPLIER = 2;

const Player: React.FC = () => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const { forward, backward, left, right, run, isLocked, setIsLocked } =
    useKeyboardControls();
  const { roomSize, halfRoomSize } = useGallery();

  // Allow player to get closer to the walls - adjust the margin as room size increases
  // This scales the margin with the room size to get closer to walls in larger rooms
  const baseWallMargin = 1.2; // Base margin for standard room size
  const scaleFactor = 20 / roomSize; // Reduce margin as room size increases
  const wallMargin = Math.max(0.8, baseWallMargin * scaleFactor); // Don't go below 0.8 units
  const roomLimit = halfRoomSize - wallMargin;

  // Set up player properties
  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1.6, 0); // 1.6 meters ~ average human height

    const onLock = () => setIsLocked(true);
    const onUnlock = () => setIsLocked(false);

    document.addEventListener("click", () => {
      if (!isLocked && controlsRef.current) {
        controlsRef.current.lock();
      }
    });

    // Capture the ref value to address the exhaustive-deps warning
    const controls = controlsRef.current;

    if (controls) {
      controls.addEventListener("lock", onLock);
      controls.addEventListener("unlock", onUnlock);
    }

    return () => {
      if (controls) {
        controls.removeEventListener("lock", onLock);
        controls.removeEventListener("unlock", onUnlock);
      }
    };
  }, [camera, isLocked, setIsLocked]);

  // Update player movement
  useFrame(() => {
    if (!isLocked) return;

    // Speed calculation
    const speed = run ? MOVEMENT_SPEED * RUN_MULTIPLIER : MOVEMENT_SPEED;

    // Calculate forward/backward direction vector from camera
    const directionForward = new Vector3(0, 0, -1).applyQuaternion(
      camera.quaternion
    );
    directionForward.y = 0; // Keep movement on xz plane
    directionForward.normalize();

    // Calculate right/left direction vector from camera (perpendicular to forward)
    const directionRight = new Vector3(1, 0, 0).applyQuaternion(
      camera.quaternion
    );
    directionRight.y = 0; // Keep movement on xz plane
    directionRight.normalize();

    // Calculate movement based on key states and directions
    const movement = new Vector3(0, 0, 0);

    if (forward) {
      movement.add(directionForward.clone().multiplyScalar(speed));
    }

    if (backward) {
      movement.add(directionForward.clone().multiplyScalar(-speed));
    }

    if (right) {
      movement.add(directionRight.clone().multiplyScalar(speed));
    }

    if (left) {
      movement.add(directionRight.clone().multiplyScalar(-speed));
    }

    // Apply movement if we're moving
    if (movement.lengthSq() > 0) {
      const potentialX = camera.position.x + movement.x;
      const potentialZ = camera.position.z + movement.z;

      // Only update if within calculated boundaries
      if (Math.abs(potentialX) < roomLimit) {
        camera.position.x = potentialX;
      }

      if (Math.abs(potentialZ) < roomLimit) {
        camera.position.z = potentialZ;
      }
    }
  });

  return <PointerLockControls ref={controlsRef} />;
};

export default Player;
