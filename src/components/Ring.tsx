import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector3, Euler, TextureLoader, type Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const Ring = () => {
  const rockCount = 250;
  const minRadius = 2.8;
  const maxRadius = 3.5;
  const groupRef = useRef<Group>(null!);
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.elapsedTime / 12;
  });

  const rocks = useMemo(() => {
    const shapes = [
      "sphere",
      "box",
      "dodecahedron",
      "cone",
      "tetrahedron",
      "cylinder",
    ];

    return Array.from({ length: rockCount }, (_, i) => {
      const angle = (i / rockCount) * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.3;

      return {
        position: new Vector3(x, y, z),
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        scale: 0.05 + Math.random() * 0.03,
        rotation: new Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
      };
    });
  }, [rockCount]);
  const texture = useLoader(TextureLoader, "/textures/rock.jpeg");

  const material = useMemo(
    () => <meshStandardMaterial map={texture} />,
    [texture]
  );
  return (
    <group ref={groupRef} position={[0, 1, 0]} rotation={[degToRad(5), 0, 0]}>
      {rocks.map((rock, index) => {
        const commonProps = {
          position: rock.position.toArray(),
          scale: rock.scale,
          rotation: rock.rotation,
        };

        switch (rock.shape) {
          case "box":
            return (
              <mesh key={index} {...commonProps}>
                <boxGeometry args={[1, 1, 1]} />
                {material}
              </mesh>
            );
          case "dodecahedron":
            return (
              <mesh key={index} {...commonProps}>
                <dodecahedronGeometry args={[1, 0]} />
                {material}
              </mesh>
            );
          case "cone":
            return (
              <mesh key={index} {...commonProps}>
                <coneGeometry args={[1, 1, 8]} />
                {material}
              </mesh>
            );
          case "tetrahedron":
            return (
              <mesh key={index} {...commonProps}>
                <tetrahedronGeometry args={[1, 0]} />
                {material}
              </mesh>
            );
          case "cylinder":
            return (
              <mesh key={index} {...commonProps}>
                <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
                {material}
              </mesh>
            );
          case "sphere":
          default:
            return (
              <mesh key={index} {...commonProps}>
                <sphereGeometry args={[1, 8, 8]} />
                {material}
              </mesh>
            );
        }
      })}
    </group>
  );
};

export default Ring;
