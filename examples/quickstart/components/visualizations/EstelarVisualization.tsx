"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export function EstelarVisualization() {
  return (
    <div
      className="w-full h-95 bg-black rounded-xl border border-[#42efdf] shadow-[0_0_30px_#42efdf]"
      style={{
        maxWidth: "400px", // evita que se expanda demasiado
        minWidth: "300px", // tamaño mínimo visual
        height: "300px", // altura fija
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100} // Tamaño de la esfera donde se colocan las estrellas
          depth={50} // Qué tan profundo es el espacio
          count={5000} // Número de estrellas
          factor={4} // Tamaño de las estrellas
          saturation={0} // Blanco y negro
          fade
          speed={1} // Velocidad de rotación
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
