"use client";

import React from "react";
import { TextInput } from "@/components";
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating,
} from "@/utils/soilRating";
import { SoilRecommendations } from "@/components/SoilRecommendations";
import { useTestResults } from "@/utils/useTestResults";
import { AddMoreTestResultsButton } from "@/components/AddMoreTestResultsButton";
import { type TestResult } from "@/utils/testResultsHelpers";
import type { FormData } from "../FarmerDetailsForm";
import { MdDelete } from "react-icons/md";

type ResultsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

type TestResultFormProps = {
  testResult: TestResult;
  index: number;
  onUpdate: (updates: Partial<TestResult>) => void;
  onRemove: () => void;
  canRemove: boolean;
};

function TestResultForm({
  testResult,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: TestResultFormProps) {
  const handleChange =
    (field: keyof TestResult) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onUpdate({ [field]: value });
    };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Test Result {index + 1}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            aria-label="Remove test result"
          >
            <MdDelete size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id={`ph-${testResult.id}`}
          name={`ph-${testResult.id}`}
          label="pH"
          value={testResult.ph}
          onChange={handleChange("ph")}
        />
        <TextInput
          id={`organicCarbon-${testResult.id}`}
          name={`organicCarbon-${testResult.id}`}
          label="Organic Carbon (%)"
          value={testResult.organicCarbon}
          onChange={handleChange("organicCarbon")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id={`nitrogen-${testResult.id}`}
          name={`nitrogen-${testResult.id}`}
          label="Nitrogen (Kg/ha)"
          value={testResult.nitrogen}
          onChange={(e) => {
            const value = e.target.value;
            onUpdate({
              nitrogen: value,
              nitrogenRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getNitrogenRating(Number(value)),
            });
          }}
        />
        <TextInput
          id={`nitrogenRating-${testResult.id}`}
          name={`nitrogenRating-${testResult.id}`}
          label="Nitrogen rating"
          value={testResult.nitrogenRating ?? ""}
          onChange={() => {}}
          disabled
        />
        <TextInput
          id={`phosphorus-${testResult.id}`}
          name={`phosphorus-${testResult.id}`}
          label="Phosphorus (Kg/ha)"
          value={testResult.phosphorus}
          onChange={(e) => {
            const value = e.target.value;
            onUpdate({
              phosphorus: value,
              phosphorusRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getPhosphorusRating(Number(value)),
            });
          }}
        />
        <TextInput
          id={`phosphorusRating-${testResult.id}`}
          name={`phosphorusRating-${testResult.id}`}
          label="Phosphorus rating"
          value={testResult.phosphorusRating ?? ""}
          onChange={() => {}}
          disabled
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id={`potassium-${testResult.id}`}
          name={`potassium-${testResult.id}`}
          label="Potassium (Kg/ha)"
          value={testResult.potassium}
          onChange={(e) => {
            const value = e.target.value;
            onUpdate({
              potassium: value,
              potassiumRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getPotassiumRating(Number(value)),
            });
          }}
        />
        <TextInput
          id={`potassiumRating-${testResult.id}`}
          name={`potassiumRating-${testResult.id}`}
          label="Potassium rating"
          value={testResult.potassiumRating ?? ""}
          onChange={() => {}}
          disabled
        />
        <TextInput
          id={`calcium-${testResult.id}`}
          name={`calcium-${testResult.id}`}
          label="Calcium (meq/100g soil)"
          value={testResult.calcium}
          onChange={handleChange("calcium")}
        />
        <TextInput
          id={`magnesium-${testResult.id}`}
          name={`magnesium-${testResult.id}`}
          label="Magnesium (meq/100g soil)"
          value={testResult.magnesium}
          onChange={handleChange("magnesium")}
        />
      </div>

      <SoilRecommendations
        formData={{
          nitrogen: testResult.nitrogen,
          phosphorus: testResult.phosphorus,
          potassium: testResult.potassium,
        } as FormData}
      />
    </div>
  );
}

export function ResultsForm({ formData, setFormData }: ResultsFormProps) {
  const testResults = formData.testResults || [];

  const { handleAddTestResult, handleRemoveTestResult, handleUpdateTestResult } =
    useTestResults(testResults, (updatedResults) => {
      setFormData((prev) => ({
        ...prev,
        testResults: updatedResults,
      }));
    });

  if (testResults.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-6 ">
        {testResults.map((testResult, index) => (
          <TestResultForm
            key={testResult.id}
            testResult={testResult}
            index={index}
            onUpdate={(updates) =>
              handleUpdateTestResult(testResult.id, updates)
            }
            onRemove={() => handleRemoveTestResult(testResult.id)}
            canRemove={testResults.length > 1}
          />
        ))}
      </div>

      <AddMoreTestResultsButton
        onClick={handleAddTestResult}
        className="mt-4 flex justify-end mb-6"
      />
    </>
  );
}
