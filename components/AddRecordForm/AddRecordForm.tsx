"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormError, Button } from "@/components";
import { getCurrentCoordinates, reverseGeocode } from "@/utils/geolocation";
import { FarmerDetailsForm, type FormData } from "@/components/FarmerDetailsForm";
import { FarmDetailsForm } from "@/components/FarmDetailsForm";
import { ResultsForm } from "@/components/ResultsForm";
import { useRecords } from "@/hooks/useRecords";

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
  cropOther: "",
  plantationType: "",
  plantationTypeOther: "",
  age: "",
  noTrees: "",
  area: "",
  noOfSamples: "",
  soilDepth: "",
  soilType: "",
  soilTypeOther: "",
  drainage: "",
  drainageOther: "",
  irrigationMethod: "",
  irrigationMethodOther: "",
  paramPh: false,
  paramDl: false,
  paramCl: false,
  ph: "",
  organicCarbon: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  calcium: "",
  magnesium: "",
  nitrogenRating: "",
  phosphorusRating: "",
  potassiumRating: "",
  testResults: [],
};

export function AddRecordForm() {
  const router = useRouter();
  const { createRecord } = useRecords();
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
        title: "Results",
        fields: [] as const,
      },
    ],
    []
  );

  const isLastStep = step === steps.length - 1;
  const progressPct = ((step + 1) / steps.length) * 100;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!isLastStep) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      return;
    }
    setLoading(true);
    try {
      // Prepare payload - filter out empty "other" fields
      const payload: Record<string, unknown> = {
        ...formData,
        testResults: formData.testResults || [],
      };

      // Remove empty "other" fields - only include if they have values
      const otherFields = [
        'cropOther',
        'plantationTypeOther',
        'soilTypeOther',
        'drainageOther',
        'irrigationMethodOther'
      ];

      otherFields.forEach(field => {
        const value = payload[field];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          delete payload[field];
        }
      });

      // Log the full payload before sending to backend
      console.log("=== AddRecordForm Payload ===");
      console.log(JSON.stringify(payload, null, 2));
      console.log("=============================");

      // Send data to backend
      const result = await createRecord(payload as FormData);
      
      if (result) {
        router.push("/dashboard");
      } else {
        setError("Failed to add data. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
      } catch {
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
          <FarmerDetailsForm
            formData={formData}
            setFormData={setFormData}
            locating={locating}
          />
        )}

        {step === 1 && (
          <FarmDetailsForm formData={formData} setFormData={setFormData} />
        )}

        {step === 2 && (
          <ResultsForm formData={formData} setFormData={setFormData} />
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

