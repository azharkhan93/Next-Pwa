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
import { ParameterSelection } from "@/components/ParameterSelection";
import { ResultsForm } from "@/components/ResultsForm";
import { useRecords } from "@/hooks/useRecords";
import {
  MdCheck,
  MdPerson,
  MdPark,
  MdScience,
  MdAssignment,
  MdArrowBack,
  MdArrowForward,
  MdSave,
} from "react-icons/md";

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
  variety: "",
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
  paramPh: true,
  paramDl: true,
  paramCl: false,
  parameterPrice: 450,
  paymentStatus: "pending",
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
      {
        id: 1,
        title: "Basic Details",
        shortTitle: "Basic",
        icon: <MdPerson size={16} />,
        desc: "Farmer & Location",
      },
      {
        id: 2,
        title: "Farm & Crop Details",
        shortTitle: "Farm & Crop",
        icon: <MdPark size={16} />,
        desc: "Land & Orchard",
      },
      {
        id: 3,
        title: "Test Parameters",
        shortTitle: "Parameters",
        icon: <MdScience size={16} />,
        desc: "Packages & Billing",
      },
      {
        id: 4,
        title: "Test Results",
        shortTitle: "Results",
        icon: <MdAssignment size={16} />,
        desc: "Lab Analysis",
      },
    ],
    []
  );

  const isLastStep = step === steps.length - 1;

  // Load existing record for edit mode
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
              paramPh: record.paramPh ?? true,
              paramDl: record.paramDl ?? true,
              paramCl: record.paramCl ?? false,
              parameterPrice: record.parameterPrice || 450,
              paymentStatus: record.paymentStatus || "pending",
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

  // Step navigation validation
  const validateCurrentStep = (): boolean => {
    setError(null);
    if (step === 0) {
      if (!formData.name || formData.name.trim() === "") {
        setError("Please enter the farmer's name to proceed.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    if (!isLastStep) {
      handleNext();
      return;
    }

    setLoading(true);
    try {
      let calcPrice = formData.parameterPrice;
      if (!calcPrice || calcPrice === 0) {
        calcPrice = 0;
        if (formData.paramPh) calcPrice += 150;
        if (formData.paramDl) calcPrice += 300;
        if (formData.paramCl) calcPrice += 350;
      }

      const firstTest = formData.testResults?.[0];
      const phVal = firstTest?.ph || formData.ph;
      const ocVal = firstTest?.organicCarbon || formData.organicCarbon;
      const nVal = firstTest?.nitrogen || formData.nitrogen;
      const pVal = firstTest?.phosphorus || formData.phosphorus;
      const kVal = firstTest?.potassium || formData.potassium;
      const caVal = firstTest?.calcium || formData.calcium;
      const mgVal = firstTest?.magnesium || formData.magnesium;

      const payload: Record<string, unknown> = {
        ...formData,
        ph: phVal,
        organicCarbon: ocVal,
        nitrogen: nVal,
        phosphorus: pVal,
        potassium: kVal,
        calcium: caVal,
        magnesium: mgVal,
        testResults: formData.testResults || [],
        parameterPrice: calcPrice > 0 ? calcPrice : null,
      };

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

  // Automatic geolocation detection on new entry
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
        // Soft fail on geolocation
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
    <div className="w-full pb-6 space-y-4 animate-in fade-in duration-300">
      {/* Header with compact title */}
      <header className="space-y-0.5">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {isEditMode ? "Modify Soil Record" : "New Soil Sample Entry"}
        </h1>
        <p className="text-slate-400 text-xs">
          4-step workflow to register diagnostic sample results & recommendations.
        </p>
      </header>

      {/* Compact 4-Step Stepper Bar */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl py-3 px-4 sm:px-6 shadow-xl">
        <div className="relative">
          {/* Background Track Line */}
          <div className="hidden md:block absolute top-[18px] left-8 right-8 h-0.5 bg-slate-800 rounded-full z-0" />
          {/* Active Track Line */}
          <div
            className="hidden md:block absolute top-[18px] left-8 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 z-0"
            style={{ width: `${(step / (steps.length - 1)) * 82}%` }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 relative z-10">
            {steps.map((s, idx) => {
              const isCompleted = step > idx;
              const isActive = step === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (idx < step || validateCurrentStep()) {
                      setStep(idx);
                    }
                  }}
                  className="flex flex-col items-center text-center gap-1.5 group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105"
                        : isActive
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/40 ring-2 ring-blue-500/30 scale-105"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {isCompleted ? <MdCheck size={18} /> : s.icon}
                  </div>

                  <div>
                    <div
                      className={`text-xs font-bold tracking-tight transition-colors ${
                        isActive
                          ? "text-blue-400 font-extrabold"
                          : isCompleted
                          ? "text-slate-200"
                          : "text-slate-400"
                      }`}
                    >
                      Step {s.id}: {s.shortTitle}
                    </div>
                    <div className="text-[10px] text-slate-400 hidden sm:block">
                      {s.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form Body with Compact Spacing */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      >
        {/* Step Content */}
        <div className="animate-in fade-in duration-300">
          {/* STEP 1: Basic Details (Farmer Information) */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <MdPerson size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Step 1: Farmer & Landowner Information
                  </h2>
                  <p className="text-xs text-slate-400">
                    Identity details, contact, and geographic orchard coordinates.
                  </p>
                </div>
              </div>
              <FarmerDetailsForm
                formData={formData}
                setFormData={setFormData}
                locating={locating}
              />
            </div>
          )}

          {/* STEP 2: Farm & Crop Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MdPark size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Step 2: Farm & Crop Specification
                  </h2>
                  <p className="text-xs text-slate-400">
                    Crop cultivar, tree density, soil depth, texture & irrigation.
                  </p>
                </div>
              </div>
              <FarmDetailsForm formData={formData} setFormData={setFormData} />
            </div>
          )}

          {/* STEP 3: Test Parameters */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <MdScience size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Step 3: Diagnostic Test Parameters & Billing
                  </h2>
                  <p className="text-xs text-slate-400">
                    Select diagnostic suites and manage billing fees.
                  </p>
                </div>
              </div>
              <ParameterSelection
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          )}

          {/* STEP 4: Test Results */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MdAssignment size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Step 4: Soil Diagnostic Test Results & Recommendations
                  </h2>
                  <p className="text-xs text-slate-400">
                    Enter nutrient values, automatic ratings & fertilizer suggestions.
                  </p>
                </div>
              </div>
              <ResultsForm formData={formData} setFormData={setFormData} />
            </div>
          )}
        </div>

        {/* Form Error Banner */}
        <FormError message={error ?? undefined} />

        {/* Navigation Footer with compact padding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <Button
            type="button"
            size="md"
            variant="secondary"
            onClick={() => router.back()}
            className="w-full sm:w-auto rounded-xl px-5 py-2 text-xs"
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {step > 0 && (
              <Button
                type="button"
                size="md"
                variant="outlined"
                onClick={handleBack}
                className="w-1/2 sm:w-auto rounded-xl px-5 py-2 text-xs flex items-center gap-1.5 !text-white"
              >
                <MdArrowBack size={16} />
                <span>Back</span>
              </Button>
            )}

            <Button
              className="w-full sm:w-auto px-6 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25"
              type="submit"
              size="md"
              variant="primary"
              loading={loading}
            >
              {isLastStep ? (
                <>
                  <MdSave size={16} />
                  <span>{isEditMode ? "Update Record" : "Save Record"}</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <MdArrowForward size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
