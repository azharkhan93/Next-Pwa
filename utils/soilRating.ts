export type NitrogenLevel =
  | "Very Low"
  | "Low"
  | "Medium"
  | "Optimum"
  | "High"
  | "Very High";
export type PhosphorusLevel =
  | "Very Low"
  | "Low"
  | "Medium"
  | "Optimum"
  | "High"
  | "Very High";
export type PotassiumLevel =
  | "Very Low"
  | "Low"
  | "Medium"
  | "Optimum"
  | "High"
  | "Very High";
export type PhLevel = "Low" | "Medium" | "High";
export type OrganicCarbonLevel =
  | "Very Low"
  | "Low"
  | "Medium"
  | "Optimum"
  | "High"
  | "Very High";

export type NitrogenRecommendation = {
  level: NitrogenLevel;
  /**
   * Percentage increase in Recommended Dose (RD) of nitrogen fertiliser.
   * `null` means no increase (keep RD as is).
   */
  increasePercent: number | null;

  suggestion: string;
};

export type PhosphorusRecommendation = {
  level: PhosphorusLevel;
  /**
   * Percentage increase in Recommended Dose (RD) of phosphorus fertiliser (DAP).
   * `null` means no increase (keep RD as is).
   */
  increasePercent: number | null;
  suggestion: string;
};

export type PotassiumRecommendation = {
  level: PotassiumLevel;
  /**
   * Percentage increase in Recommended Dose (RD) of potassium fertiliser (MOP).
   * `null` means no increase (keep RD as is).
   */
  increasePercent: number | null;
  suggestion: string;
};


/**
 * Classify soil test nitrogen (Kg ha⁻¹) into levels with recommendations.
 * Based on standard soil test interpretation tables:
 * - Very Low: <150 → +25% RD
 * - Low: 151-272 → +15% RD
 * - Medium: 273-400 → +10% RD
 * - Optimum: 401-544 → +5% RD
 * - High: 545-600 → +2% RD
 * - Very High: >600 → 0% (no additional N)
 */
export const getNitrogenRecommendation = (
  value: number
): NitrogenRecommendation => {
  const rules: Array<{
    min: number;
    max: number | null;
    recommendation: NitrogenRecommendation;
  }> = [
    {
      min: Number.NEGATIVE_INFINITY,
      max: 150,
      recommendation: {
        level: "Very Low",
        increasePercent: 25,
        suggestion:
          "Nitrogen is very low; apply 25% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 151,
      max: 272,
      recommendation: {
        level: "Low",
        increasePercent: 15,
        suggestion:
          "Nitrogen is low; apply 15% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 273,
      max: 400,
      recommendation: {
        level: "Medium",
        increasePercent: 10,
        suggestion:
          "Nitrogen is medium; apply 10% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 401,
      max: 544,
      recommendation: {
        level: "Optimum",
        increasePercent: 5,
        suggestion:
          "Nitrogen is at optimum level; apply 5% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 545,
      max: 600,
      recommendation: {
        level: "High",
        increasePercent: 2,
        suggestion:
          "Nitrogen is high; apply only 2% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 601,
      max: null,
      recommendation: {
        level: "Very High",
        increasePercent: null,
        suggestion: "-",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );

  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the nitrogen rating level (Very Low/Low/Medium/Optimum/High/Very High)
 * for a given soil test nitrogen value.
 */
export const getNitrogenRating = (value: number): NitrogenLevel =>
  getNitrogenRecommendation(value).level;

/**
 * Classify soil test phosphorus (Kg ha⁻¹, as DAP) into levels with recommendations.
 * Based on standard soil test interpretation tables:
 * - Very Low: <5 → +25% RD
 * - Low: 6-12 → +15% RD
 * - Medium: 13-15 → +10% RD
 * - Optimum: 16-22 → +5% RD
 * - High: 23-33 → +2% RD
 * - Very High: >33 → 0% (no additional P)
 */
export const getPhosphorusRecommendation = (
  value: number
): PhosphorusRecommendation => {
  const rules: Array<{
    min: number;
    max: number | null;
    recommendation: PhosphorusRecommendation;
  }> = [
    {
      min: Number.NEGATIVE_INFINITY,
      max: 5,
      recommendation: {
        level: "Very Low",
        increasePercent: 25,
        suggestion:
          "Phosphorus is very low; apply 25% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 6,
      max: 12,
      recommendation: {
        level: "Low",
        increasePercent: 15,
        suggestion:
          "Phosphorus is low; apply 15% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 13,
      max: 15,
      recommendation: {
        level: "Medium",
        increasePercent: 10,
        suggestion:
          "Phosphorus is medium; apply 10% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 16,
      max: 22,
      recommendation: {
        level: "Optimum",
        increasePercent: 5,
        suggestion:
          "Phosphorus is at optimum level; apply 5% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 23,
      max: 33,
      recommendation: {
        level: "High",
        increasePercent: 2,
        suggestion:
          "Phosphorus is high; apply only 2% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 34,
      max: null,
      recommendation: {
        level: "Very High",
        increasePercent: null,
        suggestion: "-",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );

  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the phosphorus rating level (Very Low/Low/Medium/Optimum/High/Very High).
 */
export const getPhosphorusRating = (value: number): PhosphorusLevel =>
  getPhosphorusRecommendation(value).level;

/**
 * Classify soil test potassium (Kg ha⁻¹, as MOP) into levels with recommendations.
 * Based on standard soil test interpretation tables:
 * - Very Low: <60 → +25% RD
 * - Low: 61-120 → +15% RD
 * - Medium: 121-200 → +10% RD
 * - Optimum: 201-280 → +5% RD
 * - High: 281-350 → +2% RD
 * - Very High: >350 → 0% (no additional K)
 */
export const getPotassiumRecommendation = (
  value: number
): PotassiumRecommendation => {
  const rules: Array<{
    min: number;
    max: number | null;
    recommendation: PotassiumRecommendation;
  }> = [
    {
      min: Number.NEGATIVE_INFINITY,
      max: 60,
      recommendation: {
        level: "Very Low",
        increasePercent: 25,
        suggestion:
          "Potassium is very low; apply 25% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 61,
      max: 120,
      recommendation: {
        level: "Low",
        increasePercent: 15,
        suggestion:
          "Potassium is low; apply 15% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 121,
      max: 200,
      recommendation: {
        level: "Medium",
        increasePercent: 10,
        suggestion:
          "Potassium is medium; apply 10% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 201,
      max: 280,
      recommendation: {
        level: "Optimum",
        increasePercent: 5,
        suggestion:
          "Potassium is at optimum level; apply 5% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 281,
      max: 350,
      recommendation: {
        level: "High",
        increasePercent: 2,
        suggestion:
          "Potassium is high; apply only 2% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 351,
      max: null,
      recommendation: {
        level: "Very High",
        increasePercent: null,
        suggestion: "-",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );

  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the potassium rating level (Very Low/Low/Medium/Optimum/High/Very High).
 */
export const getPotassiumRating = (value: number): PotassiumLevel =>
  getPotassiumRecommendation(value).level;

/**
 * Classify soil test pH into levels.
 *
 *  Low:    < 5
 *  Medium: 5 - 6.5
 *  High:   > 6.5
 */
export const getPhRating = (value: number): PhLevel => {
  if (value < 5) {
    return "Low";
  }
  if (value >= 5 && value <= 6.5) {
    return "Medium";
  }
  return "High";
};

/**
 * Classify soil test organic carbon (%) into levels.
 * Based on standard soil test interpretation:
 * - Very Low: < 0.4
 * - Low: 0.4 - 0.5
 * - Medium: 0.5 - 0.75
 * - Optimum: 0.75 - 1.1
 * - High: 1.1 - 1.5
 * - Very High: > 1.5
 */
export const getOrganicCarbonRating = (value: number): OrganicCarbonLevel => {
  if (value < 0.4) {
    return "Very Low";
  }
  if (value >= 0.4 && value < 0.5) {
    return "Low";
  }
  if (value >= 0.5 && value < 0.75) {
    return "Medium";
  }
  if (value >= 0.75 && value <= 1.1) {
    return "Optimum";
  }
  if (value > 1.1 && value <= 1.5) {
    return "High";
  }
  return "Very High";
};
