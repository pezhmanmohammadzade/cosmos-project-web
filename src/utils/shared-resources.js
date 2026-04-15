import * as THREE from 'three';

/**
 * Shared geometries to reduce GPU memory overhead and instantiation time.
 * Instead of creating new geometries for each planet or star, we use unit geometries
 * and scale them at the mesh level.
 */
export const sharedGeometries = {
  // Low-poly for background or distant objects
  lowPolySphere: new THREE.SphereGeometry(1, 16, 16),
  
  // Standard poly for planets
  mediumPolySphere: new THREE.SphereGeometry(1, 32, 32),
  
  // High-poly for hero objects (Sun, high-res nebula layers)
  highPolySphere: new THREE.SphereGeometry(1, 64, 64),
  
  // Ultra-high poly for special components
  ultraPolySphere: new THREE.SphereGeometry(1, 128, 128),

  // Unit Ring for planetary rings (proportional)
  unitRing: new THREE.RingGeometry(1, 1.833, 64),
};

/**
 * Shared materials to reduce draw call overhead and memory.
 */
export const sharedMaterials = {
  galaxyPoints: new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }),
  
  starPoints: new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }),
};

// Ensure disposal on module unload if necessary, though in a web app this is usually fine
// for singleton geometries that live for the duration of the session.
