"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

export function GlitchVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Basic geometry
    const geometry = new THREE.IcosahedronGeometry(10, 2);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#42efdf"),
      roughness: 0.3,
      metalness: 1,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xff00ff, 1, 200);
    pointLight.position.set(30, 50, 30);
    scene.add(ambientLight, pointLight);

    camera.position.z = 40;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Postprocessing with glitch
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const glitchPass = new GlitchPass();
    glitchPass.goWild = true; // agresivo
    composer.addPass(glitchPass);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      controls.update();
      composer.render();
    };
    animate();

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
  ref={containerRef}
  className="w-full max-w-[400px] min-w-[300px] h-[300px] bg-black rounded-xl border border-[#42efdf] shadow-[0_0_30px_#42efdf] overflow-hidden"
/>
  );
}
