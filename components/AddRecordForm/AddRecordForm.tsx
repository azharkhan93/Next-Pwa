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
import { MdCheck } from "react-icons/md";

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
  paidAmount: 0,
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
      { title: "Farmer details" },
      { title: "Farm details" },
      { title: "Test Results" },
    ],
    []
  );

  const isLastStep = step === steps.length - 1;
  const progressPct = ((step + 1) / steps.length) * 100;

  React.useEffect(() => {
    if (recordId && !dataLoaded) {
      const fetchRecord = async () => {
        setLoading(true);
        setError(null);
        try {
          const record = await getRecordById(recordId);
          if (record) {
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
              age: record.age !== null && record.age !== undefined ? record.age : "",
              noTrees: record.noTrees !== null && record.noTrees !== undefined ? record.noTrees : "",
              area: record.area !== null && record.area !== undefined ? record.area : "",
              noOfSamples: record.noOfSamples !== null && record.noOfSamples !== undefined ? record.noOfSamples : "",
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
              paidAmount: record.paidAmount || 0,
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
                bufferPh: result.bufferPh || "",
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
                solubleSalts: result.solubleSalts || "",
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
      const parameterPrice = calculateParameterPrice(
        !!formData.paramPh,
        !!formData.paramDl,
        !!formData.paramCl
      );

      const payload: Record<string, unknown> = {
        ...formData,
        testResults: formData.testResults || [],
        parameterPrice: parameterPrice > 0 ? parameterPrice : null,
      };

      const otherFields = ["cropOther", "plantationTypeOther", "soilTypeOther", "drainageOther", "irrigationMethodOther"];
      otherFields.forEach((field) => {
        const value = payload[field];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          delete payload[field];
        }
      });

      let result;
      if (isEditMode && recordId) {
        result = await updateRecord(recordId, payload as Partial<FormData>);
      } else {
        result = await createRecord(payload as FormData);
      }

      if (result) {
        router.push("/dashboard/list");
      } else {
        setError(`Failed to ${isEditMode ? "update" : "add"} data. Please try again.`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(`Failed to ${isEditMode ? "update" : "add"} data. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isEditMode || attemptedLocate) return;
    const detect = async () => {
      try {
        setLocating(true);
        const coords = await getCurrentCoordinates();
        setFormData((prev) => ({
          ...prev,
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
        }));
        try {
          const rev = await reverseGeocode(coords.latitude, coords.longitude);
          setFormData((prev) => ({
            ...prev,
            district: rev.district ?? prev.district,
            city: rev.city ?? prev.city,
            stateVal: rev.state ?? prev.stateVal,
            pinCode: rev.postcode ?? prev.pinCode,
            location: rev.displayName ?? prev.location,
          }));
        } catch {}
      } catch {
        setError("Location access denied or unavailable.");
      } finally {
        setLocating(false);
        setAttemptedLocate(true);
      }
    };
    detect();
  }, [attemptedLocate, isEditMode]);

  if (isEditMode && !dataLoaded && (loading || recordsLoading)) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {isEditMode ? "Modify Record" : "New Entry"}
        </h1>
        <p className="text-slate-400 text-sm">Please fill out the information below to {isEditMode ? "update" : "save"} the record.</p>
      </header>

      {/* Modern Stepper */}
      <div className="relative py-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 ease-out" 
          style={{ width: `${((step) / (steps.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((s, idx) => {
            const isCompleted = step > idx;
            const isActive = step === idx;
            return (
              <div key={s.title} className="flex flex-col items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10 ${
                    isCompleted 
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                      : isActive 
                        ? "bg-slate-900 text-blue-400 border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                        : "bg-slate-900 text-slate-500 border-2 border-white/5"
                  }`}
                >
                  {isCompleted ? <MdCheck size={20} /> : idx + 1}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${isActive ? "text-white" : "text-slate-500"}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
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
        </div>

        <FormError message={error ?? undefined} />

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <Button
            type="button"
            size="md"
            variant="secondary"
            onClick={() => router.back()}
            className="rounded-xl px-6"
          >
            Cancel
          </Button>
          
          <div className="flex items-center gap-4">
            {step > 0 && (
              <Button
                type="button"
                size="md"
                variant="outlined"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="rounded-xl px-6"
              >
                Back
              </Button>
            )}
            <Button
              className="px-10 rounded-xl"
              type="submit"
              size="md"
              variant="primary"
              loading={loading}
            >
              {isLastStep ? (isEditMode ? "Update Record" : "Save Record") : "Continue"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
