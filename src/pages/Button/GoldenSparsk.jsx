import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GoldenSparksAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("none");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    const nutrientParticles = createParticles("#B8860B");
    nutrientParticles.position.x = -1;
    scene.add(nutrientParticles);

    const diseaseParticles = createParticles("#FFBF00");
    scene.add(diseaseParticles);

    const soilParticles = createParticles("#FFD700");
    soilParticles.position.x = 1;
    scene.add(soilParticles);

    let time = 0;

    function animate() {
      requestAnimationFrame(animate);

      // Nutrient Cycling Animation
      nutrientParticles.rotation.x += 0.01;
      nutrientParticles.rotation.y += 0.01;

      // Disease Suppression Animation
      diseaseParticles.scale.x = 1 + 0.3 * Math.sin(time * 2);
      diseaseParticles.scale.y = 1 + 0.3 * Math.sin(time * 2);
      diseaseParticles.scale.z = 1 + 0.3 * Math.sin(time * 2);

      // Soil Structure Formation Animation
      soilParticles.position.y = 0.6 * Math.sin(time * 3);

      renderer.render(scene, camera);
      time += 0.01;
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement); // Remove from the container

      scene.remove(nutrientParticles);
      scene.remove(diseaseParticles);
      scene.remove(soilParticles);
      renderer.dispose();
    };
  }, []);

  function createParticles(color) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 200; i++) {
      vertices.push((Math.random() - 0.5) * 6);
      vertices.push((Math.random() - 0.5) * 6);
      vertices.push((Math.random() - 0.5) * 6);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: color, size: 0.1 });
    return new THREE.Points(geometry, material);
  }

  return (
    <div ref={containerRef}></div> // Use the container for the renderer
  );
}
