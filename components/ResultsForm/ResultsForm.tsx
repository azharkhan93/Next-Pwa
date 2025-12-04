"use client";

import React from "react";
import { TextInput } from "@/components";
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating,
  getPhRating,
  getOrganicCarbonRating,
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
  formData: FormData;
};

function TestResultForm({
  testResult,
  index,
  onUpdate,
  onRemove,
  canRemove,
  formData,
}: TestResultFormProps) {
  const handleChange =
    (field: keyof TestResult) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onUpdate({ [field]: value });
    };

  return (
    <div className=" rounded-lg p-4  space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">
          Test Result {index + 1} {testResult.labTestNo && `(Lab #${testResult.labTestNo})`}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            aria-label="Remove test result"
          >
            <MdDelete size={20} />
          </button>
        )}
      </div>

      {/* Basic Parameters */}
      <div>
        <h5 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
          Basic Parameters
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id={`ph-${testResult.id}`}
            name={`ph-${testResult.id}`}
            label="pH"
            value={testResult.ph}
            onChange={(e) => {
              const value = e.target.value;
              onUpdate({
                ph: value,
                phRating:
                  value === "" || isNaN(Number(value))
                    ? ""
                    : getPhRating(Number(value)),
              });
            }}
          />
          <TextInput
            id={`phRating-${testResult.id}`}
            name={`phRating-${testResult.id}`}
            label="pH Rating"
            value={testResult.phRating ?? ""}
            onChange={() => {}}
            disabled
          />
          <TextInput
            id={`bufferPh-${testResult.id}`}
            name={`bufferPh-${testResult.id}`}
            label="Buffer pH"
            value={testResult.bufferPh ?? ""}
            onChange={handleChange("bufferPh")}
            placeholder="Enter buffer pH value"
          />
          <TextInput
            id={`organicCarbon-${testResult.id}`}
            name={`organicCarbon-${testResult.id}`}
            label="Organic Carbon (%)"
            value={testResult.organicCarbon}
            onChange={(e) => {
              const value = e.target.value;
              onUpdate({
                organicCarbon: value,
                organicCarbonRating:
                  value === "" || isNaN(Number(value))
                    ? ""
                    : getOrganicCarbonRating(Number(value)),
              });
            }}
          />
          <TextInput
            id={`organicCarbonRating-${testResult.id}`}
            name={`organicCarbonRating-${testResult.id}`}
            label="Organic Carbon Rating"
            value={testResult.organicCarbonRating ?? ""}
            onChange={() => {}}
            disabled
          />
        </div>
      </div>

      {/* Primary Macronutrients */}
      <div>
        <h5 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
          Primary Macronutrients
        </h5>
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
            label="Nitrogen Rating"
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
            label="Phosphorus Rating"
            value={testResult.phosphorusRating ?? ""}
            onChange={() => {}}
            disabled
          />
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
            label="Potassium Rating"
            value={testResult.potassiumRating ?? ""}
            onChange={() => {}}
            disabled
          />
        </div>
      </div>

      {/* Secondary Macronutrients */}
      <div>
        <h5 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
          Secondary Macronutrients
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id={`calcium-${testResult.id}`}
            name={`calcium-${testResult.id}`}
            label="Calcium (ppm)"
            value={testResult.calcium}
            onChange={handleChange("calcium")}
          />
          <TextInput
            id={`magnesium-${testResult.id}`}
            name={`magnesium-${testResult.id}`}
            label="Magnesium (ppm)"
            value={testResult.magnesium}
            onChange={handleChange("magnesium")}
          />
          
        </div>
      </div>

      {/* Micronutrients */}
      <div>
        <h5 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
          Micronutrients
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id={`iron-${testResult.id}`}
            name={`iron-${testResult.id}`}
            label="Iron (Fe) - ppm"
            value={testResult.iron}
            onChange={handleChange("iron")}
          />
          <TextInput
            id={`manganese-${testResult.id}`}
            name={`manganese-${testResult.id}`}
            label="Manganese (Mn) - ppm"
            value={testResult.manganese}
            onChange={handleChange("manganese")}
          />
          <TextInput
            id={`zinc-${testResult.id}`}
            name={`zinc-${testResult.id}`}
            label="Zinc (Zn) - ppm"
            value={testResult.zinc}
            onChange={handleChange("zinc")}
          />
          <TextInput
            id={`copper-${testResult.id}`}
            name={`copper-${testResult.id}`}
            label="Copper (Cu) - ppm"
            value={testResult.copper}
            onChange={handleChange("copper")}
          />
          <TextInput
            id={`boron-${testResult.id}`}
            name={`boron-${testResult.id}`}
            label="Boron (B) - ppm"
            value={testResult.boron}
            onChange={handleChange("boron")}
          />
         
          {/* <TextInput
            id={`chlorine-${testResult.id}`}
            name={`chlorine-${testResult.id}`}
            label="Chlorine (Cl) - ppm"
            value={testResult.chlorine}
            onChange={handleChange("chlorine")}
          />
          <TextInput
            id={`nickel-${testResult.id}`}
            name={`nickel-${testResult.id}`}
            label="Nickel (Ni) - ppm"
            value={testResult.nickel}
            onChange={handleChange("nickel")}
          /> */}
        </div>
      </div>

      {/* Other Parameters */}
      <div>
        <h5 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
          Other Parameters
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         
          <TextInput
            id={`electricalConductivity-${testResult.id}`}
            name={`electricalConductivity-${testResult.id}`}
            label="Electrical Conductivity (EC) - dS/m"
            value={testResult.electricalConductivity}
            onChange={handleChange("electricalConductivity")}
          />
          <TextInput
            id={`solubleSalts-${testResult.id}`}
            name={`solubleSalts-${testResult.id}`}
            label="Soluble Salts - dS/m"
            value={testResult.solubleSalts ?? ""}
            onChange={handleChange("solubleSalts")}
          />
        </div>
      </div>

      <SoilRecommendations
        formData={{
          ...formData,
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
            formData={formData}
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
