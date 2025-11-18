/**
 * Base Recommended Dose (RD) calculations for Apple Orchards
 * Based on plantation type (High Density or Traditional) and tree age
 */

export type PlantationType = "high-density" | "traditional";

export type BaseRecommendedDose = {
  urea: number; // in g/tree
  dap: number; // in g/tree
  mop: number; // in g/tree
};

/**
 * Calculate base recommended dose for High Density Apple Orchards
 * Based on the provided data table:
 * - Age 0: No application (-)
 * - Age 1: Urea 108, DAP 54, MOP 100
 * - Age 2: Urea 206, DAP 108, MOP 200
 * - Age 3: Urea 303, DAP 162, MOP 300
 * - Age 4: Urea 401, DAP 217, MOP 400
 * - Age 5: Urea 488, DAP 271, MOP 500
 */
function calculateHighDensityRD(age: number): BaseRecommendedDose {
  if (age <= 0) {
    return { urea: 0, dap: 0, mop: 0 };
  }

  // Urea: 108 + (age - 1) × 98
  const urea = Math.round(108 + (age - 1) * 98);

  // DAP: 54 + (age - 1) × 54
  const dap = Math.round(54 + (age - 1) * 54);

  // MOP: 100 × age (exact formula)
  const mop = 100 * age;

  return { urea, dap, mop };
}

/**
 * Calculate base recommended dose for Traditional Apple Orchards
 * Based on the provided data table:
 * - Age 0: Urea 0, DAP 0, MOP 0
 * - Age 1: Urea 50, DAP 25, MOP 80
 * - Age 2: Urea 100, DAP 50, MOP 160
 * - Age 3: Urea 150, DAP 75, MOP 240
 * - ...continuing linearly
 * - Age 15: Urea 1500, DAP 750, MOP 2500
 *
 * Note: MOP appears to have non-linear growth for higher ages
 * For ages 1-3: MOP = 80 × age
 * For ages 4-15: Using interpolation based on data
 */
function calculateTraditionalRD(age: number): BaseRecommendedDose {
  if (age <= 0) {
    return { urea: 0, dap: 0, mop: 0 };
  }

  // Urea: 50 × age (exact linear formula)
  const urea = 50 * age;

  // DAP: 25 × age (exact linear formula)
  const dap = 25 * age;

  // MOP: Non-linear formula based on data analysis
  // For ages 1-3: 80 × age (exact)
  // For ages 4-15: Linear interpolation from age 3 (240) to age 15 (2500)
  // Rate: (2500 - 240) / (15 - 3) = 2260 / 12 ≈ 188.33 per year
  let mop: number;
  if (age <= 3) {
    mop = 80 * age;
  } else {
    // Linear interpolation: 240 + (age - 3) × 188.33
    mop = Math.round(240 + (age - 3) * (2260 / 12));
  }

  return { urea, dap, mop };
}

/**
 * Get base recommended dose (RD) based on plantation type and age
 *
 * @param plantationType - "high-density" or "traditional"
 * @param age - Tree age in years
 * @returns Base recommended dose in g/tree for Urea, DAP, and MOP
 */
export function getBaseRecommendedDose(
  plantationType: string | undefined | null,
  age: number | "" | undefined | null
): BaseRecommendedDose | null {
  // Return null if required parameters are missing
  if (!plantationType || age === "" || age === undefined || age === null) {
    return null;
  }

  const ageNum = typeof age === "number" ? age : parseFloat(String(age));

  if (isNaN(ageNum) || ageNum < 0) {
    return null;
  }

  // Normalize plantation type
  const normalizedType = plantationType.toLowerCase().trim();

  if (normalizedType === "high-density" || normalizedType === "highdensity") {
    return calculateHighDensityRD(ageNum);
  } else if (normalizedType === "traditional") {
    return calculateTraditionalRD(ageNum);
  }

  // Return null for unknown plantation types
  return null;
}

/**
 * Get display name for plantation type
 */
export function getPlantationTypeDisplayName(
  plantationType: string | undefined | null
): string | null {
  if (!plantationType) {
    return null;
  }

  const normalizedType = plantationType.toLowerCase().trim();

  if (normalizedType === "high-density" || normalizedType === "highdensity") {
    return "High Density";
  } else if (normalizedType === "traditional") {
    return "Traditional";
  }

  return plantationType; // Return original if not recognized
}

/**
 * Calculate final recommended dose by applying soil test adjustments
 *
 * @param baseRD - Base recommended dose
 * @param increasePercent - Percentage increase from soil test (null means no increase)
 * @returns Final recommended dose in g/tree
 */
export function calculateFinalDose(
  baseRD: number,
  increasePercent: number | null
): number {
  if (increasePercent === null) {
    return baseRD;
  }

  return Math.round(baseRD * (1 + increasePercent / 100));
}
