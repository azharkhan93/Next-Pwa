export type NitrogenLevel = "Low" | "Medium" | "High" | "Very High";
export type PhosphorusLevel = "Low" | "Medium" | "High" | "Very High";
export type PotassiumLevel = "Low" | "Medium" | "High" | "Very High";

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
      max: 149.9999,
      recommendation: {
        level: "Low",
        increasePercent: 25,
        suggestion:
          "Nitrogen is low; apply 25% more than the recommended dose (RD) of urea.",
      },
    },
    {
      min: 150,
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
        level: "Medium",
        increasePercent: 5,
        suggestion:
          "Nitrogen is medium; apply 5% more than the recommended dose (RD) of urea.",
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
        suggestion:
          "Nitrogen is very high; do not increase the nitrogen dose beyond the recommended rate.",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );


  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the nitrogen rating level (Low/Medium/High/Very High)
 * for a given soil test nitrogen value.
 */
export const getNitrogenRating = (value: number): NitrogenLevel =>
  getNitrogenRecommendation(value).level;

/**
 * Classify soil test phosphorus (Kg ha⁻¹, as DAP) into levels with recommendations.
 *
 *  Low:    <5       → +25% RD
 *          6–12     → +15% RDf
 *  Medium: 13–15    → +10% RD
 *          16–22    → +5% RD
 *  High:   23–33    → +2% RD
 *  Very High: >33   → 0% (no additional P)
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
      max: 4.9999,
      recommendation: {
        level: "Low",
        increasePercent: 25,
        suggestion:
          "Phosphorus is low; apply 25% more than the recommended dose (RD) of DAP.",
      },
    },
    {
      min: 5,
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
        level: "Medium",
        increasePercent: 5,
        suggestion:
          "Phosphorus is medium; apply 5% more than the recommended dose (RD) of DAP.",
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
        suggestion:
          "Phosphorus is very high; do not increase the phosphorus dose beyond the recommended rate.",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );

  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the phosphorus rating level (Low/Medium/High/Very High).
 */
export const getPhosphorusRating = (value: number): PhosphorusLevel =>
  getPhosphorusRecommendation(value).level;

/**
 * Classify soil test potassium (Kg ha⁻¹, as MOP) into levels with recommendations.
 *
 *  Low:    <60      → +25% RD
 *          61–120   → +15% RD
 *  Medium: 121–200  → +10% RD
 *          201–280  → +5% RD
 *  High:   281–350  → +2% RD
 *  Very High: >350  → 0% (no additional K)
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
      max: 59.9999,
      recommendation: {
        level: "Low",
        increasePercent: 25,
        suggestion:
          "Potassium is low; apply 25% more than the recommended dose (RD) of MOP.",
      },
    },
    {
      min: 60,
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
        level: "Medium",
        increasePercent: 5,
        suggestion:
          "Potassium is medium; apply 5% more than the recommended dose (RD) of MOP.",
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
        suggestion:
          "Potassium is very high; do not increase the potassium dose beyond the recommended rate.",
      },
    },
  ];

  const matched = rules.find(
    (rule) => value >= rule.min && (rule.max === null || value <= rule.max)
  );

  return (matched ?? rules[rules.length - 1]).recommendation;
};

/**
 * Convenience helper: return only the potassium rating level (Low/Medium/High/Very High).
 */
export const getPotassiumRating = (value: number): PotassiumLevel =>
  getPotassiumRecommendation(value).level;
