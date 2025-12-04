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
        // Fetch all records to calculate stats
        const response = await axios.get("/api/records?page=1&limit=1000");
        const records: RecordData[] = response.data?.data || [];

        // Calculate total samples (sum of noOfSamples from all records)
        const totalSamples = records.reduce((sum, record) => {
          const samples = record.noOfSamples;
          if (typeof samples === "number" && samples > 0) {
            return sum + samples;
          }
          return sum;
        }, 0);

        // Calculate total soil samples (records with test results or parameters selected)
        const totalSoilSamples = records.filter((record) => {
          return (
            record.paramPh ||
            record.paramDl ||
            record.paramCl ||
            (record.testResults && record.testResults.length > 0)
          );
        }).length;

        // Calculate total plants (sum of noTrees from all records)
        const totalPlants = records.reduce((sum, record) => {
          const trees = record.noTrees;
          if (typeof trees === "number" && trees > 0) {
            return sum + trees;
          }
          return sum;
        }, 0);

        // Calculate soil sample statuses
        const underProcess = records.filter((record) => {
          // Has parameters selected but no test results
          return (
            (record.paramPh || record.paramDl || record.paramCl) &&
            (!record.testResults || record.testResults.length === 0)
          );
        }).length;

        const proceed = records.filter((record) => {
          // Has test results but may be incomplete
          return (
            record.testResults &&
            record.testResults.length > 0 &&
            Array.isArray(record.testResults)
          );
        }).length;

        // Completed: records with complete test results (all parameters tested)
        const completed = records.filter((record) => {
          if (!record.testResults || !Array.isArray(record.testResults)) {
            return false;
          }
          // Check if at least one test result has all key fields
          return record.testResults.some((test) => {
            // Type guard for test result object
            if (typeof test === "object" && test !== null) {
              const testResult = test as {
                nitrogen?: string;
                phosphorus?: string;
                potassium?: string;
                ph?: string;
              };
              return (
                testResult.nitrogen &&
                testResult.phosphorus &&
                testResult.potassium &&
                testResult.ph
              );
            }
            return false;
          });
        }).length;

        // Paid: For now, consider completed samples as paid (can be updated when payment tracking is added)
        const paid = completed;

        // Calculate monthly payment data
        const monthlyPayments = new Map<string, number>();
        const pricePerParameter = 50;

        records.forEach((record) => {
          if (record.testResults && Array.isArray(record.testResults) && record.testResults.length > 0) {
            const recordDate = new Date(record.createdAt || Date.now());
            const monthKey = recordDate.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });

            // Calculate payment based on selected parameters
            let paramCount = 0;
            if (record.paramPh) paramCount++;
            if (record.paramDl) paramCount++;
            if (record.paramCl) paramCount++;

            const payment = paramCount * pricePerParameter;
            monthlyPayments.set(
              monthKey,
              (monthlyPayments.get(monthKey) || 0) + payment
            );
          }
        });

        // Generate last 6 months of payment data
        const paymentChartData: Array<{ month: string; amount: number }> = [];
        const currentDate = new Date();
        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
          );
          const monthKey = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          paymentChartData.push({
            month: monthKey,
            amount: monthlyPayments.get(monthKey) || 0,
          });
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
      icon: <MdScience size={24} className="text-blue-600" />,
      iconBgColor: "bg-blue-100",
    },
    {
      label: "Total Soil Samples",
      value: stats.loading
        ? "..."
        : stats.totalSoilSamples.toLocaleString(),
      icon: <MdGrass size={24} className="text-green-600" />,
      iconBgColor: "bg-green-100",
    },
    {
      label: "Total Plants",
      value: stats.loading ? "..." : stats.totalPlants.toLocaleString(),
      icon: <MdLocalFlorist size={24} className="text-purple-600" />,
      iconBgColor: "bg-purple-100",
    },
  ];

  const soilSampleStatusCards = [
    {
      label: "Under Process",
      value: stats.loading ? "..." : stats.underProcess.toLocaleString(),
      icon: <MdHourglassEmpty size={24} className="text-yellow-600" />,
      iconBgColor: "bg-yellow-100",
    },
    {
      label: "Proceed",
      value: stats.loading ? "..." : stats.proceed.toLocaleString(),
      icon: <MdPlayArrow size={24} className="text-orange-600" />,
      iconBgColor: "bg-orange-100",
    },
    {
      label: "Completed",
      value: stats.loading ? "..." : stats.completed.toLocaleString(),
      icon: <MdCheckCircle size={24} className="text-green-600" />,
      iconBgColor: "bg-green-100",
    },
    {
      label: "Paid",
      value: stats.loading ? "..." : stats.paid.toLocaleString(),
      icon: <MdPayment size={24} className="text-indigo-600" />,
      iconBgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Soil Sample Status Stats */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Soil Sample Status
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>

      {/* Payment Received Chart */}
      <div>
        <PaymentReceivedChart data={paymentData} />
      </div>
    </div>
  );
}
