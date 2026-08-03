"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, OrbitControls, ContactShadows, Environment } from "@react-three/drei";

// Real WebGL scene (Three.js via React Three Fiber + drei), matching the
// live site's stack: a rounded-box two-part case with an animated hinged
// lid, OrbitControls for drag-to-rotate, and the same
// ambient/directional/point light rig confirmed in the live bundle —
// not a CSS mockup.
function CaseModel({ lidColor, bodyColor, open, autoRotate }) {
  const lidPivotRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
    if (lidPivotRef.current) {
      const target = open ? -2.05 : 0;
      lidPivotRef.current.rotation.x += (target - lidPivotRef.current.rotation.x) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[2.2, 0.85, 1.3]} radius={0.16} smoothness={4} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.08} />
      </RoundedBox>

      {/* Lid pivots around its back edge so "open" reads as a real hinge */}
      <group position={[0, 0.28, -0.62]} ref={lidPivotRef}>
        <RoundedBox args={[2.3, 0.62, 1.34]} radius={0.2} smoothness={4} position={[0, 0.02, 0.62]} castShadow>
          <meshStandardMaterial color={lidColor} roughness={0.32} metalness={0.08} />
        </RoundedBox>
      </group>
    </group>
  );
}

export default function KitCase3D({
  lidColor = "#0d9488",
  bodyColor = "#0a1828",
  open = false,
  autoRotate = true,
  interactive = true,
  height = 380,
}) {
  return (
    <div style={{ width: "100%", height }}>
      <Canvas camera={{ position: [3.4, 2.3, 3.8], fov: 32 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={1.15} castShadow />
        <pointLight position={[-4, 2, -3]} intensity={0.3} />
        <Suspense fallback={null}>
          <CaseModel lidColor={lidColor} bodyColor={bodyColor} open={open} autoRotate={autoRotate} />
          <ContactShadows position={[0, -0.64, 0]} opacity={0.4} scale={6} blur={2.6} far={2} />
          <Environment preset="city" />
        </Suspense>
        {interactive && <OrbitControls enablePan={false} enableZoom={interactive} minDistance={3} maxDistance={7} />}
      </Canvas>
    </div>
  );
}
