"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormError, Button, Loading } from "@/components";
import { getCurrentCoordinates, reverseGeocode } from "@/utils/geolocation";
import {
  FarmerDetailsForm,
  type FormData,
} from "@/components/FarmerDetailsForm";
import { FarmDetailsForm } from "@/components/FarmDetailsForm";
import { ResultsForm } from "@/components/ResultsForm";
import { useRecords } from "@/hooks/useRecords";
import { calculateParameterPrice } from "@/utils/parameterPricing";

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
  parameterPrice: 0,
  paymentStatus: "",
  paymentDate: "",
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

type AddRecordFormProps = {
  recordId?: string;
};

export function AddRecordForm(
  { recordId }: AddRecordFormProps = {} as AddRecordFormProps
) {
  const router = useRouter();
  const {
    createRecord,
    updateRecord,
    getRecordById,
    loading: recordsLoading,
  } = useRecords();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState(0);
  const [locating, setLocating] = React.useState(false);
  const [attemptedLocate, setAttemptedLocate] = React.useState(false);
  const isEditMode = !!recordId;
  const [dataLoaded, setDataLoaded] = React.useState(false);

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

  // Fetch record data when in edit mode
  React.useEffect(() => {
    if (recordId && !dataLoaded) {
      const fetchRecord = async () => {
        setLoading(true);
        setError(null);
        try {
          const record = await getRecordById(recordId);
          if (record) {
            // Transform record data to form data format
            const transformedData: FormData = {
              name: record.name || "",
              address: record.address || "",
              parentage: record.parentage || "",
              district: record.district || "",
              pinCode: record.pinCode || "",
              phoneNo: record.phoneNo || "",
              adharNo: record.adharNo || "",
              khasraNo: record.khasraNo || "",
              latitude: record.latitude || "",
              longitude: record.longitude || "",
              location: record.location || "",
              city: record.city || "",
              stateVal: record.stateVal || "",
              crop: record.crop || "",
              cropOther: record.cropOther || "",
              variety: record.variety || "",
              plantationType: record.plantationType || "",
              plantationTypeOther: record.plantationTypeOther || "",
              age:
                record.age !== null && record.age !== undefined
                  ? record.age
                  : "",
              noTrees:
                record.noTrees !== null && record.noTrees !== undefined
                  ? record.noTrees
                  : "",
              area:
                record.area !== null && record.area !== undefined
                  ? record.area
                  : "",
              noOfSamples:
                record.noOfSamples !== null && record.noOfSamples !== undefined
                  ? record.noOfSamples
                  : "",
              soilDepth: record.soilDepth || "",
              soilType: record.soilType || "",
              soilTypeOther: record.soilTypeOther || "",
              drainage: record.drainage || "",
              drainageOther: record.drainageOther || "",
              irrigationMethod: record.irrigationMethod || "",
              irrigationMethodOther: record.irrigationMethodOther || "",
              paramPh: record.paramPh || false,
              paramDl: record.paramDl || false,
              paramCl: record.paramCl || false,
              parameterPrice: record.parameterPrice || 0,
              paymentStatus: record.paymentStatus || "",
              paymentDate: record.paymentDate || "",
              ph: record.ph || "",
              organicCarbon: record.organicCarbon || "",
              nitrogen: record.nitrogen || "",
              phosphorus: record.phosphorus || "",
              potassium: record.potassium || "",
              calcium: record.calcium || "",
              magnesium: record.magnesium || "",
              nitrogenRating: record.nitrogenRating || "",
              phosphorusRating: record.phosphorusRating || "",
              potassiumRating: record.potassiumRating || "",
              testResults: (record.testResults || []).map((result) => ({
                id: result.id || "",
                labTestNo: result.labTestNo || "",
                ph: result.ph || "",
                organicCarbon: result.organicCarbon || "",
                nitrogen: result.nitrogen || "",
                phosphorus: result.phosphorus || "",
                potassium: result.potassium || "",
                calcium: result.calcium || "",
                magnesium: result.magnesium || "",
                sulfur: result.sulfur || "",
                iron: result.iron || "",
                manganese: result.manganese || "",
                zinc: result.zinc || "",
                copper: result.copper || "",
                boron: result.boron || "",
                molybdenum: result.molybdenum || "",
                chlorine: result.chlorine || "",
                nickel: result.nickel || "",
                sodium: result.sodium || "",
                electricalConductivity: result.electricalConductivity || "",
                phRating: result.phRating,
                organicCarbonRating: result.organicCarbonRating,
                nitrogenRating: result.nitrogenRating,
                phosphorusRating: result.phosphorusRating,
                potassiumRating: result.potassiumRating,
                nitrogenRecommendation: result.nitrogenRecommendation,
                phosphorusRecommendation: result.phosphorusRecommendation,
                potassiumRecommendation: result.potassiumRecommendation,
              })),
            };
            setFormData(transformedData);
            setDataLoaded(true);
          } else {
            setError("Record not found");
          }
        } catch (err) {
          console.error("Error fetching record:", err);
          setError("Failed to load record data");
        } finally {
          setLoading(false);
        }
      };
      fetchRecord();
    }
  }, [recordId, dataLoaded, getRecordById]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!isLastStep) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      return;
    }
    setLoading(true);
    try {
      // Calculate parameter price
      const parameterPrice = calculateParameterPrice(
        !!formData.paramPh,
        !!formData.paramDl,
        !!formData.paramCl
      );

      // Prepare payload - filter out empty "other" fields
      const payload: Record<string, unknown> = {
        ...formData,
        testResults: formData.testResults || [],
        parameterPrice: parameterPrice > 0 ? parameterPrice : null,
      };

      // Remove empty "other" fields - only include if they have values
      const otherFields = [
        "cropOther",
        "plantationTypeOther",
        "soilTypeOther",
        "drainageOther",
        "irrigationMethodOther",
      ];

      otherFields.forEach((field) => {
        const value = payload[field];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          delete payload[field];
        }
      });

      // Log the full payload before sending to backend
      console.log(`=== ${isEditMode ? "Update" : "Add"}RecordForm Payload ===`);
      console.log(JSON.stringify(payload, null, 2));
      console.log("=============================");

      // Send data to backend
      let result;
      if (isEditMode && recordId) {
        result = await updateRecord(recordId, payload as Partial<FormData>);
      } else {
        result = await createRecord(payload as FormData);
      }

      if (result) {
        router.push("/dashboard/list");
      } else {
        setError(
          `Failed to ${isEditMode ? "update" : "add"} data. Please try again.`
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        `Failed to ${isEditMode ? "update" : "add"} data. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect location once on mount (best-effort) - only in add mode
  React.useEffect(() => {
    if (isEditMode || attemptedLocate) return;
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
  }, [attemptedLocate, isEditMode]);

  // Show loading state while fetching record data
  if (isEditMode && !dataLoaded && (loading || recordsLoading)) {
    return <Loading fullScreen />;
  }

  return (
    <div className="mx-auto">
      <h2 className="text-xl text-white font-semibold mb-4">
        {isEditMode ? "Edit Record" : "Add New Record"}
      </h2>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-white">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex-1 flex items-center">
              <div
                className={`flex items-center gap-2 ${idx === 0 ? "" : "pl-2"}`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    idx <= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
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
        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
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
              {isLastStep ? (isEditMode ? "Update" : "Save") : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
