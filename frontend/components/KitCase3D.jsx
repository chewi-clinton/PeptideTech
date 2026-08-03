"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { STLLoader } from "three-stdlib";

// Real case geometry pulled directly from the live site's own
// build-a-kit STL export (public/models/kit-body.stl, kit-lid.stl) —
// the exact body (with interior vial bays) and lid meshes, not a
// procedural approximation.
const MODEL_SCALE = 0.012;

function useCenteredGeometry(geometry, flip = false) {
  return useMemo(() => {
    const geo = geometry.clone();
    // Source STL is Z-up (CAD convention); rotate into three.js's Y-up.
    geo.rotateX(-Math.PI / 2);
    // The lid ships in print orientation (cavity facing up); flip it so
    // it closes cavity-down over the body, matching real assembly.
    if (flip) geo.rotateX(Math.PI);
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    geo.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    geo.computeBoundingBox();
    geo.computeVertexNormals();
    return geo;
  }, [geometry, flip]);
}

function CaseModel({ bodyGeometry, lidGeometry, lidColor, bodyColor, open, autoRotate }) {
  const groupRef = useRef();
  const lidPivotRef = useRef();

  const { bodyHeight, lidHeight, halfDepth, halfTotal } = useMemo(() => {
    bodyGeometry.computeBoundingBox();
    lidGeometry.computeBoundingBox();
    const bodyBB = bodyGeometry.boundingBox;
    const lidBB = lidGeometry.boundingBox;
    const bh = bodyBB.max.y - bodyBB.min.y;
    const lh = lidBB.max.y - lidBB.min.y;
    return {
      bodyHeight: bh,
      lidHeight: lh,
      halfDepth: (bodyBB.max.z - bodyBB.min.z) / 2,
      halfTotal: (bh + lh) / 2,
    };
  }, [bodyGeometry, lidGeometry]);

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
    <group ref={groupRef} scale={MODEL_SCALE}>
      <mesh geometry={bodyGeometry} position={[0, -halfTotal, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.08} />
      </mesh>

      {/* Lid pivots around its real back edge so "open" is a true hinge */}
      <group position={[0, -halfTotal + bodyHeight, -halfDepth]} ref={lidPivotRef}>
        <mesh geometry={lidGeometry} position={[0, 0, halfDepth]} castShadow>
          <meshStandardMaterial color={lidColor} roughness={0.32} metalness={0.08} />
        </mesh>
      </group>
    </group>
  );
}

function CaseModelLoader(props) {
  const [rawBody, rawLid] = useLoader(STLLoader, ["/models/kit-body.stl", "/models/kit-lid.stl"]);
  const bodyGeometry = useCenteredGeometry(rawBody);
  const lidGeometry = useCenteredGeometry(rawLid, true);
  return <CaseModel bodyGeometry={bodyGeometry} lidGeometry={lidGeometry} {...props} />;
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
          <CaseModelLoader lidColor={lidColor} bodyColor={bodyColor} open={open} autoRotate={autoRotate} />
          <ContactShadows position={[0, -0.45, 0]} opacity={0.4} scale={6} blur={2.6} far={2} />
          <Environment preset="city" />
        </Suspense>
        {interactive && <OrbitControls enablePan={false} enableZoom={interactive} minDistance={3} maxDistance={7} />}
      </Canvas>
    </div>
  );
}
