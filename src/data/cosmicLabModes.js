export const LAB_MODES = {
  EXPLORE: 'explore',
  ORBIT: 'orbit',
  NEBULA: 'nebula'
};

export const modeConfigs = {
  [LAB_MODES.EXPLORE]: {
    title: 'Stellar Exploration',
    description: 'Venture through a vast multi-layered starfield. Observe the depth and scale of distant suns in a quiet, immersive observation mode.',
    accent: '#00D2FF',
    bloom: 0.5,
    cameraDist: 10,
    orbitIntensity: 0.2,
    nebulaOpacity: 0.1
  },
  [LAB_MODES.ORBIT]: {
    title: 'Orbital Mechanics',
    description: 'Experience the kinetic energy of celestial bodies caught in a gravitational dance. Visualize the paths of complex orbital systems.',
    accent: '#BD00FF',
    bloom: 0.8,
    cameraDist: 15,
    orbitIntensity: 1.0,
    nebulaOpacity: 0.3
  },
  [LAB_MODES.NEBULA]: {
    title: 'Atmospheric Generator',
    description: 'Immerse yourself in thick cosmic dust and vibrant gases. Manipulate the atmospheric density and color of distant nebulae.',
    accent: '#00FFD1',
    bloom: 2.5,
    cameraDist: 8,
    orbitIntensity: 0.3,
    nebulaOpacity: 1.2
  }
};
