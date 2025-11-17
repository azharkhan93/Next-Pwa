"use client";

import React from "react";
import { TextInput } from "@/components";

export type FormData = {
  name: string;
  parentage: string;
  address: string;
  district: string;
  pinCode: string;
  phoneNo: string;
  adharNo: string;
  khasraNo: string;
  latitude: string;
  longitude: string;
  location: string;
  city: string;
  stateVal: string;
  crop?: string;
  cropOther?: string;
  plantationType?: string;
  plantationTypeOther?: string;
  age?: number | "";
  noTrees?: number | "";
  area?: number | "";
  noOfSamples?: number | "";
  soilDepth?: string;
  soilType?: string;
  soilTypeOther?: string;
  drainage?: string;
  drainageOther?: string;
  irrigationMethod?: string;
  irrigationMethodOther?: string;
  paramPh?: boolean;
  paramDl?: boolean;
  paramCl?: boolean;
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
  testResults?: Array<{
    id: string;
    labTestNo?: string;
    // Basic Parameters
    ph: string;
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
  }>;
};

type FarmerDetailsFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  locating: boolean;
};

export function FarmerDetailsForm({
  formData,
  setFormData,
  locating,
}: FarmerDetailsFormProps) {
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
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange("name")}
          required
        />
        <TextInput
          id="parentage"
          name="parentage"
          label="Parentage"
          value={formData.parentage}
          onChange={handleChange("parentage")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange("address")}
        />
        <TextInput
          id="district"
          name="district"
          label="District"
          value={formData.district}
          onChange={handleChange("district")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="pinCode"
          name="pinCode"
          label="Pin code"
          value={formData.pinCode}
          onChange={handleChange("pinCode")}
        />
        <TextInput
          id="phoneNo"
          name="phoneNo"
          type="tel"
          label="Phone No."
          autoComplete="tel"
          value={formData.phoneNo}
          onChange={handleChange("phoneNo")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="adharNo"
          name="adharNo"
          label="Adhar No."
          value={formData.adharNo}
          onChange={handleChange("adharNo")}
        />
        <TextInput
          id="khasraNo"
          name="khasraNo"
          label="Khasra No."
          value={formData.khasraNo}
          onChange={handleChange("khasraNo")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="latitude"
          name="latitude"
          label="Latitude"
          value={formData.latitude}
          onChange={handleChange("latitude")}
          disabled
        />
        <TextInput
          id="longitude"
          name="longitude"
          label="Longitude"
          value={formData.longitude}
          onChange={handleChange("longitude")}
          disabled
        />
      </div>
      {locating ? (
        <div className="text-sm text-gray-500">Detecting location…</div>
      ) : null}
    </>
  );
}

