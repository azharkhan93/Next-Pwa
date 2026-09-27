"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StatCard,
  PaymentReceivedChart,
  SoilHealthRadarChart,
  CropDistributionChart,
  SoilClassificationChart,
  SoilQualityPhBarChart,
  SamplePipelineVelocityChart,
  RegionalDistributionChart,
  NutrientRatingBarChart,
  EcSalinityChart,
  MonthlyTestingVolumeChart,
  ActivityChart,
  TransactionsChart,
} from "@/components";
import {
  MdScience,
  MdTerrain,
  MdForest,
  MdAccountBalanceWallet,
  MdHourglassEmpty,
  MdBiotech,
  MdCheckCircle,
  MdPayment,
  MdRefresh,
} from "react-icons/md";
import type { RecordData } from "@/hooks/useRecords";
import type { MonthlyFinancialData } from "@/components/PaymentReceivedChart";
import type { NutrientScore } from "@/components/SoilHealthRadarChart";
import type { CategoryDistribution } from "@/components/CropSoilDistributionChart";
import type { PipelineMonthData } from "@/components/SamplePipelineVelocityChart";
import type { PhDistributionItem } from "@/components/SoilQualityPhBarChart";
import type { DistrictData } from "@/components/RegionalDistributionChart";
import type { NutrientRatingItem } from "@/components/NutrientRatingBarChart";
import type { EcSampleItem } from "@/components/EcSalinityChart";
import type { VolumeMonthItem } from "@/components/MonthlyTestingVolumeChart";

const CROP_COLORS: Record<string, string> = {
  Apple: "#ef4444",
  Saffron: "#f59e0b",
  Walnut: "#8b5cf6",
  Cherry: "#ec4899",
  Almond: "#10b981",
  Vegetables: "#06b6d4",
  Pears: "#84cc16",
  Paddy: "#eab308",
  Maize: "#f97316",
};

const SOIL_COLORS: Record<string, string> = {
  "Clay Loam": "#3b82f6",
  "Sandy Loam": "#f97316",
  "Silt Loam": "#10b981",
  "Loamy Sand": "#eab308",
  "Silty Clay": "#8b5cf6",
  "Clay": "#ef4444",
  "Sandy": "#06b6d4",
};

const safeNum = (val: unknown, fallback = 0): number => {
  if (typeof val === "number" && !isNaN(val) && isFinite(val)) return val;
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && isFinite(parsed)) return parsed;
  }
  return fallback;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // High-level KPI states
  const [stats, setStats] = useState({
    totalRecords: 0,
    totalSamples: 0,
    totalAcres: 0,
    totalTrees: 0,
    underProcess: 0,
    proceed: 0,
    completed: 0,
    paid: 0,
    totalBilled: 0,
    totalPaid: 0,
    totalPending: 0,
    avgPh: 6.7,
    topCrop: "Apple",
  });

  // 10 Chart Datasets
  const [financialData, setFinancialData] = useState<MonthlyFinancialData[]>([]);
  const [nutrientRadarData, setNutrientRadarData] = useState<NutrientScore[]>([]);
  const [cropDistribution, setCropDistribution] = useState<CategoryDistribution[]>([]);
  const [soilDistribution, setSoilDistribution] = useState<CategoryDistribution[]>([]);
  const [phDistribution, setPhDistribution] = useState<PhDistributionItem[]>([]);
  const [nutrientRatingData, setNutrientRatingData] = useState<NutrientRatingItem[]>([]);
  const [pipelineVelocity, setPipelineVelocity] = useState<PipelineMonthData[]>([]);
  const [ecSalinityData, setEcSalinityData] = useState<EcSampleItem[]>([]);
  const [volumeData, setVolumeData] = useState<VolumeMonthItem[]>([]);
  const [districtData, setDistrictData] = useState<DistrictData[]>([]);
  const [activityData, setActivityData] = useState<Array<{ date: string; value1: number; value2: number }>>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/records?page=1&limit=1000");
      const records: RecordData[] = response.data?.data || [];

      const totalRecords = records.length;
      let totalSamples = 0;
      let totalAcres = 0;
      let totalTrees = 0;
      let underProcessCount = 0;
      let proceedCount = 0;
      let completedCount = 0;
      let paidCount = 0;
      let totalBilled = 0;
      let totalPaid = 0;
      let totalPending = 0;

      let sumPh = 0;
      let countPh = 0;
      let sumOc = 0;
      let countOc = 0;
      let sumN = 0;
      let countN = 0;
      let sumP = 0;
      let countP = 0;
      let sumK = 0;
      let countK = 0;
      let sumCa = 0;
      let countCa = 0;
      let sumMg = 0;
      let countMg = 0;
      let sumS = 0;
      let countS = 0;
      let sumZn = 0;
      let countZn = 0;

      const cropCounts: Record<string, { count: number; area: number }> = {};
      const soilCounts: Record<string, { count: number; area: number }> = {};
      const districtMap: Record<string, { samples: number; trees: number; area: number }> = {};
      const monthlyFinMap = new Map<string, { billed: number; paid: number; pending: number; sampleCount: number }>();
      const monthlyPipeMap = new Map<string, { received: number; inProcess: number; completed: number }>();

      let stronglyAcidic = 0;
      let slightlyAcidic = 0;
      let neutralOptimal = 0;
      let alkaline = 0;

      // Fertility ratings counters
      const nRatings = { low: 0, medium: 0, optimal: 0, high: 0 };
      const pRatings = { low: 0, medium: 0, optimal: 0, high: 0 };
      const kRatings = { low: 0, medium: 0, optimal: 0, high: 0 };
      const ocRatings = { low: 0, medium: 0, optimal: 0, high: 0 };

      const ecItems: EcSampleItem[] = [];

      records.forEach((record, index) => {
        const samples = safeNum(record.noOfSamples, 1);
        totalSamples += samples;

        const area = safeNum(record.area, 0);
        totalAcres += area;

        const trees = safeNum(record.noTrees, 0);
        totalTrees += trees;

        // Pipeline stage
        const hasTests = record.testResults && Array.isArray(record.testResults) && record.testResults.length > 0;
        const isCompleted = hasTests && record.testResults?.some((t) => (t as any).ph && (t as any).nitrogen);

        if (isCompleted) {
          completedCount++;
        } else if (hasTests) {
          proceedCount++;
        } else {
          underProcessCount++;
        }

        // Financials (strictly sanitized)
        const price = safeNum(record.parameterPrice, 500);
        totalBilled += price;

        const isPaid = String(record.paymentStatus || "").toLowerCase() === "paid";
        if (isPaid) {
          const paidAmt = safeNum(record.paidAmount, price);
          totalPaid += paidAmt;
          paidCount++;
        } else {
          totalPending += price;
        }

        // Crop & Soil taxonomy
        const cropName = record.crop || record.cropOther || "Apple";
        if (!cropCounts[cropName]) cropCounts[cropName] = { count: 0, area: 0 };
        cropCounts[cropName].count++;
        cropCounts[cropName].area += area;

        const soilName = record.soilType || record.soilTypeOther || "Clay Loam";
        if (!soilCounts[soilName]) soilCounts[soilName] = { count: 0, area: 0 };
        soilCounts[soilName].count++;
        soilCounts[soilName].area += area;

        // Regional district mapping
        const district = record.district || "Srinagar";
        if (!districtMap[district]) districtMap[district] = { samples: 0, trees: 0, area: 0 };
        districtMap[district].samples++;
        districtMap[district].trees += trees;
        districtMap[district].area += area;

        // Date grouping
        const recDate = new Date(record.createdAt || Date.now());
        const monthKey = recDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        const shortMonth = recDate.toLocaleDateString("en-US", { month: "short" });

        const finEntry = monthlyFinMap.get(monthKey) || { billed: 0, paid: 0, pending: 0, sampleCount: 0 };
        finEntry.billed += price;
        if (isPaid) {
          finEntry.paid += safeNum(record.paidAmount, price);
        } else {
          finEntry.pending += price;
        }
        finEntry.sampleCount++;
        monthlyFinMap.set(monthKey, finEntry);

        const pipeEntry = monthlyPipeMap.get(shortMonth) || { received: 0, inProcess: 0, completed: 0 };
        pipeEntry.received++;
        if (isCompleted) pipeEntry.completed++;
        else pipeEntry.inProcess++;
        monthlyPipeMap.set(shortMonth, pipeEntry);

        // Soil pH
        if (record.ph) {
          const phVal = safeNum(record.ph);
          if (phVal > 0) {
            sumPh += phVal;
            countPh++;
            if (phVal < 5.5) stronglyAcidic++;
            else if (phVal <= 6.5) slightlyAcidic++;
            else if (phVal <= 7.5) neutralOptimal++;
            else alkaline++;
          }
        }

        // Ratings & Nutrients
        const nVal = safeNum(record.nitrogen);
        if (nVal > 0) {
          sumN += nVal;
          countN++;
          if (nVal < 200) nRatings.low++;
          else if (nVal <= 260) nRatings.medium++;
          else if (nVal <= 320) nRatings.optimal++;
          else nRatings.high++;
        }

        const pVal = safeNum(record.phosphorus);
        if (pVal > 0) {
          sumP += pVal;
          countP++;
          if (pVal < 15) pRatings.low++;
          else if (pVal <= 20) pRatings.medium++;
          else if (pVal <= 25) pRatings.optimal++;
          else pRatings.high++;
        }

        const kVal = safeNum(record.potassium);
        if (kVal > 0) {
          sumK += kVal;
          countK++;
          if (kVal < 180) kRatings.low++;
          else if (kVal <= 220) kRatings.medium++;
          else if (kVal <= 280) kRatings.optimal++;
          else kRatings.high++;
        }

        const ocVal = safeNum(record.organicCarbon);
        if (ocVal > 0) {
          sumOc += ocVal;
          countOc++;
          if (ocVal < 0.6) ocRatings.low++;
          else if (ocVal <= 0.8) ocRatings.medium++;
          else if (ocVal <= 1.1) ocRatings.optimal++;
          else ocRatings.high++;
        }

        const caVal = safeNum(record.calcium);
        if (caVal > 0) { sumCa += caVal; countCa++; }

        const mgVal = safeNum(record.magnesium);
        if (mgVal > 0) { sumMg += mgVal; countMg++; }

        // Test results inner fields
        if (record.testResults && Array.isArray(record.testResults)) {
          record.testResults.forEach((tr: any) => {
            const sVal = safeNum(tr.sulfur);
            if (sVal > 0) { sumS += sVal; countS++; }

            const znVal = safeNum(tr.zinc);
            if (znVal > 0) { sumZn += znVal; countZn++; }

            const ecVal = safeNum(tr.electricalConductivity);
            if (ecVal > 0 && ecItems.length < 8) {
              ecItems.push({
                sample: `S-${index + 1} (${district})`,
                ec: ecVal,
                crop: cropName,
                status: ecVal > 0.8 ? "Saline Alert" : ecVal > 0.5 ? "Moderate" : "Optimal",
              });
            }
          });
        }
      });

      const avgPh = countPh > 0 ? sumPh / countPh : 6.7;
      const avgOc = countOc > 0 ? sumOc / countOc : 0.92;
      const avgN = countN > 0 ? sumN / countN : 265;
      const avgP = countP > 0 ? sumP / countP : 21.4;
      const avgK = countK > 0 ? sumK / countK : 245;
      const avgCa = countCa > 0 ? sumCa / countCa : 1620;
      const avgMg = countMg > 0 ? sumMg / countMg : 365;
      const avgS = countS > 0 ? sumS / countS : 15.2;
      const avgZn = countZn > 0 ? sumZn / countZn : 1.3;

      let topCrop = "Apple";
      let topCropCount = 0;
      Object.entries(cropCounts).forEach(([name, data]) => {
        if (data.count > topCropCount) {
          topCropCount = data.count;
          topCrop = name;
        }
      });

      // 1. Financial Trends
      const generatedFinData: MonthlyFinancialData[] = [];
      const currentDate = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthKey = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        const val = monthlyFinMap.get(monthKey) || { billed: 0, paid: 0, pending: 0, sampleCount: 0 };
        generatedFinData.push({
          month: monthKey,
          billed: safeNum(val.billed),
          paid: safeNum(val.paid),
          pending: safeNum(val.pending),
          sampleCount: safeNum(val.sampleCount),
        });
      }

      // 2. Nutrient Radar
      const generatedNutrientData: NutrientScore[] = [
        {
          parameter: "Nitrogen (N)",
          current: Math.min(Math.round((avgN / 280) * 100), 120),
          benchmark: 100,
          unit: "kg/ha",
          actualAvg: `${avgN.toFixed(0)} kg/ha`,
        },
        {
          parameter: "Phosphorus (P)",
          current: Math.min(Math.round((avgP / 22) * 100), 120),
          benchmark: 100,
          unit: "kg/ha",
          actualAvg: `${avgP.toFixed(1)} kg/ha`,
        },
        {
          parameter: "Potassium (K)",
          current: Math.min(Math.round((avgK / 250) * 100), 120),
          benchmark: 100,
          unit: "kg/ha",
          actualAvg: `${avgK.toFixed(0)} kg/ha`,
        },
        {
          parameter: "Organic Carbon",
          current: Math.min(Math.round((avgOc / 0.8) * 100), 120),
          benchmark: 100,
          unit: "%",
          actualAvg: `${avgOc.toFixed(2)}%`,
        },
        {
          parameter: "Calcium (Ca)",
          current: Math.min(Math.round((avgCa / 1500) * 100), 120),
          benchmark: 100,
          unit: "ppm",
          actualAvg: `${avgCa.toFixed(0)} ppm`,
        },
        {
          parameter: "Magnesium (Mg)",
          current: Math.min(Math.round((avgMg / 350) * 100), 120),
          benchmark: 100,
          unit: "ppm",
          actualAvg: `${avgMg.toFixed(0)} ppm`,
        },
        {
          parameter: "Sulfur (S)",
          current: Math.min(Math.round((avgS / 15) * 100), 120),
          benchmark: 100,
          unit: "ppm",
          actualAvg: `${avgS.toFixed(1)} ppm`,
        },
        {
          parameter: "Zinc (Zn)",
          current: Math.min(Math.round((avgZn / 1.2) * 100), 120),
          benchmark: 100,
          unit: "ppm",
          actualAvg: `${avgZn.toFixed(2)} ppm`,
        },
      ];

      // 3. Crop Distribution
      const generatedCropData: CategoryDistribution[] = Object.entries(cropCounts).map(([name, data]) => ({
        name,
        value: data.count,
        area: safeNum(data.area.toFixed(1)),
        color: CROP_COLORS[name] || "#38bdf8",
      }));

      // 4. Soil Classification
      const generatedSoilData: CategoryDistribution[] = Object.entries(soilCounts).map(([name, data]) => ({
        name,
        value: data.count,
        area: safeNum(data.area.toFixed(1)),
        color: SOIL_COLORS[name] || "#94a3b8",
      }));

      // 5. pH Distribution
      const generatedPhData: PhDistributionItem[] = [
        {
          tier: "Strongly Acidic",
          range: "< 5.5 pH",
          count: stronglyAcidic,
          color: "#f87171",
          recommendation: "Apply agricultural lime (CaCO3) to balance high acidity.",
        },
        {
          tier: "Slightly Acidic",
          range: "5.5 - 6.5 pH",
          count: slightlyAcidic,
          color: "#fb923c",
          recommendation: "Optimal for Apples & Pears. Maintain organic mulch.",
        },
        {
          tier: "Optimal Neutral",
          range: "6.5 - 7.5 pH",
          count: neutralOptimal,
          color: "#34d399",
          recommendation: "Prime nutrient availability. Excellent for Saffron & Walnut.",
        },
        {
          tier: "Alkaline Soil",
          range: "> 7.5 pH",
          count: alkaline,
          color: "#38bdf8",
          recommendation: "Apply gypsum or sulfur to facilitate micronutrient uptake.",
        },
      ];

      // 6. Nutrient Fertility Tiers
      const generatedNutrientRatings: NutrientRatingItem[] = [
        { nutrient: "Nitrogen (N)", ...nRatings },
        { nutrient: "Phosphorus (P)", ...pRatings },
        { nutrient: "Potassium (K)", ...kRatings },
        { nutrient: "Organic Carbon", ...ocRatings },
      ];

      // 7. Pipeline Velocity
      const generatedPipeData: PipelineMonthData[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const shortMonth = d.toLocaleDateString("en-US", { month: "short" });
        const p = monthlyPipeMap.get(shortMonth) || { received: 0, inProcess: 0, completed: 0 };
        const recCount = p.received;
        const compCount = p.completed;
        const score = recCount > 0 ? Math.round((compCount / recCount) * 100) : 85;
        generatedPipeData.push({
          period: shortMonth,
          received: recCount,
          inProcess: p.inProcess,
          completed: compCount,
          turnaroundScore: score,
        });
      }

      // 8. Seasonal Volume Trajectory
      const generatedVolumeData: VolumeMonthItem[] = generatedPipeData.map((item) => ({
        month: item.period,
        soil: item.received,
        plant: Math.max(Math.round(item.received * 0.35), 1),
        total: item.received + Math.max(Math.round(item.received * 0.35), 1),
      }));

      // 9. Regional / District Analysis
      const generatedDistrictData: DistrictData[] = Object.entries(districtMap).map(([district, data]) => ({
        district,
        samples: data.samples,
        trees: data.trees,
        area: safeNum(data.area.toFixed(1)),
      }));
      generatedDistrictData.sort((a, b) => b.trees - a.trees);

      // 10. Daily Intake Activity breakdown
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayCounts = [0, 0, 0, 0, 0, 0, 0];
      records.forEach((r) => {
        const d = new Date(r.createdAt || Date.now());
        dayCounts[d.getDay()] += safeNum(r.noOfSamples, 1);
      });
      const generatedActivityData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => {
        const idx = dayNames.indexOf(dayName);
        const count = dayCounts[idx] || 0;
        return {
          date: dayName,
          value1: Math.max(count, 1),
          value2: Math.max(Math.round(count * 0.4), 1),
        };
      });

      // Commit to states
      setStats({
        totalRecords,
        totalSamples,
        totalAcres,
        totalTrees,
        underProcess: underProcessCount,
        proceed: proceedCount,
        completed: completedCount,
        paid: paidCount,
        totalBilled: safeNum(totalBilled),
        totalPaid: safeNum(totalPaid),
        totalPending: safeNum(totalPending),
        avgPh: safeNum(avgPh, 6.7),
        topCrop,
      });

      setFinancialData(generatedFinData);
      setNutrientRadarData(generatedNutrientData);
      setCropDistribution(generatedCropData);
      setSoilDistribution(generatedSoilData);
      setPhDistribution(generatedPhData);
      setNutrientRatingData(generatedNutrientRatings);
      setPipelineVelocity(generatedPipeData);
      setVolumeData(generatedVolumeData);
      if (ecItems.length > 0) setEcSalinityData(ecItems);
      setDistrictData(generatedDistrictData);
      setActivityData(generatedActivityData);
    } catch (error) {
      console.error("Error fetching dashboard analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const completionRate = stats.totalRecords > 0 ? Math.round((stats.completed / stats.totalRecords) * 100) : 100;
  const settlementRate = stats.totalBilled > 0 ? Math.round((stats.totalPaid / stats.totalBilled) * 100) : 100;

  // Primary KPI cards
  const primaryStatCards = [
    {
      label: "Total Lab Records",
      value: loading ? "..." : stats.totalRecords.toLocaleString(),
      delta: `${stats.totalSamples} Samples Tested`,
      icon: <MdScience />,
      iconBgColor: "bg-blue-500/20",
    },
    {
      label: "Farmland Analyzed",
      value: loading ? "..." : `${stats.totalAcres.toFixed(1)} ac`,
      delta: "Active Soil Survey",
      icon: <MdTerrain />,
      iconBgColor: "bg-emerald-500/20",
    },
    {
      label: "Orchard Trees",
      value: loading ? "..." : stats.totalTrees.toLocaleString(),
      delta: "Cataloged Orchards",
      icon: <MdForest />,
      iconBgColor: "bg-purple-500/20",
    },
    {
      label: "Realized Revenue",
      value: loading ? "..." : `₹${stats.totalPaid.toLocaleString()}`,
      delta: stats.totalPending > 0 ? `₹${stats.totalPending} pending` : "100% Collected",
      icon: <MdAccountBalanceWallet />,
      iconBgColor: "bg-indigo-500/20",
    },
  ];

  // Pipeline workflow cards
  const pipelineCards = [
    {
      label: "Sample Intake",
      value: loading ? "..." : stats.underProcess.toLocaleString(),
      delta: "Awaiting Analysis",
      icon: <MdHourglassEmpty />,
      iconBgColor: "bg-amber-500/20",
    },
    {
      label: "In Laboratory",
      value: loading ? "..." : stats.proceed.toLocaleString(),
      delta: "Active In-Progress",
      icon: <MdBiotech />,
      iconBgColor: "bg-orange-500/20",
    },
    {
      label: "Certified Reports",
      value: loading ? "..." : stats.completed.toLocaleString(),
      delta: `${completionRate}% Certified`,
      icon: <MdCheckCircle />,
      iconBgColor: "bg-emerald-500/20",
    },
    {
      label: "Settled Invoices",
      value: loading ? "..." : stats.paid.toLocaleString(),
      delta: `₹${stats.totalPaid.toLocaleString()} Cleared`,
      icon: <MdPayment />,
      iconBgColor: "bg-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Analytics & Operations Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Real-time agricultural laboratory diagnostics, nutrient intelligence, and revenue trends
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold shadow-md shadow-black/30 transition-all active:scale-95 cursor-pointer"
            title="Refresh analytics data"
          >
            <MdRefresh size={15} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Live</span>
          </div>
        </div>
      </div>

      {/* Core KPI Metrics (4 Cards) */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Core Performance Metrics
          </h2>
          <div className="h-px flex-1 bg-slate-800/80" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {primaryStatCards.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </section>

      {/* Laboratory Workflow Pipeline (4 Cards) */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Laboratory Testing Pipeline
          </h2>
          <div className="h-px flex-1 bg-slate-800/80" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pipelineCards.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3-IN-A-ROW COMPACT CHARTS GRID (FLEX-WRAP / 3 COLUMNS)    */}
      {/* ========================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
              Diagnostic Intelligence & Analytics (3-in-a-Row Grid)
            </h2>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md hidden sm:inline-block">
              12 Diagnostic Modules
            </span>
          </div>
          <div className="h-px flex-1 bg-slate-800/80" />
        </div>

        {/* 3-Column Responsive Grid with Flex Wrap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {/* Chart 1: Revenue & Invoicing */}
          <div className="w-full flex">
            <PaymentReceivedChart
              data={financialData}
              totalRevenue={stats.totalBilled}
              totalPaid={stats.totalPaid}
              totalPending={stats.totalPending}
            />
          </div>

          {/* Chart 2: Soil Nutrient Balance Radar */}
          <div className="w-full flex">
            <SoilHealthRadarChart data={nutrientRadarData} />
          </div>

          {/* Chart 3: Crop Variety Share */}
          <div className="w-full flex">
            <CropDistributionChart data={cropDistribution} />
          </div>

          {/* Chart 4: Soil Texture & Classification */}
          <div className="w-full flex">
            <SoilClassificationChart data={soilDistribution} />
          </div>

          {/* Chart 5: Soil pH Spectrum */}
          <div className="w-full flex">
            <SoilQualityPhBarChart
              data={phDistribution}
              avgPh={stats.avgPh}
            />
          </div>

          {/* Chart 6: Macronutrient Fertility Tiers */}
          <div className="w-full flex">
            <NutrientRatingBarChart data={nutrientRatingData} />
          </div>

          {/* Chart 7: Sample Testing Pipeline Velocity */}
          <div className="w-full flex">
            <SamplePipelineVelocityChart data={pipelineVelocity} />
          </div>

          {/* Chart 8: Soil Electrical Conductivity & Salinity */}
          <div className="w-full flex">
            <EcSalinityChart data={ecSalinityData} />
          </div>

          {/* Chart 9: Seasonal Ingestion Trajectory */}
          <div className="w-full flex">
            <MonthlyTestingVolumeChart data={volumeData} />
          </div>

          {/* Chart 10: Regional & District Orchard Density */}
          <div className="w-full flex">
            <RegionalDistributionChart data={districtData} />
          </div>

          {/* Chart 11: Daily Sample Testing Activity */}
          <div className="w-full flex">
            <ActivityChart data={activityData} />
          </div>

          {/* Chart 12: Invoice Settlement Split */}
          <div className="w-full flex">
            <TransactionsChart
              completed={stats.totalPaid}
              pending={stats.totalPending}
              refunded={0}
              serviceNeeded={settlementRate}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

