"use client";

import React from "react";
import { Checkbox, TextInput, Dropdown } from "@/components";
import { formatPrice } from "@/utils/parameterPricing";
import type { FormData } from "@/components/FarmerDetailsForm";
import {
  MdScience,
  MdPayment,
  MdCheckCircle,
} from "react-icons/md";

type ParameterSelectionProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const TEST_PACKAGES = [
  {
    key: "paramPh" as const,
    title: "Basic Soil Reaction (pH & EC)",
    desc: "Soil pH, Buffer pH, Electrical Conductivity & Salinity",
    price: 150,
  },
  {
    key: "paramDl" as const,
    title: "Macronutrient Profile (NPK + OC)",
    desc: "Nitrogen, Phosphorus, Potassium & Organic Carbon",
    price: 300,
  },
  {
    key: "paramCl" as const,
    title: "Secondary & Micronutrients",
    desc: "Calcium, Magnesium, Sulfur, Zinc, Iron, Mn, Cu, Boron",
    price: 350,
  },
];

const INDIVIDUAL_PARAMETERS = [
  { label: "Soil pH", defaultPkg: "paramPh" },
  { label: "Buffer pH", defaultPkg: "paramPh" },
  { label: "Electrical Conductivity (EC)", defaultPkg: "paramPh" },
  { label: "Organic Carbon (OC)", defaultPkg: "paramDl" },
  { label: "Available Nitrogen (N)", defaultPkg: "paramDl" },
  { label: "Available Phosphorus (P)", defaultPkg: "paramDl" },
  { label: "Available Potassium (K)", defaultPkg: "paramDl" },
  { label: "Calcium (Ca)", defaultPkg: "paramCl" },
  { label: "Magnesium (Mg)", defaultPkg: "paramCl" },
  { label: "Sulfur (S)", defaultPkg: "paramCl" },
  { label: "Zinc (Zn)", defaultPkg: "paramCl" },
  { label: "Iron (Fe)", defaultPkg: "paramCl" },
  { label: "Manganese (Mn)", defaultPkg: "paramCl" },
  { label: "Copper (Cu)", defaultPkg: "paramCl" },
  { label: "Boron (B)", defaultPkg: "paramCl" },
];

export function ParameterSelection({ formData, setFormData }: ParameterSelectionProps) {
  const calcPrice = React.useMemo(() => {
    let total = 0;
    if (formData.paramPh) total += 150;
    if (formData.paramDl) total += 300;
    if (formData.paramCl) total += 350;
    return total;
  }, [formData.paramPh, formData.paramDl, formData.paramCl]);

  React.useEffect(() => {
    if (formData.parameterPrice !== calcPrice) {
      setFormData((prev) => ({
        ...prev,
        parameterPrice: calcPrice,
      }));
    }
  }, [calcPrice, formData.parameterPrice, setFormData]);

  const togglePackage = (pkgKey: "paramPh" | "paramDl" | "paramCl") => {
    setFormData((prev) => {
      const currentVal = !!prev[pkgKey];
      return {
        ...prev,
        [pkgKey]: !currentVal,
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Testing Packages */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <MdScience size={18} />
          </span>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Select Diagnostic Packages & Suites
            </h3>
            <p className="text-xs text-slate-400">
              Select parameters to include in this sample test.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TEST_PACKAGES.map((pkg) => {
            const isSelected = !!formData[pkg.key];
            return (
              <div
                key={pkg.key}
                onClick={() => togglePackage(pkg.key)}
                className={`group cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-bold text-white text-sm leading-tight group-hover:text-blue-300 transition-colors">
                      {pkg.title}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                        isSelected
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-slate-700 bg-slate-800/60"
                      }`}
                    >
                      {isSelected && <MdCheckCircle size={14} />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{pkg.desc}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Fee:</span>
                  <span className="text-sm font-extrabold text-blue-400">₹{pkg.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Included Lab Parameters Summary */}
      <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/60 space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Included Parameters in Selected Packages
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {INDIVIDUAL_PARAMETERS.map((param, idx) => {
            const isIncluded =
              (param.defaultPkg === "paramPh" && formData.paramPh) ||
              (param.defaultPkg === "paramDl" && formData.paramDl) ||
              (param.defaultPkg === "paramCl" && formData.paramCl);
            return (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                  isIncluded
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold"
                    : "bg-slate-900/30 border-slate-800/40 text-slate-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isIncluded ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-slate-700"
                  }`}
                />
                <span className="truncate">{param.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Billing & Payment Information */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <MdPayment size={16} />
            </span>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Billing & Payment Settlement
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            Total Fee: <strong className="text-base text-white font-extrabold ml-1">{formatPrice(calcPrice)}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Dropdown
            id="paymentStatus"
            name="paymentStatus"
            label="Payment Status"
            value={formData.paymentStatus ?? "pending"}
            onChange={(v) => {
              setFormData((p) => ({
                ...p,
                paymentStatus: v,
                paidAmount: v === "paid" ? (p.paidAmount || calcPrice) : p.paidAmount,
              }));
            }}
            options={[
              { value: "pending", label: "Pending" },
              { value: "in progress", label: "In Progress / Partial" },
              { value: "paid", label: "Paid / Settled" },
            ]}
          />

          <TextInput
            id="paidAmount"
            name="paidAmount"
            label="Paid Amount (₹)"
            type="number"
            value={formData.paidAmount !== undefined && formData.paidAmount !== null ? String(formData.paidAmount) : ""}
            onChange={(e) => {
              const val = e.target.value;
              setFormData((p) => ({
                ...p,
                paidAmount: val === "" ? 0 : parseFloat(val),
              }));
            }}
            placeholder={String(calcPrice)}
          />

          <TextInput
            id="paymentDate"
            name="paymentDate"
            label="Invoicing Date"
            type="date"
            value={
              formData.paymentDate
                ? typeof formData.paymentDate === "string"
                  ? formData.paymentDate.split("T")[0]
                  : new Date(formData.paymentDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              setFormData((p) => ({
                ...p,
                paymentDate: e.target.value,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
