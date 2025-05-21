import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader, Group } from "three";
import { useSpring, a } from "@react-spring/three";
import ParticleRing from "./Ring";

type GlobeProps = {
  targetPosition: [number, number, number];
};

const Globe = ({ targetPosition }: GlobeProps) => {
  const globeRef = useRef<Group>(null!);
  const texture = useLoader(TextureLoader, "/textures/globe_zm.jpg");

  const [isRotating, setIsRotating] = useState(true);

  // Animate to the new position
  const { position } = useSpring({
    position: targetPosition,
    config: { mass: 1, tension: 170, friction: 26 },
    onRest: () => setIsRotating(false),
  });

  useFrame(({ clock }) => {
    if (isRotating && globeRef.current) {
      globeRef.current.rotation.y = clock.elapsedTime / 4;
    }
  });

  return (
    <a.group position={position} rotation={[0.4, 0, 0]} scale={1.75}>
      <mesh position={[0, 0, 0]} scale={1.75} ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <ParticleRing />
    </a.group>
  );
};

export default Globe;
