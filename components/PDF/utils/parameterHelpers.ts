import { TestResult } from "@/utils/pdf/types";
import type { ParameterConfig, TestParam } from "@/utils/pdf/types";

export const parameterConfig: Record<string, ParameterConfig> = {
  ph: {
    name: "Soil pH",
    unit: "(1:2.5)",
    range: "6.5 - 7.5",
    category: "Basic Parameters",
  },
  bufferPh: {
    name: "Buffer pH",
    unit: "(1:2.5)",
    range: "6.5 - 7.5",
    category: "Basic Parameters",
  },
  organicCarbon: {
    name: "Organic Carbon (OC)",
    unit: "(%)",
    range: "0.5 - 1.0",
    category: "Basic Parameters",
  },
  nitrogen: {
    name: "Av. Nitrogen (N)",
    unit: "(Kg/ha)",
    range: "272 - 544",
    category: "Primary Macronutrients",
  },
  phosphorus: {
    name: "Av. Phosphorus (P)",
    unit: "(Kg/ha)",
    range: "10 - 20",
    category: "Primary Macronutrients",
  },
  potassium: {
    name: "Av. Potassium (K)",
    unit: "(Kg/ha)",
    range: "120 - 280",
    category: "Primary Macronutrients",
  },
  calcium: {
    name: "Calcium (Ca)",
    unit: "ppm",
    range: "150 - 300",
    category: "Secondary Macronutrients",
  },
  magnesium: {
    name: "Magnesium (Mg)",
    unit: "ppm",
    range: "50 - 100",
    category: "Secondary Macronutrients",
  },
  iron: {
    name: "Iron (Fe)",
    unit: "ppm",
    range: "4 - 6",
    category: "Micronutrients",
  },
  manganese: {
    name: "Manganese (Mn)",
    unit: "ppm",
    range: "1.2 - 3.5",
    category: "Micronutrients",
  },
  zinc: {
    name: "Zinc (Zn)",
    unit: "ppm",
    range: "1 - 3",
    category: "Micronutrients",
  },
  boron: {
    name: "Boron (B)",
    unit: "ppm",
    range: "0.5 - 1.0",
    category: "Micronutrients",
  },
  solubleSalts: {
    name: "Soluble Salts",
    unit: "(dSm⁻¹)",
    range: "< 1",
    category: "Other Parameters",
  },
};

export const getTestParams = (testResult: TestResult): TestParam[] => {
  // Map parameter keys to their rating field names
  const ratingMap: Record<string, keyof TestResult> = {
    ph: "phRating",
    organicCarbon: "organicCarbonRating",
    nitrogen: "nitrogenRating",
    phosphorus: "phosphorusRating",
    potassium: "potassiumRating",
  };

  return Object.keys(testResult)
    .filter((key) => {
      if (!parameterConfig[key]) return false;
      const value = testResult[key as keyof TestResult];
      if (!value || value === "" || value === null || value === undefined)
        return false;
      const numValue = parseFloat(String(value));
      return !isNaN(numValue);
    })
    .map((key) => {
      const value = parseFloat(String(testResult[key as keyof TestResult]));
      const config = parameterConfig[key];
      const ratingKey = ratingMap[key];
      const rating = ratingKey ? testResult[ratingKey] as string | undefined : undefined;
      
      return {
        name: config.name,
        value: value,
        unit: config.unit,
        range: config.range,
        param: key,
        category: config.category,
        rating: rating,
      };
    });
};