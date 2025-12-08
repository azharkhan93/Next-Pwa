"use client";

import React from "react";
import { TextInput, Dropdown } from "@/components";
import { createOtherOption } from "@/utils/dropdownHelpers";
import { BaseRecommendedDoseDisplay } from "@/components/BaseRecommendedDoseDisplay";
import { ParameterSelection } from "@/components/ParameterSelection";
import type { FormData } from "../FarmerDetailsForm";

type FarmDetailsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export function FarmDetailsForm({
  formData,
  setFormData,
}: FarmDetailsFormProps) {
  // Determine if crop is apple
  const isApple = formData.crop === "apple";
  // Determine if crop is selected and not apple
  const isOtherCrop =
    formData.crop && formData.crop !== "apple" && formData.crop !== "";

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Dropdown
          id="crop"
          name="crop"
          label="Crop"
          value={formData.crop ?? ""}
          onChange={(v) => {
            setFormData((p) => {
              const newData = { ...p, crop: v };
              // Clear apple-specific fields when switching away from apple
              if (v !== "apple") {
                newData.plantationType = "";
                newData.plantationTypeOther = "";
                newData.age = "";
                newData.noTrees = "";
              }
              // Clear variety when switching to apple
              if (v === "apple") {
                newData.variety = "";
              }
              return newData;
            });
          }}
          options={[
            { label: "Apple", value: "apple" },
            { label: "Paddy", value: "paddy" },
            { label: "Rice", value: "rice" },
            { label: "Vegetables", value: "vegetables" },
            { label: "Saffron", value: "saffron" },
            createOtherOption(),
          ]}
          otherValue={formData.cropOther ?? ""}
          onOtherValueChange={(v) => {
            setFormData((p) => {
              const newData = { ...p, cropOther: v };
              // If "other" is cleared or crop is not apple, clear apple fields
              if (!v || p.crop !== "apple") {
                newData.plantationType = "";
                newData.plantationTypeOther = "";
                newData.age = "";
                newData.noTrees = "";
              }
              // If crop is apple, clear variety
              if (p.crop === "apple") {
                newData.variety = "";
              }
              return newData;
            });
          }}
        />
        {/* Show Type dropdown only for Apple */}
        {isApple && (
          <Dropdown
            id="plantationType"
            name="plantationType"
            label="Type"
            value={formData.plantationType ?? ""}
            onChange={(v) => setFormData((p) => ({ ...p, plantationType: v }))}
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
        )}
        {/* Show Variety field only for non-Apple crops */}
        {isOtherCrop && (
          <TextInput
            id="variety"
            name="variety"
            label="Variety"
            value={formData.variety ?? ""}
            onChange={(e) =>
              setFormData((p) => ({ ...p, variety: e.target.value }))
            }
          />
        )}
      </div>
      {/* Show Age and No. of Trees only for Apple */}
      {isApple && (
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
                noTrees: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
          />
        </div>
      )}
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
            formData.noOfSamples === "" || formData.noOfSamples === undefined
              ? ""
              : String(formData.noOfSamples)
          }
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              noOfSamples: e.target.value === "" ? "" : Number(e.target.value),
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
          onChange={(v) => setFormData((p) => ({ ...p, irrigationMethod: v }))}
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
      <ParameterSelection />
      {/* <ParameterSelection
        paramPh={!!formData.paramPh}
        paramDl={!!formData.paramDl}
        paramCl={!!formData.paramCl}
        onParamPhChange={(c) => setFormData((p) => ({ ...p, paramPh: c }))}
        onParamDlChange={(c) => setFormData((p) => ({ ...p, paramDl: c }))}
        onParamClChange={(c) => setFormData((p) => ({ ...p, paramCl: c }))}
      /> */}

      {/* Payment Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Dropdown
          id="paymentStatus"
          name="paymentStatus"
          label="Payment Status"
          value={formData.paymentStatus ?? ""}
          onChange={(v) => {
            setFormData((p) => ({
              ...p,
              paymentStatus: v,
              // Clear paid amount if status is not "paid"
              paidAmount: v === "paid" ? p.paidAmount : undefined,
            }));
          }}
          options={[
            { value: "pending", label: "Pending" },
            { value: "in progress", label: "In Progress" },
            { value: "paid", label: "Paid" },
          ]}
        />
        {formData.paymentStatus === "paid" && (
          <TextInput
            id="paidAmount"
            name="paidAmount"
            label="Enter Paid Amount (₹)"
            type="number"
            value={formData.paidAmount ? String(formData.paidAmount) : ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((p) => ({
                ...p,
                paidAmount: value === "" ? undefined : parseFloat(value),
              }));
            }}
            placeholder="Enter amount"
          />
        )}
      </div>

      <BaseRecommendedDoseDisplay
        plantationType={formData.plantationType}
        age={formData.age}
        crop={formData.crop}
        cropOther={formData.cropOther}
        showOnlyForApple={true}
      />
    </>
  );
}
