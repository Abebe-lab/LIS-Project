const MAP_SCALES = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
const PAPER_SIZES_PORTRAIT = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  A2: { width: 420, height: 594 },
  A1: { width: 594, height: 841 },
  A0: { width: 841, height: 1189 },
  Letter: { width: 215.9, height: 279.4 },
};
const PAPER_ORIENTATIONS = ["Portrait", "Landscape"];
const DPIS = [72, 96, 144, 192];

const mmToPixel = (mm,dpi) => {
  return (mm / 25.4) * dpi;
};

const pixelToMm = (px,dpi) => {
  return (px * 25.4) / dpi;
};

// Adjusted function for calculating zoom level based on scale for UTM (WGS84 Zones 36, 37, 38N)
const calculateZoomForScale = (scaleDenominator, paperWidthMm,dpi, viewProjection) => {
  const paperWidthMeters = (paperWidthMm / 1000) * scaleDenominator; // Paper width in meters at the desired scale
  const paperWidthPixels = mmToPixel(paperWidthMm, dpi);

  // Calculate required resolution (meters per pixel)
  const requiredResolution = paperWidthMeters / paperWidthPixels;

  // Approximate zoom level based on resolution. This is a simplified approach.
  // In a real-world scenario, you might need a more precise mapping
  // that considers the projection and tile pyramid structure.
  // This is a heuristic and might need fine-tuning.
  const baseResolution = 78271.51696402048; // Resolution at zoom level 1 for Web Mercator (approx. and might need adjustment for UTM)
  const zoomLevel = Math.log2(baseResolution / requiredResolution) + 1; // Starting from zoom level 1

  return zoomLevel;
};

export { mmToPixel, pixelToMm, calculateZoomForScale, MAP_SCALES, PAPER_SIZES_PORTRAIT, PAPER_ORIENTATIONS, DPIS };
