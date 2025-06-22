import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

const BotModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const armRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
    
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bot Head */}
      <Box ref={headRef} args={[1, 1, 1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#3B82F6" />
      </Box>
      
      {/* Bot Eyes */}
      <Sphere args={[0.1]} position={[-0.2, 1.6, 0.5]}>
        <meshStandardMaterial color="#10B981" />
      </Sphere>
      <Sphere args={[0.1]} position={[0.2, 1.6, 0.5]}>
        <meshStandardMaterial color="#10B981" />
      </Sphere>
      
      {/* Bot Body */}
      <Box args={[1.2, 1.5, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#6366F1" />
      </Box>
      
      {/* Bot Arms */}
      <group ref={armRef}>
        <Box args={[0.3, 1, 0.3]} position={[-0.8, 0.5, 0]}>
          <meshStandardMaterial color="#8B5CF6" />
        </Box>
        <Box args={[0.3, 1, 0.3]} position={[0.8, 0.5, 0]}>
          <meshStandardMaterial color="#8B5CF6" />
        </Box>
      </group>
      
      {/* Bot Legs */}
      <Box args={[0.4, 1.2, 0.4]} position={[-0.3, -1.3, 0]}>
        <meshStandardMaterial color="#8B5CF6" />
      </Box>
      <Box args={[0.4, 1.2, 0.4]} position={[0.3, -1.3, 0]}>
        <meshStandardMaterial color="#8B5CF6" />
      </Box>
      
      {/* Floating Text */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to Bolt.new!
      </Text>
    </group>
  );
};

const FloatingBot: React.FC = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        <BotModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default FloatingBot;