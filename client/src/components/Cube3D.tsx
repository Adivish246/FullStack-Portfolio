import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Cube3D() {
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cubeContainerRef.current) return;
    
    const size = 100;
    const faces = [
      { transform: `translateZ(${size/2}px)`, color: '#8a2be2' },
      { transform: `rotateY(180deg) translateZ(${size/2}px)`, color: '#00ffff' },
      { transform: `rotateY(90deg) translateZ(${size/2}px)`, color: '#39ff14' },
      { transform: `rotateY(-90deg) translateZ(${size/2}px)`, color: '#8a2be2' },
      { transform: `rotateX(90deg) translateZ(${size/2}px)`, color: '#00ffff' },
      { transform: `rotateX(-90deg) translateZ(${size/2}px)`, color: '#39ff14' }
    ];
    
    // Clear existing faces if any
    while (cubeContainerRef.current.firstChild) {
      cubeContainerRef.current.removeChild(cubeContainerRef.current.firstChild);
    }
    
    // Create cube faces
    faces.forEach(face => {
      const elem = document.createElement('div');
      elem.style.position = 'absolute';
      elem.style.width = `${size}px`;
      elem.style.height = `${size}px`;
      elem.style.background = face.color;
      elem.style.opacity = '0.7';
      elem.style.transform = face.transform;
      elem.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      cubeContainerRef.current?.appendChild(elem);
    });
    
    // Animate the cube rotation
    gsap.to(cubeContainerRef.current, {
      rotationY: 360,
      rotationX: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
    
    return () => {
      gsap.killTweensOf(cubeContainerRef.current);
    };
  }, []);
  
  return (
    <div
      ref={cubeContainerRef}
      className="w-40 h-40 relative"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Cube faces will be added here dynamically */}
    </div>
  );
}
