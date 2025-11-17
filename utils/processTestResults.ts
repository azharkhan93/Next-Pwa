import {
  getNitrogenRecommendation,
  getPhosphorusRecommendation,
  getPotassiumRecommendation,
} from "./soilRating";

type TestResultInput = Record<string, unknown>;

type ProcessedTestResult = Record<string, unknown> & {
  labTestNo: string;
  nitrogenRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
  phosphorusRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
  potassiumRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
};

/**
 * Process test results by adding labTestNo and recommendations
 * @param testResults - Array of test result objects
 * @returns Array of processed test results with labTestNo and recommendations
 */
export function processTestResults(
  testResults: TestResultInput[]
): ProcessedTestResult[] {
  if (!Array.isArray(testResults) || testResults.length === 0) {
    return [];
  }

  return testResults.map((result, index) => {
    const processedResult: ProcessedTestResult = {
      ...result,
      labTestNo: String(index + 1).padStart(2, "0"), // 01, 02, 03, etc.
    };

    // Calculate and add recommendations for nitrogen
    if (
      result.nitrogen &&
      typeof result.nitrogen === "string" &&
      result.nitrogen.trim() !== ""
    ) {
      const nValue = parseFloat(result.nitrogen);
      if (!isNaN(nValue)) {
        const nRec = getNitrogenRecommendation(nValue);
        processedResult.nitrogenRecommendation = {
          level: nRec.level,
          increasePercent: nRec.increasePercent ?? 0,
          suggestion: nRec.suggestion,
        };
      }
    }

    // Calculate and add recommendations for phosphorus
    if (
      result.phosphorus &&
      typeof result.phosphorus === "string" &&
      result.phosphorus.trim() !== ""
    ) {
      const pValue = parseFloat(result.phosphorus);
      if (!isNaN(pValue)) {
        const pRec = getPhosphorusRecommendation(pValue);
        processedResult.phosphorusRecommendation = {
          level: pRec.level,
          increasePercent: pRec.increasePercent ?? 0,
          suggestion: pRec.suggestion,
        };
      }
    }

    // Calculate and add recommendations for potassium
    if (
      result.potassium &&
      typeof result.potassium === "string" &&
      result.potassium.trim() !== ""
    ) {
      const kValue = parseFloat(result.potassium);
      if (!isNaN(kValue)) {
        const kRec = getPotassiumRecommendation(kValue);
        processedResult.potassiumRecommendation = {
          level: kRec.level,
          increasePercent: kRec.increasePercent ?? 0,
          suggestion: kRec.suggestion,
        };
      }
    }

    return processedResult;
  });
}

