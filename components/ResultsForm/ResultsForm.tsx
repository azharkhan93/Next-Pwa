"use client";

import React, { useEffect } from "react";
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
import { createEmptyTestResult, type TestResult } from "@/utils/testResultsHelpers";
import type { FormData } from "../FarmerDetailsForm";
import { MdDelete, MdScience, MdBiotech } from "react-icons/md";

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
    <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <MdBiotech size={18} />
          </span>
          <h4 className="text-base font-bold text-white tracking-tight">
            Lab Sample #{index + 1} {testResult.labTestNo && `(Test No: ${testResult.labTestNo})`}
          </h4>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-all"
            aria-label="Remove test result"
          >
            <MdDelete size={16} />
            <span>Remove Sample</span>
          </button>
        )}
      </div>

      {/* Basic Parameters */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Basic Reaction & Organic Carbon
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TextInput
            id={`ph-${testResult.id}`}
            name={`ph-${testResult.id}`}
            label="Soil pH"
            value={testResult.ph}
            placeholder="e.g. 6.8"
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
            placeholder="e.g. 6.5"
          />
          <TextInput
            id={`organicCarbon-${testResult.id}`}
            name={`organicCarbon-${testResult.id}`}
            label="Organic Carbon (OC %)"
            value={testResult.organicCarbon}
            placeholder="e.g. 0.95"
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
      <div className="space-y-3 pt-3 border-t border-slate-800/60">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Primary Macronutrients (NPK)
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TextInput
            id={`nitrogen-${testResult.id}`}
            name={`nitrogen-${testResult.id}`}
            label="Available Nitrogen (Kg/ha)"
            value={testResult.nitrogen}
            placeholder="e.g. 270"
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
            label="Available Phosphorus (Kg/ha)"
            value={testResult.phosphorus}
            placeholder="e.g. 21"
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
            label="Available Potassium (Kg/ha)"
            value={testResult.potassium}
            placeholder="e.g. 245"
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
      <div className="space-y-3 pt-3 border-t border-slate-800/60">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Secondary Nutrients (Ca, Mg, S)
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput
            id={`calcium-${testResult.id}`}
            name={`calcium-${testResult.id}`}
            label="Calcium (Ca - ppm)"
            value={testResult.calcium}
            placeholder="e.g. 1600"
            onChange={handleChange("calcium")}
          />
          <TextInput
            id={`magnesium-${testResult.id}`}
            name={`magnesium-${testResult.id}`}
            label="Magnesium (Mg - ppm)"
            value={testResult.magnesium}
            placeholder="e.g. 380"
            onChange={handleChange("magnesium")}
          />
          <TextInput
            id={`sulfur-${testResult.id}`}
            name={`sulfur-${testResult.id}`}
            label="Sulfur (S - ppm)"
            value={testResult.sulfur ?? ""}
            placeholder="e.g. 16.4"
            onChange={handleChange("sulfur")}
          />
        </div>
      </div>

      {/* Micronutrients */}
      <div className="space-y-3 pt-3 border-t border-slate-800/60">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Trace Micronutrients (ppm)
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <TextInput
            id={`iron-${testResult.id}`}
            name={`iron-${testResult.id}`}
            label="Iron (Fe)"
            value={testResult.iron}
            placeholder="e.g. 5.1"
            onChange={handleChange("iron")}
          />
          <TextInput
            id={`manganese-${testResult.id}`}
            name={`manganese-${testResult.id}`}
            label="Manganese (Mn)"
            value={testResult.manganese}
            placeholder="e.g. 3.8"
            onChange={handleChange("manganese")}
          />
          <TextInput
            id={`zinc-${testResult.id}`}
            name={`zinc-${testResult.id}`}
            label="Zinc (Zn)"
            value={testResult.zinc}
            placeholder="e.g. 1.4"
            onChange={handleChange("zinc")}
          />
          <TextInput
            id={`copper-${testResult.id}`}
            name={`copper-${testResult.id}`}
            label="Copper (Cu)"
            value={testResult.copper}
            placeholder="e.g. 1.0"
            onChange={handleChange("copper")}
          />
          <TextInput
            id={`boron-${testResult.id}`}
            name={`boron-${testResult.id}`}
            label="Boron (B)"
            value={testResult.boron}
            placeholder="e.g. 0.72"
            onChange={handleChange("boron")}
          />
        </div>
      </div>

      {/* Other Parameters (EC & Salts) */}
      <div className="space-y-3 pt-3 border-t border-slate-800/60">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Electrical Conductivity & Soluble Salts
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id={`electricalConductivity-${testResult.id}`}
            name={`electricalConductivity-${testResult.id}`}
            label="Electrical Conductivity (EC - dS/m)"
            value={testResult.electricalConductivity}
            placeholder="e.g. 0.38"
            onChange={handleChange("electricalConductivity")}
          />
          <TextInput
            id={`solubleSalts-${testResult.id}`}
            name={`solubleSalts-${testResult.id}`}
            label="Soluble Salts (dS/m)"
            value={testResult.solubleSalts ?? ""}
            placeholder="e.g. 0.25"
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

  // Guarantee at least 1 test result
  useEffect(() => {
    if (!formData.testResults || formData.testResults.length === 0) {
      const initial = createEmptyTestResult();
      initial.labTestNo = "01";
      setFormData((prev) => ({
        ...prev,
        testResults: [initial],
      }));
    }
  }, [formData.testResults, setFormData]);

  const { handleAddTestResult, handleRemoveTestResult, handleUpdateTestResult } =
    useTestResults(testResults, (updatedResults) => {
      setFormData((prev) => ({
        ...prev,
        testResults: updatedResults,
      }));
    });

  const displayResults = testResults.length > 0 ? testResults : [createEmptyTestResult()];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MdScience className="text-blue-400" size={22} />
            Diagnostic Soil Test Results
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter the quantified laboratory parameters and nutrient ratings for each tested sample.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {displayResults.length} {displayResults.length === 1 ? "Sample" : "Samples"}
        </span>
      </div>

      <div className="space-y-6">
        {displayResults.map((testResult, index) => (
          <TestResultForm
            key={testResult.id || index}
            testResult={testResult}
            index={index}
            onUpdate={(updates) =>
              handleUpdateTestResult(testResult.id, updates)
            }
            onRemove={() => handleRemoveTestResult(testResult.id)}
            canRemove={displayResults.length > 1}
            formData={formData}
          />
        ))}
      </div>

      <AddMoreTestResultsButton
        onClick={handleAddTestResult}
        className="mt-4 flex justify-end mb-6"
      />
    </div>
  );
}
