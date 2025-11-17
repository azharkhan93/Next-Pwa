export type TestResult = {
  id: string;
  labTestNo?: string;
  ph: string;
  organicCarbon: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  calcium: string;
  magnesium: string;
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
    ph: "",
    organicCarbon: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    calcium: "",
    magnesium: "",
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

