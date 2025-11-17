export type TestResult = {
  id?: string;
  labTestNo?: string;
  ph?: string;
  organicCarbon?: string;
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
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
  phRating?: string;
  organicCarbonRating?: string;
  nitrogenRating?: string;
  phosphorusRating?: string;
  potassiumRating?: string;
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

