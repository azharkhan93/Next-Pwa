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
  };

  return ranges[param] || { min: 0, max: 100, ranges: [] };
};

