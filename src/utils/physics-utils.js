import * as THREE from 'three';

/**
 * Converts Keplerian orbital elements to Cartesian coordinates (X, Y, Z)
 * @param {number} a - Semi-major axis
 * @param {number} e - Eccentricity
 * @param {number} i - Inclination (degrees)
 * @param {number} w - Argument of periapsis (degrees)
 * @param {number} O - Longitude of ascending node (degrees)
 * @param {number} M - Mean anomaly (radians)
 * @returns {THREE.Vector3}
 */
export function keplerToCartesian(a, e, i, w, O, M) {
  // Convert degrees to radians
  const grad = Math.PI / 180;
  i *= grad;
  w *= grad;
  O *= grad;

  // Solve Kepler's equation for Eccentric Anomaly (E)
  // M = E - e * sin(E)
  let E = M;
  for (let iter = 0; iter < 10; iter++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }

  // Calculate coordinates in the orbital plane
  const x_orb = a * (Math.cos(E) - e);
  const y_orb = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotate to the correct orientation in 3D space
  const cosO = Math.cos(O);
  const sinO = Math.sin(O);
  const cosw = Math.cos(w);
  const sinw = Math.sin(w);
  const cosi = Math.cos(i);
  const sini = Math.sin(i);

  const x = (cosO * cosw - sinO * sinw * cosi) * x_orb + (-cosO * sinw - sinO * cosw * cosi) * y_orb;
  const y = (sinO * cosw + cosO * sinw * cosi) * x_orb + (-sinO * sinw + cosO * cosw * cosi) * y_orb;
  const z = (sinw * sini) * x_orb + (cosw * sini) * y_orb;

  return new THREE.Vector3(x, z, -y); // Swapped Y and Z for Three.js coordinate system (Y is up)
}

/**
 * Converts B-V color index to an approximate RGB color
 * Based on Mitchell Charity's 'What color is a star?'
 * @param {number} bv - B-V color index
 * @returns {THREE.Color}
 */
export function bvToRGB(bv) {
  let t = 4600 * (1 / (0.62 * bv + 0.33) + 1 / (0.62 * bv + 1.87));
  let x, y;

  if (t < 4000) {
    x = -0.2661239 * (10 ** 9 / t ** 3) - 0.234358 * (10 ** 6 / t ** 2) + 0.8776956 * (10 ** 3 / t) + 0.17991;
  } else {
    x = -3.0258469 * (10 ** 9 / t ** 3) + 2.1070379 * (10 ** 6 / t ** 2) + 0.2226347 * (10 ** 3 / t) + 0.24039;
  }

  if (t < 2222) {
    y = -1.1063814 * (x ** 3) - 1.3481102 * (x ** 2) + 2.18555832 * x - 0.20219683;
  } else if (t < 4000) {
    y = -0.9549476 * (x ** 3) - 1.37418593 * (x ** 2) + 2.09137015 * x - 0.16748867;
  } else {
    y = 3.081758 * (x ** 3) - 5.8733867 * (x ** 2) + 3.75112997 * x - 0.4673522;
  }

  // Simplified RGB conversion
  const color = new THREE.Color();
  const r = x / y;
  const g = 1;
  const b = (1 - x - y) / y;

  const max = Math.max(r, g, b);
  color.setRGB(r / max, g / max, b / max);
  return color;
}

/**
 * Converts Right Ascension and Declination to a Vector3
 * @param {number} ra - Right Ascension in decimal degrees
 * @param {number} dec - Declination in decimal degrees
 * @param {number} radius - Distance from the center
 * @returns {THREE.Vector3}
 */
export function raDecToVector3(ra, dec, radius) {
  const phi = (90 - dec) * (Math.PI / 180);
  const theta = (ra + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export const PLANET_DATA = [
  { name: 'Mercury', a: 0.387, e: 0.2056, i: 7.00, w: 77.45, O: 48.33, L: 252.25, size: 0.1, color: '#A5A5A5', period: 0.24 },
  { name: 'Venus', a: 0.723, e: 0.0067, i: 3.39, w: 131.53, O: 76.68, L: 181.98, size: 0.24, color: '#E3BB76', period: 0.61 },
  { name: 'Earth', a: 1.000, e: 0.0167, i: 0.00, w: 102.94, O: 0.00, L: 100.46, size: 0.25, color: '#2271B3', period: 1.00 },
  { name: 'Mars', a: 1.524, e: 0.0934, i: 1.85, w: 336.04, O: 49.57, L: 355.45, size: 0.13, color: '#E27B58', period: 1.88 },
  { name: 'Jupiter', a: 5.203, e: 0.0484, i: 1.30, w: 14.75, O: 100.45, L: 34.40, size: 0.8, color: '#D39C7E', period: 11.86 },
  { name: 'Saturn', a: 9.537, e: 0.0541, i: 2.48, w: 92.59, O: 113.72, L: 49.94, size: 0.7, color: '#C5AB6E', period: 29.45, hasRings: true },
  { name: 'Uranus', a: 19.191, e: 0.0472, i: 0.77, w: 170.96, O: 74.01, L: 313.23, size: 0.4, color: '#B5E3E3', period: 84.01 },
  { name: 'Neptune', a: 30.069, e: 0.0086, i: 1.77, w: 44.97, O: 131.72, L: 304.88, size: 0.4, color: '#4B70DD', period: 164.79 },
];
