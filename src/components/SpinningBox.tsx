'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls, Sparkles, Float } from '@react-three/drei';

function SpinningShape(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    // ★ここを変更：回転スピードを極限まで落としました
    // これにより「回っている」というより「漂っている」感じになります
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.2 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
      <meshStandardMaterial 
        color={hovered ? 'cyan' : '#646cff'} 
        roughness={0.1} 
        metalness={0.6} 
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="h-[400px] w-full bg-gray-950 rounded-xl border border-gray-700 overflow-hidden relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <OrbitControls enableZoom={true} />

        {/* 星の設定はそのまま（OKいただいた設定） */}
        <Sparkles 
          count={200}        
          scale={[10, 10, 10]} 
          size={2}           
          speed={0.4}        
          opacity={0.7}      
          noise={0.5}        
          color="#ffffff"    
        />
        <Sparkles 
          count={500} 
          scale={[20, 20, 20]} 
          size={1} 
          speed={0.2} 
          opacity={0.4} 
          color="#aaddff" 
        />

        {/* ★ここを変更：優雅な浮遊設定 */}
        {/* speedを下げて(ゆっくり)、floatIntensityを上げる(大きく揺れる) */}
        
        {/* メインの物体 */}
        <Float 
          speed={1.5}           // 1.5秒周期（ゆっくり）
          rotationIntensity={0.5} // あまり傾かないように
          floatIntensity={2}      // 上下にゆったり大きく動く
          floatingRange={[-0.5, 0.5]} // 浮く範囲
        >
          <SpinningShape position={[0, 0, 0]} />
        </Float>

        {/* 背景の物体1 */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.5}>
          <SpinningShape position={[-2, -1, -2]} scale={0.5} />
        </Float>
        
        {/* 背景の物体2 */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.8}>
          <SpinningShape position={[2, 1, -3]} scale={0.5} />
        </Float>

      </Canvas>
      
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 pointer-events-none">
        Drag to Rotate / Scroll to Zoom
      </div>
    </div>
  );
}