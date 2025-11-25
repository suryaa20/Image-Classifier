import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      boxGeometry: Object3DNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      planeGeometry: Object3DNode<
        THREE.PlaneGeometry,
        typeof THREE.PlaneGeometry
      >;
      meshStandardMaterial: Object3DNode<
        THREE.MeshStandardMaterial,
        typeof THREE.MeshStandardMaterial
      >;
      directionalLight: Object3DNode<
        THREE.DirectionalLight,
        typeof THREE.DirectionalLight
      >;
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      fog: Object3DNode<THREE.Fog, typeof THREE.Fog>;
    }
  }
}
