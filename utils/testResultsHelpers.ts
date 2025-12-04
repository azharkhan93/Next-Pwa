export type TestResult = {
  id: string;
  labTestNo?: string;
  // Basic Parameters
  ph: string;
  bufferPh?: string;
  organicCarbon: string;
  // Primary Macronutrients
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  // Secondary Macronutrients
  calcium: string;
  magnesium: string;
  sulfur: string;
  // Micronutrients
  iron: string;
  manganese: string;
  zinc: string;
  copper: string;
  boron: string;
  molybdenum: string;
  chlorine: string;
  nickel: string;
  // Other Parameters
  sodium: string;
  electricalConductivity: string;
  // Ratings
  phRating?: string;
  organicCarbonRating?: string;
  nitrogenRating?: string;
  phosphorusRating?: string;
  potassiumRating?: string;
};

/**
 * Creates a new empty test result with a unique ID
 */
export const createEmptyTestResult = (): TestResult => {
  return {
    id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    // Basic Parameters
    ph: "",
    bufferPh: "",
    organicCarbon: "",
    // Primary Macronutrients
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    // Secondary Macronutrients
    calcium: "",
    magnesium: "",
    sulfur: "",
    // Micronutrients
    iron: "",
    manganese: "",
    zinc: "",
    copper: "",
    boron: "",
    molybdenum: "",
    chlorine: "",
    nickel: "",
    // Other Parameters
    sodium: "",
    electricalConductivity: "",
    // Ratings
    phRating: "",
    organicCarbonRating: "",
    nitrogenRating: "",
    phosphorusRating: "",
    potassiumRating: "",
  };
};

/**
 * Adds a new test result to the array with labTestNo
 */
export const addTestResult = (results: TestResult[]): TestResult[] => {
  const newResult = createEmptyTestResult();
  const labTestNo = String(results.length + 1).padStart(2, "0"); // 01, 02, 03, etc.
  return [...results, { ...newResult, labTestNo }];
};

/**
 * Removes a test result by ID and renumbers labTestNo
 */
export const removeTestResult = (
  results: TestResult[],
  id: string
): TestResult[] => {
  const filtered = results.filter((result) => result.id !== id);
  // Renumber labTestNo after removal
  return filtered.map((result, index) => ({
    ...result,
    labTestNo: String(index + 1).padStart(2, "0"),
  }));
};

/**
 * Updates a specific test result by ID
 */
export const updateTestResult = (
  results: TestResult[],
  id: string,
  updates: Partial<TestResult>
): TestResult[] => {
  return results.map((result) =>
    result.id === id ? { ...result, ...updates } : result
  );
};

/**
 * Gets a test result by ID
 */
export const getTestResultById = (
  results: TestResult[],
  id: string
): TestResult | undefined => {
  return results.find((result) => result.id === id);
};

