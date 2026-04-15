export const LAB_MODES = {
  EXPLORE: 'explore',
  ORBIT: 'orbit',
  NEBULA: 'nebula'
};

export const modeConfigs = {
  [LAB_MODES.EXPLORE]: {
    title: 'Stellar Exploration',
    description: 'Venture through real celestial coordinates. Observe the positions and spectral classes of the 6,000 brightest stars in the night sky.',
    accent: '#00D2FF',
    bloom: 0.5,
    cameraDist: 25,
    orbitIntensity: 0,
    nebulaOpacity: 0,
    galaxyIntensity: 0.8
  },
  [LAB_MODES.ORBIT]: {
    title: 'Orbital Mechanics',
    description: 'Experience the kinetic energy of the Solar System. This simulation uses J2000 Keplerian elements for precise planetary motion.',
    accent: '#FFD700',
    bloom: 0.8,
    cameraDist: 18,
    orbitIntensity: 1.0,
    nebulaOpacity: 0,
    galaxyIntensity: 0
  },
  [LAB_MODES.NEBULA]: {
    title: 'Atmospheric Generator',
    description: 'Manipulate cosmic gas clouds using the Hubble Telescope SHO palette. Mapped to Sulfur II (Red), Hydrogen-Alpha (Green), and Oxygen III (Blue).',
    accent: '#FF7043',
    bloom: 2.5,
    cameraDist: 12,
    orbitIntensity: 0,
    nebulaOpacity: 1.5,
    galaxyIntensity: 0
  }
};
