"use client";

import React from "react";
import { TextInput, Dropdown } from "@/components";
import { createOtherOption } from "@/utils/dropdownHelpers";
import { BaseRecommendedDoseDisplay } from "@/components/BaseRecommendedDoseDisplay";
import type { FormData } from "../FarmerDetailsForm";
import { MdGrass } from "react-icons/md";

type FarmDetailsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export function FarmDetailsForm({
  formData,
  setFormData,
}: FarmDetailsFormProps) {
  const isApple = formData.crop === "apple";
  const isOtherCrop =
    formData.crop && formData.crop !== "apple" && formData.crop !== "";

  return (
    <div className="space-y-5">
      {/* Orchard & Crop Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Dropdown
          id="crop"
          name="crop"
          label="Crop / Plantation"
          value={formData.crop ?? ""}
          onChange={(v) => {
            setFormData((p) => {
              const newData = { ...p, crop: v };
              if (v !== "apple") {
                newData.plantationType = "";
                newData.plantationTypeOther = "";
                newData.age = "";
                newData.noTrees = "";
              }
              if (v === "apple") {
                newData.variety = "";
              }
              return newData;
            });
          }}
          options={[
            { label: "Apple", value: "apple" },
            { label: "Walnut", value: "walnut" },
            { label: "Almond", value: "almond" },
            { label: "Cherry", value: "cherry" },
            { label: "Saffron", value: "saffron" },
            { label: "Paddy", value: "paddy" },
            { label: "Rice", value: "rice" },
            { label: "Vegetables", value: "vegetables" },
            createOtherOption(),
          ]}
          otherValue={formData.cropOther ?? ""}
          onOtherValueChange={(v) => {
            setFormData((p) => {
              const newData = { ...p, cropOther: v };
              if (!v || p.crop !== "apple") {
                newData.plantationType = "";
                newData.plantationTypeOther = "";
                newData.age = "";
                newData.noTrees = "";
              }
              if (p.crop === "apple") {
                newData.variety = "";
              }
              return newData;
            });
          }}
        />

        {isApple && (
          <Dropdown
            id="plantationType"
            name="plantationType"
            label="Plantation Density / Type"
            value={formData.plantationType ?? ""}
            onChange={(v) => setFormData((p) => ({ ...p, plantationType: v }))}
            options={[
              { label: "High Density", value: "high-density" },
              { label: "Traditional / Standard", value: "traditional" },
              { label: "Semi-Dwarf", value: "semi-dwarf" },
              createOtherOption(),
            ]}
            otherValue={formData.plantationTypeOther ?? ""}
            onOtherValueChange={(v) =>
              setFormData((p) => ({ ...p, plantationTypeOther: v }))
            }
          />
        )}

        {isOtherCrop && (
          <TextInput
            id="variety"
            name="variety"
            label="Cultivar / Variety"
            value={formData.variety ?? ""}
            onChange={(e) =>
              setFormData((p) => ({ ...p, variety: e.target.value }))
            }
            placeholder="e.g. Shahi Super, Nonpareil, Kagzi"
          />
        )}

        {isApple && (
          <>
            <TextInput
              id="age"
              name="age"
              type="number"
              label="Orchard Age (Years)"
              value={formData.age === "" || formData.age === undefined ? "" : String(formData.age)}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  age: e.target.value === "" ? "" : Number(e.target.value),
                }))
              }
              placeholder="e.g. 5"
            />
            <TextInput
              id="noTrees"
              name="noTrees"
              type="number"
              label="Number of Trees"
              value={formData.noTrees === "" || formData.noTrees === undefined ? "" : String(formData.noTrees)}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  noTrees: e.target.value === "" ? "" : Number(e.target.value),
                }))
              }
              placeholder="e.g. 500"
            />
          </>
        )}

        <TextInput
          id="area"
          name="area"
          type="number"
          label="Total Farmland Area (Acres)"
          value={formData.area === "" || formData.area === undefined ? "" : String(formData.area)}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              area: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          placeholder="e.g. 4.5"
        />

        <TextInput
          id="noOfSamples"
          name="noOfSamples"
          type="number"
          label="Soil Samples Collected"
          value={formData.noOfSamples === "" || formData.noOfSamples === undefined ? "" : String(formData.noOfSamples)}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              noOfSamples: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          placeholder="e.g. 3"
        />
      </div>

      {/* Soil Characteristics & Irrigation */}
      <div className="space-y-4 pt-4 border-t border-slate-800/60">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <MdGrass className="text-emerald-400" size={16} />
          Soil Physical Properties & Irrigation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <TextInput
            id="soilDepth"
            name="soilDepth"
            label="Sampling Depth"
            value={formData.soilDepth ?? ""}
            onChange={(e) =>
              setFormData((p) => ({ ...p, soilDepth: e.target.value }))
            }
            placeholder="e.g. 0-15 cm"
          />

          <Dropdown
            id="soilType"
            name="soilType"
            label="Soil Texture / Type"
            value={formData.soilType ?? ""}
            onChange={(v) => setFormData((p) => ({ ...p, soilType: v }))}
            options={[
              { label: "Clay Loam", value: "clay-loam" },
              { label: "Sandy Loam", value: "sandy-loam" },
              { label: "Silt Loam", value: "silt-loam" },
              { label: "Loamy Sand", value: "loamy-sand" },
              { label: "Silty Clay", value: "silty-clay" },
              { label: "Clay", value: "clay" },
              createOtherOption(),
            ]}
            otherValue={formData.soilTypeOther ?? ""}
            onOtherValueChange={(v) =>
              setFormData((p) => ({ ...p, soilTypeOther: v }))
            }
          />

          <Dropdown
            id="drainage"
            name="drainage"
            label="Soil Drainage"
            value={formData.drainage ?? ""}
            onChange={(v) => setFormData((p) => ({ ...p, drainage: v }))}
            options={[
              { label: "Well Drained", value: "good" },
              { label: "Moderate Drainage", value: "moderate" },
              { label: "Poorly Drained", value: "poor" },
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
            label="Irrigation Method"
            value={formData.irrigationMethod ?? ""}
            onChange={(v) => setFormData((p) => ({ ...p, irrigationMethod: v }))}
            options={[
              { label: "Drip Irrigation", value: "drip" },
              { label: "Sprinkler Irrigation", value: "sprinkler" },
              { label: "Flood / Furrow", value: "flood" },
              { label: "Rainfed", value: "rainfed" },
              createOtherOption(),
            ]}
            otherValue={formData.irrigationMethodOther ?? ""}
            onOtherValueChange={(v) =>
              setFormData((p) => ({ ...p, irrigationMethodOther: v }))
            }
          />
        </div>
      </div>

      {/* Base Recommended Fertilizer Dose display */}
      {!isApple && (
        <BaseRecommendedDoseDisplay
          plantationType={formData.plantationType}
          age={formData.age}
          crop={formData.crop}
          cropOther={formData.cropOther}
          showOnlyForApple={true}
        />
      )}
    </div>
  );
}
