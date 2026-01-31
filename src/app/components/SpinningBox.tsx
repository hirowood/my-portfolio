'use client';

import { useRef, useState } from 'react';
// ★ ThreeElements を追加でインポート
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Mesh } from 'three';

// 1. 立方体（Box）を作る部品
// ★ propsの型を any から ThreeElements['mesh'] に変更
function Box(props: ThreeElements['mesh']) {
  // 3Dモデルを操作するための「参照」
  const meshRef = useRef<Mesh>(null!);
  
  // マウスが乗ったかどうかの状態
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // 1秒間に60回実行される関数
  useFrame((state, delta) => {
    // x軸（横）とy軸（縦）に少しずつ回転させる
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1} // クリックすると大きくなる
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* 形：箱型 (幅, 高さ, 奥行き) */}
      <boxGeometry args={[1, 1, 1]} />
      {/* 色・質感：スタンダードな素材 */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

// 2. 3Dシーン全体をまとめる部品
export default function Scene() {
  return (
    <div className="h-[300px] w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <Canvas>
        {/* ライト（照明）を設定 */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {/* さっき作ったBoxを配置 */}
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}