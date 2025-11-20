import { useEffect, useCallback } from "react";
import {
  createEmptyTestResult,
  addTestResult,
  removeTestResult,
  updateTestResult,
  type TestResult,
} from "./testResultsHelpers";

type UseTestResultsReturn = {
  handleAddTestResult: () => void;
  handleRemoveTestResult: (id: string) => void;
  handleUpdateTestResult: (id: string, updates: Partial<TestResult>) => void;
};

export function useTestResults(
  testResults: TestResult[],
  onUpdate: (results: TestResult[]) => void
): UseTestResultsReturn {
  // Initialize with one test result if empty
  useEffect(() => {
    if (testResults.length === 0) {
      const initial = createEmptyTestResult();
      initial.labTestNo = "01";
      onUpdate([initial]);
    } else {
      // Ensure all test results have labTestNo
      const needsRenumbering = testResults.some(
        (result, index) =>
          result.labTestNo !== String(index + 1).padStart(2, "0")
      );
      if (needsRenumbering) {
        const renumbered = testResults.map((result, index) => ({
          ...result,
          labTestNo: String(index + 1).padStart(2, "0"),
        }));
        onUpdate(renumbered);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTestResult = useCallback(() => {
    const updated = addTestResult(testResults);
    onUpdate(updated);
  }, [testResults, onUpdate]);

  const handleRemoveTestResult = useCallback(
    (id: string) => {
      const updated = removeTestResult(testResults, id);
      onUpdate(updated);
    },
    [testResults, onUpdate]
  );

  const handleUpdateTestResult = useCallback(
    (id: string, updates: Partial<TestResult>) => {
      const updated = updateTestResult(testResults, id, updates);
      onUpdate(updated);
    },
    [testResults, onUpdate]
  );

  return {
    handleAddTestResult,
    handleRemoveTestResult,
    handleUpdateTestResult,
  };
}
