"use client";

import React from "react";
import { TextInput, Dropdown, Checkbox } from "@/components";
import { createOtherOption } from "@/utils/dropdownHelpers";
import type { FormData } from "../FarmerDetailsForm";

type FarmDetailsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export function FarmDetailsForm({
  formData,
  setFormData,
}: FarmDetailsFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Dropdown
          id="crop"
          name="crop"
          label="Crop"
          value={formData.crop ?? ""}
          onChange={(v) => setFormData((p) => ({ ...p, crop: v }))}
          options={[
            { label: "Apple", value: "apple" },
            { label: "Paddy", value: "paddy" },
            { label: "Rice", value: "rice" },
            { label: "Vegetables", value: "vegetables" },
            { label: "Saffron", value: "saffron" },
            createOtherOption(),
          ]}
          otherValue={formData.cropOther ?? ""}
          onOtherValueChange={(v) =>
            setFormData((p) => ({ ...p, cropOther: v }))
          }
        />
        <Dropdown
          id="plantationType"
          name="plantationType"
          label="Type"
          value={formData.plantationType ?? ""}
          onChange={(v) =>
            setFormData((p) => ({ ...p, plantationType: v }))
          }
          options={[
            { label: "High Density", value: "high-density" },
            { label: "Traditional", value: "traditional" },
            createOtherOption(),
          ]}
          otherValue={formData.plantationTypeOther ?? ""}
          onOtherValueChange={(v) =>
            setFormData((p) => ({ ...p, plantationTypeOther: v }))
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="age"
          name="age"
          type="number"
          label="Age (years)"
          value={
            formData.age === "" || formData.age === undefined
              ? ""
              : String(formData.age)
          }
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              age: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        />
        <TextInput
          id="noTrees"
          name="noTrees"
          type="number"
          label="No. of Trees"
          value={
            formData.noTrees === "" || formData.noTrees === undefined
              ? ""
              : String(formData.noTrees)
          }
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              noTrees:
                e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="area"
          name="area"
          type="number"
          label="Area"
          value={
            formData.area === "" || formData.area === undefined
              ? ""
              : String(formData.area)
          }
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              area: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        />
        <TextInput
          id="noOfSamples"
          name="noOfSamples"
          type="number"
          label="No. of Samples"
          value={
            formData.noOfSamples === "" ||
            formData.noOfSamples === undefined
              ? ""
              : String(formData.noOfSamples)
          }
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              noOfSamples:
                e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="soilDepth"
          name="soilDepth"
          label="Soil Depth"
          value={formData.soilDepth ?? ""}
          onChange={(e) =>
            setFormData((p) => ({ ...p, soilDepth: e.target.value }))
          }
        />
        <Dropdown
          id="soilType"
          name="soilType"
          label="Soil Type"
          value={formData.soilType ?? ""}
          onChange={(v) => setFormData((p) => ({ ...p, soilType: v }))}
          options={[
            { label: "Sandy", value: "sandy" },
            { label: "Loam", value: "loam" },
            { label: "Clay", value: "clay" },
            createOtherOption(),
          ]}
          otherValue={formData.soilTypeOther ?? ""}
          onOtherValueChange={(v) =>
            setFormData((p) => ({ ...p, soilTypeOther: v }))
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Dropdown
          id="drainage"
          name="drainage"
          label="Drainage"
          value={formData.drainage ?? ""}
          onChange={(v) => setFormData((p) => ({ ...p, drainage: v }))}
          options={[
            { label: "Good", value: "good" },
            { label: "Moderate", value: "moderate" },
            { label: "Poor", value: "poor" },
            createOtherOption(),
          ]}
          otherValue={formData.drainageOther ?? ""}
          onOtherValueChange={(v) =>
            setFormData((p) => ({ ...p, drainageOther: v }))
          }
        />
        <Dropdown
          id="irrigationMethod"
          name="irrigationMethod"
          label="Irrigation method"
          value={formData.irrigationMethod ?? ""}
          onChange={(v) =>
            setFormData((p) => ({ ...p, irrigationMethod: v }))
          }
          options={[
            { label: "Flood", value: "flood" },
            { label: "Furrow", value: "furrow" },
            { label: "Rainfed", value: "rainfed" },
            createOtherOption(),
          ]}
          otherValue={formData.irrigationMethodOther ?? ""}
          onOtherValueChange={(v) =>
            setFormData((p) => ({ ...p, irrigationMethodOther: v }))
          }
        />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Parameters to be tested
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Checkbox
            name="paramPh"
            label="pH"
            checked={!!formData.paramPh}
            onChange={(c) => setFormData((p) => ({ ...p, paramPh: c }))}
          />
          <Checkbox
            name="paramDl"
            label="DL"
            checked={!!formData.paramDl}
            onChange={(c) => setFormData((p) => ({ ...p, paramDl: c }))}
          />
          <Checkbox
            name="paramCl"
            label="CL"
            checked={!!formData.paramCl}
            onChange={(c) => setFormData((p) => ({ ...p, paramCl: c }))}
          />
        </div>
      </div>
    </>
  );
}

