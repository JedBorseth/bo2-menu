import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader, type Group } from "three";

import ParticleRing from "./Ring";

const Globe = () => {
  const globeRef = useRef<Group>(null!);
  const texture = useLoader(TextureLoader, "/textures/globe_zm.jpg");

  useFrame(({ clock }) => {
    globeRef.current.rotation.y = clock.elapsedTime / 4;
  });
  return (
    <group position={[-4, -1, 1]} rotation={[0.4, 0, 0]} scale={1.75}>
      <mesh position={[0, 0, 0]} scale={1.75} ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Ring of rocks */}
      <ParticleRing />
    </group>
  );
};

export default Globe;
