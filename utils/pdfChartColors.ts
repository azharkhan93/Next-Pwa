export type RatingLevel = "Very Low" | "Low" | "Medium" | "Optimum" | "Very High";

export const getRatingColor = (level: RatingLevel): string => {
  const colorMap: Record<RatingLevel, string> = {
    "Very Low": "#dc2626",    // Red
    "Low": "#f59e0b",         // Orange
    "Medium": "#eab308",      // Yellow
    "Optimum": "#22c55e",     // Green
    "Very High": "#16a34a",   // Dark Green
  };
  return colorMap[level] || "#6b7280";
};

// Get rating for pH (ideal range: 6.0-7.5)
export const getPhRating = (ph: number): RatingLevel => {
  if (ph < 5.0) return "Very Low";
  if (ph < 6.0) return "Low";
  if (ph <= 7.5) return "Optimum";
  if (ph <= 8.0) return "Medium";
  if (ph <= 8.5) return "Low";
  return "Very Low";
};

// Get rating for Organic Carbon (ideal: 0.5-1.5%)
export const getOrganicCarbonRating = (oc: number): RatingLevel => {
  if (oc < 0.3) return "Very Low";
  if (oc < 0.5) return "Low";
  if (oc <= 1.5) return "Optimum";
  if (oc <= 2.0) return "Medium";
  return "Very High";
};

// Get rating for Calcium (ideal: 1000-2000 ppm)
export const getCalciumRating = (ca: number): RatingLevel => {
  if (ca < 500) return "Very Low";
  if (ca < 1000) return "Low";
  if (ca <= 2000) return "Optimum";
  if (ca <= 3000) return "Medium";
  return "Very High";
};

// Get rating for Magnesium (ideal: 200-500 ppm)
export const getMagnesiumRating = (mg: number): RatingLevel => {
  if (mg < 100) return "Very Low";
  if (mg < 200) return "Low";
  if (mg <= 500) return "Optimum";
  if (mg <= 700) return "Medium";
  return "Very High";
};

// Get rating for Sulfur (ideal: 10-20 ppm)
export const getSulfurRating = (s: number): RatingLevel => {
  if (s < 5) return "Very Low";
  if (s < 10) return "Low";
  if (s <= 20) return "Optimum";
  if (s <= 30) return "Medium";
  return "Very High";
};

// Get rating for Iron (ideal: 4-10 ppm)
export const getIronRating = (fe: number): RatingLevel => {
  if (fe < 2) return "Very Low";
  if (fe < 4) return "Low";
  if (fe <= 10) return "Optimum";
  if (fe <= 15) return "Medium";
  return "Very High";
};

// Get rating for Manganese (ideal: 10-20 ppm)
export const getManganeseRating = (mn: number): RatingLevel => {
  if (mn < 5) return "Very Low";
  if (mn < 10) return "Low";
  if (mn <= 20) return "Optimum";
  if (mn <= 25) return "Medium";
  return "Very High";
};

// Get rating for Zinc (ideal: 1.0-2.5 ppm)
export const getZincRating = (zn: number): RatingLevel => {
  if (zn < 0.5) return "Very Low";
  if (zn < 1.0) return "Low";
  if (zn <= 2.5) return "Optimum";
  if (zn <= 3.5) return "Medium";
  return "Very High";
};

// Get rating for Copper (ideal: 0.5-2.0 ppm)
export const getCopperRating = (cu: number): RatingLevel => {
  if (cu < 0.2) return "Very Low";
  if (cu < 0.5) return "Low";
  if (cu <= 2.0) return "Optimum";
  if (cu <= 3.0) return "Medium";
  return "Very High";
};

// Get rating for Boron (ideal: 0.5-1.0 ppm)
export const getBoronRating = (b: number): RatingLevel => {
  if (b < 0.2) return "Very Low";
  if (b < 0.5) return "Low";
  if (b <= 1.0) return "Optimum";
  if (b <= 1.5) return "Medium";
  return "Very High";
};

// Get rating for Molybdenum (ideal: 0.1-0.3 ppm)
export const getMolybdenumRating = (mo: number): RatingLevel => {
  if (mo < 0.05) return "Very Low";
  if (mo < 0.1) return "Low";
  if (mo <= 0.3) return "Optimum";
  if (mo <= 0.5) return "Medium";
  return "Very High";
};

// Get rating for Chlorine (ideal: 20-50 ppm)
export const getChlorineRating = (cl: number): RatingLevel => {
  if (cl < 10) return "Very Low";
  if (cl < 20) return "Low";
  if (cl <= 50) return "Optimum";
  if (cl <= 75) return "Medium";
  return "Very High";
};

// Get rating for Nickel (ideal: 0.3-1.0 ppm)
export const getNickelRating = (ni: number): RatingLevel => {
  if (ni < 0.1) return "Very Low";
  if (ni < 0.3) return "Low";
  if (ni <= 1.0) return "Optimum";
  if (ni <= 1.5) return "Medium";
  return "Very High";
};

// Get rating for Sodium (ideal: 50-100 ppm)
export const getSodiumRating = (na: number): RatingLevel => {
  if (na < 20) return "Very Low";
  if (na < 50) return "Low";
  if (na <= 100) return "Optimum";
  if (na <= 150) return "Medium";
  return "Very High";
};

// Get rating for Electrical Conductivity (ideal: 1.0-2.0 dS/m)
export const getElectricalConductivityRating = (ec: number): RatingLevel => {
  if (ec < 0.5) return "Very Low";
  if (ec < 1.0) return "Low";
  if (ec <= 2.0) return "Optimum";
  if (ec <= 3.0) return "Medium";
  return "Very High";
};

// Get ranges for bar chart visualization
export const getParameterRanges = (param: string): { min: number; max: number; ranges: Array<{ level: RatingLevel; min: number; max: number }> } => {
  const ranges: Record<string, { min: number; max: number; ranges: Array<{ level: RatingLevel; min: number; max: number }> }> = {
    ph: {
      min: 4.0,
      max: 9.0,
      ranges: [
        { level: "Very Low", min: 4.0, max: 5.0 },
        { level: "Low", min: 5.0, max: 6.0 },
        { level: "Optimum", min: 6.0, max: 7.5 },
        { level: "Medium", min: 7.5, max: 8.0 },
        { level: "Low", min: 8.0, max: 8.5 },
        { level: "Very Low", min: 8.5, max: 9.0 },
      ],
    },
    nitrogen: {
      min: 0,
      max: 800,
      ranges: [
        { level: "Very Low", min: 0, max: 150 },
        { level: "Low", min: 150, max: 273 },
        { level: "Medium", min: 273, max: 401 },
        { level: "Optimum", min: 401, max: 545 },
        { level: "Medium", min: 545, max: 600 },
        { level: "Very High", min: 600, max: 800 },
      ],
    },
    phosphorus: {
      min: 0,
      max: 50,
      ranges: [
        { level: "Very Low", min: 0, max: 5 },
        { level: "Low", min: 5, max: 13 },
        { level: "Medium", min: 13, max: 16 },
        { level: "Optimum", min: 16, max: 23 },
        { level: "Medium", min: 23, max: 34 },
        { level: "Very High", min: 34, max: 50 },
      ],
    },
    potassium: {
      min: 0,
      max: 500,
      ranges: [
        { level: "Very Low", min: 0, max: 60 },
        { level: "Low", min: 60, max: 121 },
        { level: "Medium", min: 121, max: 201 },
        { level: "Optimum", min: 201, max: 281 },
        { level: "Medium", min: 281, max: 351 },
        { level: "Very High", min: 351, max: 500 },
      ],
    },
    calcium: {
      min: 0,
      max: 3000,
      ranges: [
        { level: "Very Low", min: 0, max: 500 },
        { level: "Low", min: 500, max: 1000 },
        { level: "Optimum", min: 1000, max: 2000 },
        { level: "Medium", min: 2000, max: 2500 },
        { level: "Very High", min: 2500, max: 3000 },
      ],
    },
    magnesium: {
      min: 0,
      max: 800,
      ranges: [
        { level: "Very Low", min: 0, max: 100 },
        { level: "Low", min: 100, max: 200 },
        { level: "Optimum", min: 200, max: 500 },
        { level: "Medium", min: 500, max: 700 },
        { level: "Very High", min: 700, max: 800 },
      ],
    },
    organicCarbon: {
      min: 0,
      max: 5,
      ranges: [
        { level: "Very Low", min: 0, max: 0.3 },
        { level: "Low", min: 0.3, max: 0.5 },
        { level: "Optimum", min: 0.5, max: 1.5 },
        { level: "Medium", min: 1.5, max: 2.0 },
        { level: "Very High", min: 2.0, max: 5.0 },
      ],
    },
    sulfur: {
      min: 0,
      max: 50,
      ranges: [
        { level: "Very Low", min: 0, max: 5 },
        { level: "Low", min: 5, max: 10 },
        { level: "Optimum", min: 10, max: 20 },
        { level: "Medium", min: 20, max: 30 },
        { level: "Very High", min: 30, max: 50 },
      ],
    },
    iron: {
      min: 0,
      max: 20,
      ranges: [
        { level: "Very Low", min: 0, max: 2 },
        { level: "Low", min: 2, max: 4 },
        { level: "Optimum", min: 4, max: 10 },
        { level: "Medium", min: 10, max: 15 },
        { level: "Very High", min: 15, max: 20 },
      ],
    },
    manganese: {
      min: 0,
      max: 30,
      ranges: [
        { level: "Very Low", min: 0, max: 5 },
        { level: "Low", min: 5, max: 10 },
        { level: "Optimum", min: 10, max: 20 },
        { level: "Medium", min: 20, max: 25 },
        { level: "Very High", min: 25, max: 30 },
      ],
    },
    zinc: {
      min: 0,
      max: 5,
      ranges: [
        { level: "Very Low", min: 0, max: 0.5 },
        { level: "Low", min: 0.5, max: 1.0 },
        { level: "Optimum", min: 1.0, max: 2.5 },
        { level: "Medium", min: 2.5, max: 3.5 },
        { level: "Very High", min: 3.5, max: 5.0 },
      ],
    },
    copper: {
      min: 0,
      max: 5,
      ranges: [
        { level: "Very Low", min: 0, max: 0.2 },
        { level: "Low", min: 0.2, max: 0.5 },
        { level: "Optimum", min: 0.5, max: 2.0 },
        { level: "Medium", min: 2.0, max: 3.0 },
        { level: "Very High", min: 3.0, max: 5.0 },
      ],
    },
    boron: {
      min: 0,
      max: 2,
      ranges: [
        { level: "Very Low", min: 0, max: 0.2 },
        { level: "Low", min: 0.2, max: 0.5 },
        { level: "Optimum", min: 0.5, max: 1.0 },
        { level: "Medium", min: 1.0, max: 1.5 },
        { level: "Very High", min: 1.5, max: 2.0 },
      ],
    },
    molybdenum: {
      min: 0,
      max: 1,
      ranges: [
        { level: "Very Low", min: 0, max: 0.05 },
        { level: "Low", min: 0.05, max: 0.1 },
        { level: "Optimum", min: 0.1, max: 0.3 },
        { level: "Medium", min: 0.3, max: 0.5 },
        { level: "Very High", min: 0.5, max: 1.0 },
      ],
    },
    chlorine: {
      min: 0,
      max: 100,
      ranges: [
        { level: "Very Low", min: 0, max: 10 },
        { level: "Low", min: 10, max: 20 },
        { level: "Optimum", min: 20, max: 50 },
        { level: "Medium", min: 50, max: 75 },
        { level: "Very High", min: 75, max: 100 },
      ],
    },
    nickel: {
      min: 0,
      max: 2,
      ranges: [
        { level: "Very Low", min: 0, max: 0.1 },
        { level: "Low", min: 0.1, max: 0.3 },
        { level: "Optimum", min: 0.3, max: 1.0 },
        { level: "Medium", min: 1.0, max: 1.5 },
        { level: "Very High", min: 1.5, max: 2.0 },
      ],
    },
    sodium: {
      min: 0,
      max: 200,
      ranges: [
        { level: "Very Low", min: 0, max: 20 },
        { level: "Low", min: 20, max: 50 },
        { level: "Optimum", min: 50, max: 100 },
        { level: "Medium", min: 100, max: 150 },
        { level: "Very High", min: 150, max: 200 },
      ],
    },
    electricalConductivity: {
      min: 0,
      max: 4,
      ranges: [
        { level: "Very Low", min: 0, max: 0.5 },
        { level: "Low", min: 0.5, max: 1.0 },
        { level: "Optimum", min: 1.0, max: 2.0 },
        { level: "Medium", min: 2.0, max: 3.0 },
        { level: "Very High", min: 3.0, max: 4.0 },
      ],
    },
  };

  return ranges[param] || { min: 0, max: 100, ranges: [] };
};

