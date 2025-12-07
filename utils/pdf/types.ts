export interface TestResult {
    ph?: string;
    bufferPh?: string;
    organicCarbon?: string;
    phRating?: string;
    organicCarbonRating?: string;
    nitrogen?: string;
    phosphorus?: string;
    potassium?: string;
    nitrogenRating?: string;
    phosphorusRating?: string;
    potassiumRating?: string;
    nitrogenRecommendation?: {
      level: string;
      increasePercent: number | null;
      suggestion: string;
    };
    phosphorusRecommendation?: {
      level: string;
      increasePercent: number | null;
      suggestion: string;
    };
    potassiumRecommendation?: {
      level: string;
      increasePercent: number | null;
      suggestion: string;
    };
    calcium?: string;
    magnesium?: string;
    sulfur?: string;
    iron?: string;
    manganese?: string;
    zinc?: string;
    copper?: string;
    boron?: string;
    molybdenum?: string;
    chlorine?: string;
    nickel?: string;
    sodium?: string;
    electricalConductivity?: string;
  }
  
  export interface ParameterConfig {
    name: string;
    unit: string;
    range: string;
    category: string;
  }
  
  export interface TestParam {
    name: string;
    value: number;
    unit: string;
    range: string;
    param: string;
    category: string;
    rating?: string; 
  }
  
  export type RatingLevel = "Low" | "Medium" | "High";