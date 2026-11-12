"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-bleed WebGL 3D topological wave + architectural room depth canvas.
 * Renders crisp slate/indigo waves on light backgrounds and luminous accents in dark mode.
 */
export default function HeroSpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 720;

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(0, 3.6, 10.5);
      camera.lookAt(0, 0.2, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // 1. 3D Undulating Wave Floor Mesh (Wireframe + Subtle Vertex Points)
      const planeWidth = 28;
      const planeDepth = 18;
      const segW = 64;
      const segD = 42;
      const waveGeo = new THREE.PlaneGeometry(planeWidth, planeDepth, segW, segD);
      waveGeo.rotateX(-Math.PI / 2);

      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const basePositions = new Float32Array(posAttr.array.length);
      basePositions.set(posAttr.array);

      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      });
      const waveMesh = new THREE.Mesh(waveGeo, wireMat);
      waveMesh.position.y = -1.6;
      scene.add(waveMesh);

      // Floating glowing vertex crest points along the wave
      const pointsMat = new THREE.PointsMaterial({
        color: 0x4f46e5,
        size: 0.055,
        transparent: true,
        opacity: 0.36,
      });
      const wavePoints = new THREE.Points(waveGeo, pointsMat);
      wavePoints.position.y = -1.58;
      scene.add(wavePoints);

      // 2. Architectural 3D Ceiling/Room Horizon Grid (Gives subtle 3D room depth)
      const ceilingGeo = new THREE.PlaneGeometry(28, 16, 18, 10);
      ceilingGeo.rotateX(Math.PI / 2);
      const ceilingMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
      ceilingMesh.position.set(0, 5.4, -2);
      scene.add(ceilingMesh);

      // 3. Flowing 3D Diagonal Ribbon Wave (Top-Right -> Bottom-Left)
      const ribbonGroup = new THREE.Group();
      const strandCount = 7;
      const strandPointsCount = 56;
      const strandColorsLight = [0x0ea5e9, 0x38bdf8, 0x6366f1, 0x818cf8, 0x14b8a6, 0x0284c7, 0x4f46e5];
      const strandColorsDark = [0x38bdf8, 0x7dd3fc, 0x818cf8, 0xa5b4fc, 0x2dd4bf, 0x60a5fa, 0x6366f1];

      interface RibbonStrand {
        line: THREE.Line;
        mat: THREE.LineBasicMaterial;
        baseOffset: number;
        phase: number;
        zDepth: number;
      }

      const strands: RibbonStrand[] = [];
      for (let s = 0; s < strandCount; s++) {
        const positions = new Float32Array(strandPointsCount * 3);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.LineBasicMaterial({
          color: strandColorsLight[s % strandColorsLight.length],
          transparent: true,
          opacity: s % 2 === 0 ? 0.34 : 0.22,
        });

        const line = new THREE.Line(geo, mat);
        ribbonGroup.add(line);
        strands.push({
          line,
          mat,
          baseOffset: (s - (strandCount - 1) / 2) * 0.32,
          phase: s * 0.55,
          zDepth: (s - 3) * 0.28,
        });
      }

      // Soft glowing pulse particles flowing top-right -> bottom-left along the ribbon
      const pulseCount = 24;
      const pulsePositions = new Float32Array(pulseCount * 3);
      const pulseGeo = new THREE.BufferGeometry();
      pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
      const pulseMat = new THREE.PointsMaterial({
        color: 0x0ea5e9,
        size: 0.14,
        transparent: true,
        opacity: 0.55,
      });
      const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
      ribbonGroup.add(pulsePoints);
      scene.add(ribbonGroup);

      // 4. Floating 3D Engineering Polyhedra (Desktop spatial markers)
      const shapesGroup = new THREE.Group();
      const octGeo = new THREE.OctahedronGeometry(0.45, 0);
      const octMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const icoGeo = new THREE.IcosahedronGeometry(0.32, 0);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      });

      const nodeA = new THREE.Mesh(octGeo, octMat);
      nodeA.position.set(-5.2, 2.2, -1.5);
      const nodeB = new THREE.Mesh(icoGeo, icoMat);
      nodeB.position.set(5.6, 2.7, -2.5);
      const nodeC = new THREE.Mesh(octGeo, octMat);
      nodeC.scale.setScalar(0.65);
      nodeC.position.set(0.4, 3.4, -4.2);

      shapesGroup.add(nodeA, nodeB, nodeC);
      scene.add(shapesGroup);

      // Theme sync helper
      const syncThemeColors = () => {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          wireMat.color.setHex(0x818cf8);
          wireMat.opacity = 0.16;
          pointsMat.color.setHex(0xa5b4fc);
          pointsMat.opacity = 0.42;
          ceilingMat.color.setHex(0x64748b);
          ceilingMat.opacity = 0.11;
          octMat.opacity = 0.28;
          icoMat.opacity = 0.28;
          pulseMat.color.setHex(0x38bdf8);
          pulseMat.opacity = 0.65;
          strands.forEach((st, idx) => {
            st.mat.color.setHex(strandColorsDark[idx % strandColorsDark.length]);
            st.mat.opacity = idx % 2 === 0 ? 0.38 : 0.24;
          });
        } else {
          wireMat.color.setHex(0x6366f1);
          wireMat.opacity = 0.1;
          pointsMat.color.setHex(0x4f46e5);
          pointsMat.opacity = 0.28;
          ceilingMat.color.setHex(0x94a3b8);
          ceilingMat.opacity = 0.08;
          octMat.opacity = 0.2;
          icoMat.opacity = 0.22;
          pulseMat.color.setHex(0x0284c7);
          pulseMat.opacity = 0.55;
          strands.forEach((st, idx) => {
            st.mat.color.setHex(strandColorsLight[idx % strandColorsLight.length]);
            st.mat.opacity = idx % 2 === 0 ? 0.34 : 0.22;
          });
        }
      };
      syncThemeColors();

      const themeObserver = new MutationObserver(syncThemeColors);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Mouse tracking for camera parallax & wave ripple
      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        pointer.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      const syncResponsiveLayout = () => {
        const isMobile = window.innerWidth < 768;
        waveMesh.position.y = isMobile ? -2.2 : -1.6;
        wavePoints.position.y = isMobile ? -2.18 : -1.58;
        shapesGroup.visible = !isMobile;
      };
      syncResponsiveLayout();

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 720;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        syncResponsiveLayout();
      };
      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();

      const evalRibbonPoint = (
        u: number,
        baseOffset: number,
        phase: number,
        zDepth: number,
        t: number,
        isMobile: boolean
      ): [number, number, number] => {
        // u = 0 (top-right) -> u = 1 (bottom-left)
        const spanX = isMobile ? 4.4 : 8.5;
        const xBase = spanX * (0.55 - u * 1.15);
        const yBase = 4.6 - u * 7.2;

        // S-curve + flowing wave displacement
        const sCurve = Math.sin(u * Math.PI * 1.65 + t * 0.9 + phase) * (isMobile ? 0.65 : 1.05);
        const secondaryWave = Math.cos(u * Math.PI * 3.1 - t * 1.1 + phase * 0.7) * 0.28;
        const spread = baseOffset * (0.75 + 0.45 * Math.sin(u * Math.PI + t * 0.5));

        const x = xBase + sCurve * 0.55 + spread;
        const y = yBase + secondaryWave + spread * 0.35;
        const z = zDepth + Math.cos(u * Math.PI * 2 + t * 0.8 + phase) * 0.85;
        return [x, y, z];
      };

      const animate = () => {
        const t = prefersReducedMotion ? 0 : clock.getElapsedTime();
        const isMobile = window.innerWidth < 768;

        pointer.x += (pointer.targetX - pointer.x) * 0.045;
        pointer.y += (pointer.targetY - pointer.y) * 0.045;

        // Displace wave floor vertices smoothly
        const arr = posAttr.array as Float32Array;
        const mouseWorldX = pointer.x * 7;
        const mouseWorldZ = pointer.y * 4;

        for (let i = 0; i < arr.length; i += 3) {
          const bx = basePositions[i];
          const bz = basePositions[i + 2];

          const wave1 = Math.sin(bx * 0.42 + t * 0.95) * 0.34;
          const wave2 = Math.cos(bz * 0.55 + t * 0.75) * 0.26;
          const wave3 = Math.sin((bx + bz) * 0.3 + t * 0.6) * 0.16;

          const dx = bx - mouseWorldX;
          const dz = bz - mouseWorldZ;
          const distSq = dx * dx + dz * dz;
          const ripple = Math.exp(-distSq * 0.08) * 0.42;

          arr[i + 1] = wave1 + wave2 + wave3 + ripple;
        }
        posAttr.needsUpdate = true;

        // Animate 3D diagonal ribbons flowing top-right -> bottom-left
        for (let s = 0; s < strands.length; s++) {
          const st = strands[s];
          const pos = st.line.geometry.attributes.position as THREE.BufferAttribute;
          const pArr = pos.array as Float32Array;
          for (let i = 0; i < strandPointsCount; i++) {
            const u = i / (strandPointsCount - 1);
            const [rx, ry, rz] = evalRibbonPoint(u, st.baseOffset, st.phase, st.zDepth, t, isMobile);
            pArr[i * 3] = rx;
            pArr[i * 3 + 1] = ry;
            pArr[i * 3 + 2] = rz;
          }
          pos.needsUpdate = true;
        }

        // Animate flowing energy particles traveling top-right -> bottom-left
        const pulseArr = pulseGeo.attributes.position as THREE.BufferAttribute;
        const pData = pulseArr.array as Float32Array;
        for (let p = 0; p < pulseCount; p++) {
          const strandIdx = p % strandCount;
          const st = strands[strandIdx];
          const speed = 0.16 + (strandIdx % 3) * 0.04;
          const u = ((t * speed + p / pulseCount) % 1 + 1) % 1;
          const [px, py, pz] = evalRibbonPoint(u, st.baseOffset, st.phase, st.zDepth, t, isMobile);
          pData[p * 3] = px;
          pData[p * 3 + 1] = py;
          pData[p * 3 + 2] = pz;
        }
        pulseArr.needsUpdate = true;

        // Subtle 3D room camera parallax
        camera.position.x = pointer.x * 0.85;
        camera.position.y = 3.6 - pointer.y * 0.35;
        camera.lookAt(0, 0.25, 0);

        // Rotate architectural polyhedra
        nodeA.rotation.x = t * 0.25;
        nodeA.rotation.y = t * 0.35;
        nodeA.position.y = 2.2 + Math.sin(t * 0.9) * 0.18;

        nodeB.rotation.x = -t * 0.2;
        nodeB.rotation.y = t * 0.3;
        nodeB.position.y = 2.7 + Math.cos(t * 0.8) * 0.18;

        nodeC.rotation.y = t * 0.22;
        nodeC.rotation.z = t * 0.18;

        renderer?.render(scene, camera);
        if (!prefersReducedMotion) {
          frameId = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(frameId);
        themeObserver.disconnect();
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        strands.forEach((st) => {
          st.line.geometry.dispose();
          st.mat.dispose();
        });
        pulseGeo.dispose();
        pulseMat.dispose();
        waveGeo.dispose();
        wireMat.dispose();
        pointsMat.dispose();
        ceilingGeo.dispose();
        ceilingMat.dispose();
        octGeo.dispose();
        octMat.dispose();
        icoGeo.dispose();
        icoMat.dispose();
        if (renderer) {
          renderer.dispose();
          renderer.domElement.remove();
        }
      };
    } catch {
      // Fallback gracefully if WebGL is unavailable
      if (renderer) renderer.dispose();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
}

