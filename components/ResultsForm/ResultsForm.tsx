"use client";

import React from "react";
import { TextInput } from "@/components";
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating,
} from "@/utils/soilRating";
import { SoilRecommendations } from "@/components/SoilRecommendations";
import type { FormData } from "../FarmerDetailsForm";

type ResultsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export function ResultsForm({ formData, setFormData }: ResultsFormProps) {
  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="ph"
          name="ph"
          label="pH"
          value={formData.ph}
          onChange={handleChange("ph")}
        />
        <TextInput
          id="organicCarbon"
          name="organicCarbon"
          label="Organic Carbon (%)"
          value={formData.organicCarbon}
          onChange={handleChange("organicCarbon")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="nitrogen"
          name="nitrogen"
          label="Nitrogen (Kg/ha)"
          value={formData.nitrogen}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              nitrogen: value,
              nitrogenRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getNitrogenRating(Number(value)),
            }));
          }}
        />
        <TextInput
          id="nitrogenRating"
          name="nitrogenRating"
          label="Nitrogen rating"
          value={formData.nitrogenRating ?? ""}
          onChange={() => {}}
          disabled
        />
        <TextInput
          id="phosphorus"
          name="phosphorus"
          label="Phosphorus (Kg/ha)"
          value={formData.phosphorus}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              phosphorus: value,
              phosphorusRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getPhosphorusRating(Number(value)),
            }));
          }}
        />
        <TextInput
          id="phosphorusRating"
          name="phosphorusRating"
          label="Phosphorus rating"
          value={formData.phosphorusRating ?? ""}
          onChange={() => {}}
          disabled
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="potassium"
          name="potassium"
          label="Potassium (Kg/ha)"
          value={formData.potassium}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              potassium: value,
              potassiumRating:
                value === "" || isNaN(Number(value))
                  ? ""
                  : getPotassiumRating(Number(value)),
            }));
          }}
        />
        <TextInput
          id="potassiumRating"
          name="potassiumRating"
          label="Potassium rating"
          value={formData.potassiumRating ?? ""}
          onChange={() => {}}
          disabled
        />
        <TextInput
          id="calcium"
          name="calcium"
          label="Calcium (meq/100g soil)"
          value={formData.calcium}
          onChange={handleChange("calcium")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="magnesium"
          name="magnesium"
          label="Magnesium (meq/100g soil)"
          value={formData.magnesium}
          onChange={handleChange("magnesium")}
        />
      </div>

      {/* Soil Recommendations Component */}
      <SoilRecommendations formData={formData} />
    </>
  );
}

