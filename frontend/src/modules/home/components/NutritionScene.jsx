import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'

function Fruit({ color, position, scale = 1, type = 'apple' }) {
  const group = useRef()
  useFrame((state) => { if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.22 })
  return <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}><group ref={group} position={position} scale={scale}>
    <mesh castShadow><sphereGeometry args={type === 'orange' ? [0.72, 32, 32] : [0.78, 32, 32]}/><meshStandardMaterial color={color} roughness={0.62}/></mesh>
    {type === 'apple' && <mesh position={[0.13, .78, 0]} rotation={[0, .5, -.45]}><sphereGeometry args={[.22, 20, 20]}/><meshStandardMaterial color="#6d973c" roughness={.75}/></mesh>}
    <mesh position={[0, .82, 0]}><cylinderGeometry args={[.045,.06,.32,10]}/><meshStandardMaterial color="#5d3c24"/></mesh>
  </group></Float>
}

function Bowl() { return <group position={[0,-1.15,0]}><mesh receiveShadow rotation={[0,0,Math.PI]}><coneGeometry args={[1.75,.78,48,1,true]}/><meshStandardMaterial color="#f8efe0" roughness={.48} side={2}/></mesh><mesh position={[0,-.4,0]}><cylinderGeometry args={[.7,.92,.12,48]}/><meshStandardMaterial color="#d87b49" roughness={.55}/></mesh></group> }

function Scene() { return <><ambientLight intensity={1.6}/><directionalLight position={[3,5,4]} intensity={2.1} castShadow/><pointLight position={[-4,1,3]} color="#f4b183" intensity={3}/><Bowl/><Fruit color="#d95f4d" position={[-.75,-.25,.2]} scale={.9}/><Fruit color="#f2a53a" position={[.72,-.32,.05]} scale={.82} type="orange"/><Fruit color="#83a851" position={[0,.48,-.1]} scale={.74}/></> }

function NutritionScene() {
  const [enabled] = useState(() => typeof window !== 'undefined' && typeof window.WebGLRenderingContext !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (!enabled) return <div className="hero-3d-fallback" role="img" aria-label="Composición de frutas frescas"><span>🍎</span><span>🍊</span><span>🥬</span></div>
  return <div className="hero-3d" aria-label="Composición interactiva de frutas frescas"><Canvas shadows dpr={[1,1.5]} camera={{ position:[0,0,5], fov:42 }} fallback={<div className="hero-3d-fallback">🍎 🍊 🥬</div>}><Suspense fallback={null}><Scene/><OrbitControls enablePan={false} enableZoom={false} enableDamping autoRotate autoRotateSpeed={.7}/></Suspense></Canvas><span className="hero-3d__hint">Arrastra para explorar</span></div>
}
export default NutritionScene
