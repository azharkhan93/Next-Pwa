"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TextInput, FormError, Button, Dropdown, Checkbox } from "@/components";
import { getCurrentCoordinates, reverseGeocode } from "@/utils/geolocation";

type FormData = {
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
  plantationType?: string;
  age?: number | "";
  noTrees?: number | "";
  area?: number | "";
  noOfSamples?: number | "";
  soilDepth?: string;
  drainage?: string;
  irrigationMethod?: string;
  paramPh?: boolean;
  paramDl?: boolean;
  paramCl?: boolean;
  gender: string;
  productName: string;
  quantity: number | "";
};

const initialFormData: FormData = {
  name: "",
  address: "",
  parentage: "",
  district: "",
  pinCode: "",
  phoneNo: "",
  adharNo: "",
  khasraNo: "",
  latitude: "",
  longitude: "",
  location: "",
  city: "",
  stateVal: "",
  crop: "",
  plantationType: "",
  age: "",
  noTrees: "",
  area: "",
  noOfSamples: "",
  soilDepth: "",
  drainage: "",
  irrigationMethod: "",
  paramPh: false,
  paramDl: false,
  paramCl: false,
  gender: "",
  productName: "",
  quantity: "",
};

export function AddRecordForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState(0);
  const [locating, setLocating] = React.useState(false);
  const [attemptedLocate, setAttemptedLocate] = React.useState(false);

  const steps = React.useMemo(
    () => [
      { title: "Farmer details", fields: [] as const },
      { title: "Farm details", fields: [] as const },
      {
        title: "Details",
        fields: ["gender", "productName", "quantity"] as const,
      },
    ],
    []
  );

  const isLastStep = step === steps.length - 1;
  const progressPct = ((step + 1) / steps.length) * 100;

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "quantity" ? (value === "" ? "" : Number(value)) : value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!isLastStep) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to add data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect location once on mount (best-effort)
  React.useEffect(() => {
    if (attemptedLocate) return;
    let cancelled = false;
    const detect = async () => {
      try {
        setLocating(true);
        const coords = await getCurrentCoordinates();
        if (cancelled) return;
        setFormData((prev) => ({
          ...prev,
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
        }));
        try {
          const rev = await reverseGeocode(coords.latitude, coords.longitude);
          if (cancelled) return;
          setFormData((prev) => ({
            ...prev,
            district: rev.district ?? prev.district,
            city: rev.city ?? prev.city,
            stateVal: rev.state ?? prev.stateVal,
            pinCode: rev.postcode ?? prev.pinCode,
            location: rev.displayName ?? prev.location,
          }));
        } catch {
          // ignore reverse geocode failures
        }
      } catch (err: unknown) {
        // If user denies or geolocation fails, keep fields empty and show a gentle message
        setError(
          "Location access denied or unavailable. You can proceed without it."
        );
      } finally {
        if (!cancelled) {
          setLocating(false);
          setAttemptedLocate(true);
        }
      }
    };
    detect();
    return () => {
      cancelled = true;
    };
  }, [attemptedLocate]);

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex-1 flex items-center">
              <div
                className={`flex items-center gap-2 ${idx === 0 ? "" : "pl-2"}`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    idx <= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`${idx === step ? "font-semibold" : ""}`}>
                  {s.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4   rounded-lg   p-4">
        {step === 0 && (
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
        )}

        {step === 1 && (
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
                ]}
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
                ]}
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
                id="drainage"
                name="drainage"
                label="Drainage"
                value={formData.drainage ?? ""}
                onChange={(v) => setFormData((p) => ({ ...p, drainage: v }))}
                options={[
                  { label: "Good", value: "good" },
                  { label: "Moderate", value: "moderate" },
                  { label: "Poor", value: "poor" },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                ]}
              />
              <div />
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
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                id="gender"
                name="gender"
                label="Gender"
                placeholder="e.g., Male / Female / Other"
                value={formData.gender}
                onChange={handleChange("gender")}
              />
              <div />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                id="productName"
                name="productName"
                label="Product name"
                value={formData.productName}
                onChange={handleChange("productName")}
              />
              <TextInput
                id="quantity"
                name="quantity"
                type="number"
                label="Quantity"
                value={
                  formData.quantity === "" ? "" : String(formData.quantity)
                }
                onChange={handleChange("quantity")}
              />
            </div>
          </>
        )}

        <FormError message={error ?? undefined} />

        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="md"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
          <div className="flex items-center gap-3">
            {step > 0 && (
              <Button
                type="button"
                size="md"
                variant="outlined"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
            )}
            <Button
              className="px-8"
              type="submit"
              size="md"
              variant="primary"
              loading={loading}
            >
              {isLastStep ? "Save" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
