"use client";

import { StatCard, PaymentReceivedChart } from "@/components";
import React from "react";
import axios from "axios";
import {
  MdScience,
  MdGrass,
  MdLocalFlorist,
  MdHourglassEmpty,
  MdPlayArrow,
  MdCheckCircle,
  MdPayment,
} from "react-icons/md";
import type { RecordData } from "@/hooks/useRecords";

export default function DashboardPage() {
  const [stats, setStats] = React.useState({
    totalSamples: 0,
    totalSoilSamples: 0,
    totalPlants: 0,
    underProcess: 0,
    proceed: 0,
    completed: 0,
    paid: 0,
    loading: true,
  });

  const [paymentData, setPaymentData] = React.useState<
    Array<{ month: string; amount: number }>
  >([]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/records?page=1&limit=1000");
        const records: RecordData[] = response.data?.data || [];

        const totalSamples = records.reduce((sum, record) => {
          const samples = record.noOfSamples;
          return typeof samples === "number" && samples > 0 ? sum + samples : sum;
        }, 0);

        const totalSoilSamples = records.filter((record) => {
          return (
            record.paramPh ||
            record.paramDl ||
            record.paramCl ||
            (record.testResults && record.testResults.length > 0)
          );
        }).length;

        const totalPlants = records.reduce((sum, record) => {
          const trees = record.noTrees;
          return typeof trees === "number" && trees > 0 ? sum + trees : sum;
        }, 0);

        const underProcess = records.filter((record) => {
          return (
            (record.paramPh || record.paramDl || record.paramCl) &&
            (!record.testResults || record.testResults.length === 0)
          );
        }).length;

        const proceed = records.filter((record) => {
          return record.testResults && record.testResults.length > 0 && Array.isArray(record.testResults);
        }).length;

        const completed = records.filter((record) => {
          if (!record.testResults || !Array.isArray(record.testResults)) return false;
          return record.testResults.some((test) => {
            if (typeof test === "object" && test !== null) {
              const tr = test as { nitrogen?: string; phosphorus?: string; potassium?: string; ph?: string };
              return tr.nitrogen && tr.phosphorus && tr.potassium && tr.ph;
            }
            return false;
          });
        }).length;

        const paid = completed;
        const monthlyPayments = new Map<string, number>();
        const pricePerParameter = 50;

        records.forEach((record) => {
          if (record.testResults && Array.isArray(record.testResults) && record.testResults.length > 0) {
            const recordDate = new Date(record.createdAt || Date.now());
            const monthKey = recordDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
            let paramCount = 0;
            if (record.paramPh) paramCount++;
            if (record.paramDl) paramCount++;
            if (record.paramCl) paramCount++;
            monthlyPayments.set(monthKey, (monthlyPayments.get(monthKey) || 0) + (paramCount * pricePerParameter));
          }
        });

        const paymentChartData: Array<{ month: string; amount: number }> = [];
        const currentDate = new Date();
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
          paymentChartData.push({ month: monthKey, amount: monthlyPayments.get(monthKey) || 0 });
        }

        setStats({
          totalSamples,
          totalSoilSamples,
          totalPlants,
          underProcess,
          proceed,
          completed,
          paid,
          loading: false,
        });
        setPaymentData(paymentChartData);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Samples",
      value: stats.loading ? "..." : stats.totalSamples.toLocaleString(),
      icon: <MdScience />,
      iconBgColor: "bg-blue-500/20",
    },
    {
      label: "Total Soil Samples",
      value: stats.loading ? "..." : stats.totalSoilSamples.toLocaleString(),
      icon: <MdGrass />,
      iconBgColor: "bg-emerald-500/20",
    },
    {
      label: "Total Plant Samples",
      value: stats.loading ? "..." : stats.totalPlants.toLocaleString(),
      icon: <MdLocalFlorist />,
      iconBgColor: "bg-purple-500/20",
    },
  ];

  const soilSampleStatusCards = [
    {
      label: "Under Process",
      value: stats.loading ? "..." : stats.underProcess.toLocaleString(),
      icon: <MdHourglassEmpty />,
      iconBgColor: "bg-amber-500/20",
    },
    {
      label: "Proceed",
      value: stats.loading ? "..." : stats.proceed.toLocaleString(),
      icon: <MdPlayArrow />,
      iconBgColor: "bg-orange-500/20",
    },
    {
      label: "Completed",
      value: stats.loading ? "..." : stats.completed.toLocaleString(),
      icon: <MdCheckCircle />,
      iconBgColor: "bg-green-500/20",
    },
    {
      label: "Paid",
      value: stats.loading ? "..." : stats.paid.toLocaleString(),
      icon: <MdPayment />,
      iconBgColor: "bg-indigo-500/20",
    },
  ];

  return (
    <div className="space-y-10 pb-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm">Welcome back! Here's what's happening today.</p>
      </header>

      {/* Main Stats */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </section>

      {/* Soil Sample Status Stats */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Soil Sample Status</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {soilSampleStatusCards.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>
      </section>

      {/* Payment Received Chart */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Revenue Analytics</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <PaymentReceivedChart data={paymentData} />
      </section>
    </div>
  );
}
