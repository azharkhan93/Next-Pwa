/**
 * Utility functions for calculating Cation Exchange Capacity (CEC) and base saturation
 *
 * CEC (Cation Exchange Capacity) is a measure of the soil's ability to retain and exchange
 * positively charged ions (cations) such as calcium (Ca²⁺), magnesium (Mg²⁺),
 * potassium (K⁺), and sodium (Na⁺).
 *
 * CEC is expressed in milliequivalents per 100 grams of soil (meq/100g).
 *
 * Formula:
 * CEC = Sum of all exchangeable cations in meq/100g
 *
 * Conversion factors (ppm to meq/100g):
 * - Calcium (Ca²⁺): ppm ÷ 200
 * - Magnesium (Mg²⁺): ppm ÷ 120
 * - Potassium (K⁺): ppm ÷ 390
 * - Sodium (Na⁺): ppm ÷ 230
 */

/**
 * Converts cation concentration from ppm to meq/100g
 * @param ppm - Concentration in parts per million (ppm)
 * @param conversionFactor - Conversion factor (200 for Ca, 120 for Mg, 390 for K, 230 for Na)
 * @returns Concentration in meq/100g
 */
function ppmToMeq100g(ppm: number, conversionFactor: number): number {
  if (ppm === 0 || isNaN(ppm)) return 0;
  return ppm / conversionFactor;
}

/**
 * Calculates Cation Exchange Capacity (CEC) from exchangeable cation concentrations
 *
 * @param cations - Object containing cation concentrations in ppm
 * @returns CEC value in meq/100g
 */
export function calculateCEC(cations: {
  calcium?: string | number;
  magnesium?: string | number;
  potassium?: string | number;
  sodium?: string | number;
}): number | null {
  // Convert string values to numbers
  const parseValue = (value: string | number | undefined): number => {
    if (value === undefined || value === null || value === "") return 0;
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? 0 : num;
  };

  // Get cation concentrations in ppm
  const ca = parseValue(cations.calcium);
  const mg = parseValue(cations.magnesium);
  const k = parseValue(cations.potassium);
  const na = parseValue(cations.sodium);

  // Convert ppm to meq/100g using standard conversion factors
  const caMeq = ppmToMeq100g(ca, 200); // Ca: ppm ÷ 200
  const mgMeq = ppmToMeq100g(mg, 120); // Mg: ppm ÷ 120
  const kMeq = ppmToMeq100g(k, 390); // K: ppm ÷ 390
  const naMeq = ppmToMeq100g(na, 230); // Na: ppm ÷ 230

  // Sum all cations to get CEC
  const cec = caMeq + mgMeq + kMeq + naMeq;

  // Return null if no cations are present
  if (cec === 0) return null;

  // Round to 2 decimal places
  return Math.round(cec * 100) / 100;
}

/**
 * Calculates base saturation percentage for a specific cation
 *
 * Base Saturation (%) = (Cation meq/100g / CEC) × 100
 *
 * @param cationPpm - Cation concentration in ppm
 * @param conversionFactor - Conversion factor for the cation (200 for Ca, 120 for Mg, 390 for K, 230 for Na)
 * @param cec - Cation Exchange Capacity in meq/100g
 * @returns Base saturation percentage
 */
export function calculateBaseSaturation(
  cationPpm: number | string,
  conversionFactor: number,
  cec: number | null
): number | null {
  if (!cec || cec === 0) return null;

  const ppm = typeof cationPpm === "string" ? parseFloat(cationPpm) : cationPpm;
  if (isNaN(ppm) || ppm === 0) return null;

  const cationMeq = ppmToMeq100g(ppm, conversionFactor);
  const saturation = (cationMeq / cec) * 100;

  // Round to 2 decimal places
  return Math.round(saturation * 100) / 100;
}

/**
 * Calculates all base saturations for major cations
 *
 * @param cations - Object containing cation concentrations in ppm
 * @param cec - Cation Exchange Capacity in meq/100g (if not provided, will be calculated)
 * @returns Object containing CEC and base saturation percentages
 */
export function calculateCECAndSaturations(
  cations: {
    calcium?: string | number;
    magnesium?: string | number;
    potassium?: string | number;
    sodium?: string | number;
  },
  cec?: number | null
) {
  const calculatedCEC = cec ?? calculateCEC(cations);

  if (!calculatedCEC) {
    return {
      cec: null,
      calciumSaturation: null,
      magnesiumSaturation: null,
      potassiumSaturation: null,
      sodiumSaturation: null,
    };
  }

  return {
    cec: calculatedCEC,
    calciumSaturation: calculateBaseSaturation(
      cations.calcium || 0,
      200,
      calculatedCEC
    ),
    magnesiumSaturation: calculateBaseSaturation(
      cations.magnesium || 0,
      120,
      calculatedCEC
    ),
    potassiumSaturation: calculateBaseSaturation(
      cations.potassium || 0,
      390,
      calculatedCEC
    ),
    sodiumSaturation: calculateBaseSaturation(
      cations.sodium || 0,
      230,
      calculatedCEC
    ),
  };
}

/**
 * Gets CEC rating based on CEC value
 *
 * @param cec - Cation Exchange Capacity in meq/100g
 * @returns Rating string
 */
export function getCECRating(cec: number | null | string): string {
  if (cec === null || cec === undefined || cec === "") return "";

  const cecValue = typeof cec === "string" ? parseFloat(cec) : cec;
  if (isNaN(cecValue)) return "";

  if (cecValue < 10) return "Low";
  if (cecValue < 20) return "Medium";
  if (cecValue < 30) return "High";
  return "Very High";
}
