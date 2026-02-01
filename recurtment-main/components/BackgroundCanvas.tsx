
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export const BackgroundCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 1. Neural Net Particles (Enhanced)
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 60;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00FF00,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 2. Infinite Scrolling Grid
    const gridSize = 100;
    const gridDivisions = 40;
    const grid = new THREE.GridHelper(gridSize, gridDivisions, 0x00FFFF, 0x111111);
    grid.position.y = -10;
    grid.material.transparent = true;
    grid.material.opacity = 0.2;
    scene.add(grid);

    // 3. Floating Neon Voxels (Enhanced)
    const voxelGroup = new THREE.Group();
    const cubeGeom = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    for(let i=0; i<80; i++) {
        const color = Math.random() > 0.5 ? 0xFF00FF : 0x00FFFF;
        const cubeMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5 });
        const cube = new THREE.Mesh(cubeGeom, cubeMat);
        cube.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
        cube.userData = {
          speedX: (Math.random() - 0.5) * 0.02,
          speedY: (Math.random() - 0.5) * 0.02,
          speedZ: (Math.random() - 0.5) * 0.02
        };
        voxelGroup.add(cube);
    }
    scene.add(voxelGroup);

    // 4. Random Line Clusters (Cyber Weaving)
    const linesGroup = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const linePoints = [];
      const start = new THREE.Vector3((Math.random()-0.5)*30, (Math.random()-0.5)*30, (Math.random()-0.5)*30);
      linePoints.push(start);
      linePoints.push(new THREE.Vector3(start.x + (Math.random()-0.5)*10, start.y + (Math.random()-0.5)*10, start.z + (Math.random()-0.5)*10));
      
      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.3 });
      const line = new THREE.Line(lineGeom, lineMat);
      linesGroup.add(line);
    }
    scene.add(linesGroup);

    camera.position.z = 15;

    // Animation variables
    let time = 0;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate Particles
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      
      // Infinite Grid Scroll Effect
      grid.position.z = (time * 10) % (gridSize / gridDivisions);
      
      // Dynamic Voxel Motion
      voxelGroup.children.forEach((child) => {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
          child.position.x += child.userData.speedX;
          child.position.y += child.userData.speedY;
          child.position.z += child.userData.speedZ;

          // Boundary Reset
          if (Math.abs(child.position.x) > 30) child.position.x *= -0.9;
          if (Math.abs(child.position.y) > 30) child.position.y *= -0.9;
          if (Math.abs(child.position.z) > 30) child.position.z *= -0.9;
      });

      // Subtle Camera "Digital Shake"
      camera.position.x += Math.sin(time * 2) * 0.005;
      camera.position.y += Math.cos(time * 2) * 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Scroll Interactivity
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / h;
      
      gsap.to(camera.position, {
        z: 15 + progress * 20,
        y: -progress * 10,
        duration: 1,
        ease: 'power2.out'
      });
      
      gsap.to(particles.rotation, {
          y: progress * Math.PI,
          duration: 1.5
      });

      gsap.to(grid.rotation, {
          x: progress * 0.5,
          duration: 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};
