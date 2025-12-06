import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { RecordData } from "@/hooks/useRecords";
import {
  getPhRating,
  getOrganicCarbonRating,
  getCalciumRating,
  getMagnesiumRating,
  getSulfurRating,
  getIronRating,
  getManganeseRating,
  getZincRating,
  getCopperRating,
  getBoronRating,
  getMolybdenumRating,
  getChlorineRating,
  getNickelRating,
  getSodiumRating,
  getElectricalConductivityRating,
} from "@/utils/pdfChartColors";
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating,
} from "@/utils/soilRating";

const styles = StyleSheet.create({
  page: {
    padding: 12,
    paddingBottom: 12,
    fontSize: 7,
    fontFamily: "Times",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "2 solid #dc2626",
    paddingBottom: 8,
  },
  headerLeft: {
    width: "50%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
    objectFit: "contain",
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    fontFamily: "Times-Bold",
  },
  addressColumn: {
    fontSize: 7,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 1,
  },
  slogan: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
    marginTop: 5,
  },
  headerRight: {
    width: "45%",
    alignItems: "flex-end",
  },
  reportTitle: {
    fontSize: 11,
    fontWeight: "medium",
    color: "#111827",
    marginBottom: 6,
    fontFamily: "Times-Bold",
  },
  infoRow: {
    fontSize: 7,
    color: "#374151",
    marginBottom: 2,
    textAlign: "right",
  },
  generalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 8,
    backgroundColor: "#f9fafb",
    borderRadius: 3,
  },
  generalInfoLeft: {
    width: "30%",
  },
  generalInfoCenter: {
    width: "35%",
  },
  generalInfoRight: {
    width: "30%",
  },
  growerBox: {
    padding: 6,
    backgroundColor: "#ffffff",
    border: "1 solid #e5e7eb",
    borderRadius: 2,
    marginTop: 4,
  },
  growerText: {
    fontSize: 8,
    color: "#111827",
  },
  labelText: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 3,
  },
  valueText: {
    fontSize: 9,
    color: "#111827",
    fontWeight: "bold",
  },
  tablesContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "flex-start",
  },
  table: {
    border: "1 solid #000000",
    borderRadius: 10,
    overflow: "hidden",
    width: "68%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottom: "2 solid #000000",
    paddingVertical: 4,
    paddingHorizontal: 2,
    alignItems: "flex-start",
  },
  headerCell: {
    fontSize: 5,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  testCell: {
    width: "14%",
    paddingRight: 2,
    paddingLeft: 2,
    borderRight: "1 solid #000000",
  },
  methodCell: {
    width: "11%",
    textAlign: "center",
    paddingHorizontal: 1,
    borderRight: "1 solid #000000",
  },
  resultsCell: {
    width: "10%",
    textAlign: "center",
    paddingHorizontal: 1,
    borderRight: "1 solid #000000",
  },
  rangeCell: {
    width: "48%",
    paddingLeft: 2,
    paddingRight: 1,
    flexDirection: "column",
    borderRight: "1 solid #000000",
  },
  additionalCell: {
    width: "20%",
    paddingLeft: 2,
    paddingRight: 2,
    borderRight: "1 solid #000000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #d1d5db",
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: "center",
    minHeight: 24,
  },
  testName: {
    fontSize: 5,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  methodText: {
    fontSize: 4.5,
    color: "#000000",
    textAlign: "center",
    fontFamily: "Times",
  },
  resultText: {
    fontSize: 5,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    paddingHorizontal: 1,
    flexWrap: "wrap",
  },
  ratingLabel: {
    fontSize: 4.5,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  barContainer: {
    height: 10,
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: 1,
    overflow: "hidden",
    border: "0.5 solid #000000",
    width: "100%",
    marginTop: 1,
  },
  barSegment: {
    height: "100%",
    position: "absolute",
    top: 0,
  },
  barIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: "#000000",
    zIndex: 10,
  },
  ratingText: {
    fontSize: 4.5,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
    textAlign: "left",
  },
  section: {
    marginTop: 15,
    padding: 8,
    backgroundColor: "#f9fafb",
    borderRadius: 3,
    border: "1 solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
    fontFamily: "Times-Bold",
  },
  sectionText: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 5,
  },
  cecTable: {
    width: "30%",
    border: "1 solid #000000",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  cecTableHeader: {
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderBottom: "1 solid #000000",
  },
  cecTableTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Times-Bold",
    marginBottom: 2,
  },
  cecTableSubtitle: {
    fontSize: 6.5,
    color: "#374151",
    fontFamily: "Times-Roman",
  },
  cecTableContent: {
    padding: 0,
  },
  cecTableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #d1d5db",
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  cecTableHeaderRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1 solid #000000",
  },
  cecTableCell: {
    fontSize: 6.5,
    color: "#111827",
    fontFamily: "Times-Roman",
    flex: 1,
    textAlign: "left",
  },
  cecTableCellHeader: {
    fontSize: 6.5,
    color: "#111827",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
    flex: 1,
    textAlign: "left",
  },
  saturationTable: {
    marginTop: 8,
    border: "1 solid #d1d5db",
  },
  saturationRow: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  saturationCell: {
    fontSize: 8,
    color: "#111827",
    width: "20%",
  },
  recommendationCard: {
    marginTop: 5,
    marginBottom: 5,
    padding: 7,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    border: "1 solid #e5e7eb",
    borderLeft: "3 solid #3b82f6",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  recommendationIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  recommendationIconText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  recommendationTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Times-Bold",
    flex: 1,
  },
  recommendationContent: {
    paddingLeft: 26,
  },
  recommendationText: {
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.4,
    fontFamily: "Times-Roman",
  },
  recommendationBold: {
    fontWeight: "bold",
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#9ca3af",
    borderTop: "1 solid #e5e7eb",
    paddingTop: 8,
  },
  footerLeft: {
    width: "50%",
  },
  footerLogoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  footerLogo: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
  footerCompanyName: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#dc2626",
    fontFamily: "Times-Bold",
    marginBottom: 2,
  },
  footerText: {
    fontSize: 7,
    color: "#6b7280",
    fontFamily: "Times-Roman",
    marginBottom: 2,
  },
  footerRight: {
    width: "50%",
    textAlign: "right",
    justifyContent: "flex-end",
  },
});

interface TestResult {
  // Basic Parameters
  ph?: string;
  bufferPh?: string;
  organicCarbon?: string;
  phRating?: string;
  organicCarbonRating?: string;
  // Primary Macronutrients
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  nitrogenRating?: string;
  phosphorusRating?: string;
  potassiumRating?: string;
  nitrogenRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
  phosphorusRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
  potassiumRecommendation?: {
    level: string;
    increasePercent: number;
    suggestion: string;
  };
  // Secondary Macronutrients
  calcium?: string;
  magnesium?: string;
  sulfur?: string;
  // Micronutrients
  iron?: string;
  manganese?: string;
  zinc?: string;
  copper?: string;
  boron?: string;
  molybdenum?: string;
  chlorine?: string;
  nickel?: string;
  // Other Parameters
  sodium?: string;
  electricalConductivity?: string;
}

const renderRatingHeader = () => {
  const ratingLevels = [
    { label: "Very Low", color: "#dc2626" }, // Red
    { label: "Low", color: "#f59e0b" }, // Orange
    { label: "Medium", color: "#eab308" }, // Yellow
    { label: "Optimum", color: "#22c55e" }, // Green
    { label: "Very High", color: "#16a34a" }, // Dark Green
  ];

  return (
    <View style={styles.ratingHeader}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {ratingLevels.map((level, index) => (
          <View
            key={level.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: index < ratingLevels.length - 1 ? 6 : 0,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: level.color,
                border: "0.5 solid #000",
                marginRight: 3,
              }}
            />
            <Text style={styles.ratingLabel}>{level.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Helper function to map 5-level rating to 3-level rating
const mapToThreeLevelRating = (rating: string): "Low" | "Medium" | "High" => {
  const ratingLower = rating.toLowerCase();
  if (ratingLower === "very low" || ratingLower === "low") {
    return "Low";
  } else if (ratingLower === "medium") {
    return "Medium";
  } else if (ratingLower === "optimum" || ratingLower === "very high") {
    return "High";
  }
  return "Medium";
};

// Helper function to get color for 3-level rating
const getThreeLevelColor = (rating: "Low" | "Medium" | "High"): string => {
  const colorMap = {
    Low: "#f59e0b", // Orange
    Medium: "#eab308", // Yellow
    High: "#22c55e", // Green
  };
  return colorMap[rating] || "#6b7280";
};

const renderBarChart = (value: number, param: string, rating: string) => {
  // Map the original rating to 3-level rating
  const threeLevelRating = mapToThreeLevelRating(rating);

  // Get the color for the rating - simple solid fill
  const barColor = getThreeLevelColor(threeLevelRating);

  return (
    <View style={styles.barContainer}>
      <View
        style={[
          styles.barSegment,
          {
            left: 0,
            width: "100%",
            backgroundColor: barColor,
          },
        ]}
      />
    </View>
  );
};

export const RecordPDFTemplate = ({ data }: { data: RecordData }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString();
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Get first test result from fetched data
  const testResult: TestResult = data.testResults?.[0] || {};

  // Parameter mapping configuration
  const parameterConfig: Record<
    string,
    {
      name: string;
      unit: string;
      range: string;
      category: string;
    }
  > = {
    ph: {
      name: "Soil pH",
      unit: "(1:2.5)",
      range: "6.5 - 7.5",
      category: "Basic Parameters",
    },
    bufferPh: {
      name: "Buffer pH",
      unit: "(1:2.5)",
      range: "6.5 - 7.5",
      category: "Basic Parameters",
    },
    organicCarbon: {
      name: "Organic Carbon (OC)",
      unit: "(%)",
      range: "0.5 - 1.0",
      category: "Basic Parameters",
    },
    nitrogen: {
      name: "Av. Nitrogen (N)",
      unit: "(Kg/ha)",
      range: "272 - 544",
      category: "Primary Macronutrients",
    },
    phosphorus: {
      name: "Av. Phosphorus (P)",
      unit: "(Kg/ha)",
      range: "10 - 20",
      category: "Primary Macronutrients",
    },
    potassium: {
      name: "Av. Potassium (K)",
      unit: "(Kg/ha)",
      range: "120 - 280",
      category: "Primary Macronutrients",
    },
    calcium: {
      name: "Calcium (Ca)",
      unit: "ppm",
      range: "150 - 300",
      category: "Secondary Macronutrients",
    },
    magnesium: {
      name: "Magnesium (Mg)",
      unit: "ppm",
      range: "50 - 100",
      category: "Secondary Macronutrients",
    },
    iron: {
      name: "Iron (Fe)",
      unit: "ppm",
      range: "4 - 6",
      category: "Micronutrients",
    },
    manganese: {
      name: "Manganese (Mn)",
      unit: "ppm",
      range: "1.2 - 3.5",
      category: "Micronutrients",
    },
    zinc: {
      name: "Zinc (Zn)",
      unit: "ppm",
      range: "1 - 3",
      category: "Micronutrients",
    },
    boron: {
      name: "Boron (B)",
      unit: "ppm",
      range: "0.5 - 1.0",
      category: "Micronutrients",
    },
    solubleSalts: {
      name: "Soluble Salts",
      unit: "(dSm⁻¹)",
      range: "< 1",
      category: "Other Parameters",
    },
  };

  const testParams = Object.keys(testResult)
    .filter((key) => {
      // Only include keys that are in our parameter config and have valid values
      if (!parameterConfig[key]) return false;
      const value = testResult[key as keyof TestResult];
      // Check if value exists and is not empty string
      if (!value || value === "" || value === null || value === undefined)
        return false;
      // Try to parse as number to ensure it's a valid numeric value
      const numValue = parseFloat(String(value));
      return !isNaN(numValue);
    })
    .map((key) => {
      const value = parseFloat(String(testResult[key as keyof TestResult]));
      const config = parameterConfig[key];
      return {
        name: config.name,
        value: value,
        unit: config.unit,
        range: config.range,
        param: key,
        category: config.category,
      };
    });

  // Parse values for CEC calculations
  const k = testResult.potassium ? parseFloat(testResult.potassium) : null;
  const ca = testResult.calcium ? parseFloat(testResult.calcium) : null;
  const mg = testResult.magnesium ? parseFloat(testResult.magnesium) : null;

  // Calculate CEC and saturation (simplified calculations)
  const cec = ca && mg && k ? (ca / 200 + mg / 120 + k / 390) * 10 : 11.1;
  const kSaturation = k && cec ? (k / 390 / cec) * 100 : 4.6;
  const caSaturation = ca && cec ? (ca / 200 / cec) * 100 : 80.0;
  const mgSaturation = mg && cec ? (mg / 120 / cec) * 100 : 12.8;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* Logo and Company Name */}
            <View style={styles.logoContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src="/static soil logo.jpeg" style={styles.logo} />
              <Text style={styles.companyName}>Static Soil Health Lab</Text>
            </View>
            {/* Address in column format */}
            <Text style={styles.addressColumn}>
              Location: S.D. Colony, Batmaloo, Srinagar
            </Text>
            <Text style={styles.addressColumn}>Contact: +918082837794</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>SOIL ANALYSIS</Text>
            <Text style={styles.infoRow}>Name: {data.name || "N/A"}</Text>
            <Text style={styles.infoRow}>
              Report No: {data.consumerId || "N/A"}
            </Text>
            <Text style={styles.infoRow}>
              Customer ID: {data.id?.slice(-5) || "N/A"}
            </Text>
            <Text style={styles.infoRow}>
              Date Printed: {formatDate(new Date().toISOString())}
            </Text>
            <Text style={styles.infoRow}>
              Date Received: {formatDate(data.createdAt)}
            </Text>
            {/* <Text style={styles.infoRow}>Page: 1 of 1</Text> */}
          </View>
        </View>

        {/* General Information */}
        {/* <View style={styles.generalInfo}>
          <View style={styles.generalInfoLeft}>
            <Text style={styles.labelText}>Lab No:</Text>
            <Text style={styles.valueText}>{data.consumerId || '27306'}</Text>
          </View>
          <View style={styles.generalInfoCenter}>
            <Text style={styles.labelText}>Grower:</Text>
            <View style={styles.growerBox}>
              <Text style={styles.growerText}>{data.name || 'Grower not listed'}</Text>
            </View>
          </View>
          <View style={styles.generalInfoRight}>
            <Text style={styles.labelText}>Field:</Text>
            <Text style={styles.valueText}>{data.khasraNo || ''}</Text>
            <Text style={[styles.labelText, { marginTop: 8 }]}>Sample ID:</Text>
            <Text style={styles.valueText}>{data.location || 'Front M'}</Text>
          </View>
        </View>  */}

        {/* Tables Container - Main Test Results and CEC Table Side by Side */}
        <View style={styles.tablesContainer}>
          {/* Test Results Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.testCell}>
                <Text style={styles.headerCell}>Test</Text>
              </View>
              <View style={styles.methodCell}>
                <Text style={styles.headerCell}>Range</Text>
              </View>
              <View style={styles.additionalCell}>
                <Text style={styles.headerCell}>Unit</Text>
              </View>
              <View style={styles.resultsCell}>
                <Text style={styles.headerCell}>Results</Text>
              </View>
              <View style={styles.rangeCell}>
                <Text style={[styles.headerCell, { marginBottom: 2 }]}>
                  SOIL TEST RATINGS
                </Text>
                {renderRatingHeader()}
              </View>
            </View>

            {/* Table Rows */}
            {testParams.map((param) => {
              if (param.value === null) return null;

              // Get rating for display and row background color
              let originalRating = "N/A";
              let rowBgColor = "#ffffff";

              if (param.param === "ph") {
                originalRating = getPhRating(param.value);
              } else if (param.param === "nitrogen") {
                const nRating = getNitrogenRating(param.value);
                originalRating = nRating === "High" ? "Optimum" : nRating;
              } else if (param.param === "phosphorus") {
                const pRating = getPhosphorusRating(param.value);
                originalRating = pRating === "High" ? "Optimum" : pRating;
              } else if (param.param === "potassium") {
                const kRating = getPotassiumRating(param.value);
                originalRating = kRating === "High" ? "Optimum" : kRating;
              } else if (param.param === "calcium") {
                originalRating = getCalciumRating(param.value);
              } else if (param.param === "magnesium") {
                originalRating = getMagnesiumRating(param.value);
              } else if (param.param === "organicCarbon") {
                originalRating = getOrganicCarbonRating(param.value);
              } else if (param.param === "sulfur") {
                originalRating = getSulfurRating(param.value);
              } else if (param.param === "iron") {
                originalRating = getIronRating(param.value);
              } else if (param.param === "manganese") {
                originalRating = getManganeseRating(param.value);
              } else if (param.param === "zinc") {
                originalRating = getZincRating(param.value);
              } else if (param.param === "copper") {
                originalRating = getCopperRating(param.value);
              } else if (param.param === "boron") {
                originalRating = getBoronRating(param.value);
              } else if (param.param === "molybdenum") {
                originalRating = getMolybdenumRating(param.value);
              } else if (param.param === "chlorine") {
                originalRating = getChlorineRating(param.value);
              } else if (param.param === "nickel") {
                originalRating = getNickelRating(param.value);
              } else if (param.param === "sodium") {
                originalRating = getSodiumRating(param.value);
              } else if (param.param === "electricalConductivity") {
                originalRating = getElectricalConductivityRating(param.value);
              }

              // Map to 3-level rating for display
              const rating = mapToThreeLevelRating(originalRating);

              // Set row background color based on 3-level rating
              if (rating === "Low") {
                rowBgColor = "#fed7aa"; // Light orange
              } else if (rating === "Medium") {
                rowBgColor = "#fef08a"; // Light yellow
              } else if (rating === "High") {
                rowBgColor = "#dcfce7"; // Light green
              }

              return (
                <View
                  key={param.name}
                  style={[styles.tableRow, { backgroundColor: rowBgColor }]}
                >
                  <View style={styles.testCell}>
                    <Text style={styles.testName}>{param.name}</Text>
                  </View>
                  <View style={styles.methodCell}>
                    <Text style={styles.methodText}>{param.range}</Text>
                  </View>
                  <View style={styles.additionalCell}>
                    <Text style={styles.ratingText}>{param.unit}</Text>
                  </View>
                  <View style={styles.resultsCell}>
                    <Text style={styles.resultText}>
                      {param.value.toFixed(
                        param.name === "Soil pH" || param.name === "Buffer pH"
                          ? 2
                          : param.name === "Organic Carbon (OC)"
                          ? 2
                          : param.name.includes("(Ca)") ||
                            param.name.includes("(Mg)")
                          ? 1
                          : 0
                      )}
                    </Text>
                  </View>
                  <View style={styles.rangeCell}>
                    {renderBarChart(param.value, param.param, originalRating)}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Cation Exchange Capacity & %Saturation Table */}
          <View style={styles.cecTable}>
            <View style={styles.cecTableHeader}>
              <Text style={styles.cecTableTitle}>Cation Exchange Capacity</Text>
              <Text style={styles.cecTableSubtitle}>
                CEC: {cec.toFixed(1)} meq/100g
              </Text>
            </View>
            <View style={styles.cecTableContent}>
              <View style={[styles.cecTableRow, styles.cecTableHeaderRow]}>
                <Text style={styles.cecTableCellHeader}>Element</Text>
                <Text style={styles.cecTableCellHeader}>%Sat</Text>
                <Text style={styles.cecTableCellHeader}>meq</Text>
              </View>
              <View style={styles.cecTableRow}>
                <Text style={styles.cecTableCell}>K:</Text>
                <Text style={styles.cecTableCell}>
                  {kSaturation.toFixed(1)} %sat
                </Text>
                <Text style={styles.cecTableCell}>
                  {((kSaturation * cec) / 100).toFixed(1)} meq
                </Text>
              </View>
              <View style={styles.cecTableRow}>
                <Text style={styles.cecTableCell}>Ca:</Text>
                <Text style={styles.cecTableCell}>
                  {caSaturation.toFixed(1)} %sat
                </Text>
                <Text style={styles.cecTableCell}>
                  {((caSaturation * cec) / 100).toFixed(1)} meq
                </Text>
              </View>
              <View style={styles.cecTableRow}>
                <Text style={styles.cecTableCell}>Mg:</Text>
                <Text style={styles.cecTableCell}>
                  {mgSaturation.toFixed(1)} %sat
                </Text>
                <Text style={styles.cecTableCell}>
                  {((mgSaturation * cec) / 100).toFixed(1)} meq
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ratios */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratios</Text>
          <Text style={styles.sectionText}>K/Mg Ratio: {kMgRatio.toFixed(2)}</Text>
          <Text style={styles.sectionText}>Ca/Mg Ratio: {caMgRatio.toFixed(2)}</Text>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOIL FERTILITY GUIDELINES</Text>
          <Text style={styles.sectionText}>Yield Goal: 1</Text>
          <Text style={styles.sectionText}>Optimum Rec Units: LB/1000 SF</Text>
          <Text style={[styles.sectionText, { marginTop: 8, fontWeight: 'bold' }]}>Crop: {data.crop || 'Fescue/Cool Season Lawn'}</Text>
          
          <View style={[styles.saturationTable, { marginTop: 8 }]}>
            <View style={[styles.saturationRow, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>Nutrient</Text>
              <Text style={[styles.saturationCell, { fontWeight: 'bold' }]}>Amount</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>(lbs) LIME (tons):</Text>
              <Text style={styles.saturationCell}>0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>N:</Text>
              <Text style={styles.saturationCell}>4.0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>P2O5:</Text>
              <Text style={styles.saturationCell}>0</Text>
            </View>
            <View style={styles.saturationRow}>
              <Text style={styles.saturationCell}>K2O:</Text>
              <Text style={styles.saturationCell}>1.0</Text>
            </View>
          </View>
        </View> */}

        {/* Recommendations */}
        {testResult.nitrogenRecommendation ||
        testResult.phosphorusRecommendation ||
        testResult.potassiumRecommendation ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>

            {/* Nitrogen Recommendation Card */}
            {testResult.nitrogenRecommendation && (
              <View
                style={[
                  styles.recommendationCard,
                  { borderLeftColor: "#3b82f6" },
                ]}
              >
                <View style={styles.recommendationHeader}>
                  <View
                    style={[
                      styles.recommendationIcon,
                      { backgroundColor: "#3b82f6" },
                    ]}
                  >
                    <Text style={styles.recommendationIconText}>N</Text>
                  </View>
                  <Text style={styles.recommendationTitle}>
                    Nitrogen (N) - {testResult.nitrogenRecommendation.level}
                    {testResult.nitrogenRecommendation.increasePercent > 0 &&
                      ` (${testResult.nitrogenRecommendation.increasePercent}% increase recommended)`}
                  </Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationText}>
                    {testResult.nitrogenRecommendation.suggestion ||
                      "Apply recommended nitrogen based on soil test results."}
                  </Text>
                </View>
              </View>
            )}

            {/* Phosphate Recommendation Card */}
            {testResult.phosphorusRecommendation && (
              <View
                style={[
                  styles.recommendationCard,
                  { borderLeftColor: "#10b981" },
                ]}
              >
                <View style={styles.recommendationHeader}>
                  <View
                    style={[
                      styles.recommendationIcon,
                      { backgroundColor: "#10b981" },
                    ]}
                  >
                    <Text style={styles.recommendationIconText}>P</Text>
                  </View>
                  <Text style={styles.recommendationTitle}>
                    Phosphate (P₂O₅) -{" "}
                    {testResult.phosphorusRecommendation.level}
                    {testResult.phosphorusRecommendation.increasePercent > 0 &&
                      ` (${testResult.phosphorusRecommendation.increasePercent}% increase recommended)`}
                  </Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationText}>
                    {testResult.phosphorusRecommendation.suggestion ||
                      "Apply recommended phosphate based on soil test results."}
                  </Text>
                </View>
              </View>
            )}

            {/* Potash Recommendation Card */}
            {testResult.potassiumRecommendation && (
              <View
                style={[
                  styles.recommendationCard,
                  { borderLeftColor: "#f59e0b" },
                ]}
              >
                <View style={styles.recommendationHeader}>
                  <View
                    style={[
                      styles.recommendationIcon,
                      { backgroundColor: "#f59e0b" },
                    ]}
                  >
                    <Text style={styles.recommendationIconText}>K</Text>
                  </View>
                  <Text style={styles.recommendationTitle}>
                    Potash (K₂O) - {testResult.potassiumRecommendation.level}
                    {testResult.potassiumRecommendation.increasePercent > 0 &&
                      ` (${testResult.potassiumRecommendation.increasePercent}% increase recommended)`}
                  </Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationText}>
                    {testResult.potassiumRecommendation.suggestion ||
                      "Apply recommended potash based on soil test results."}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>

            {/* Default Nitrogen Recommendation Card */}
            <View
              style={[
                styles.recommendationCard,
                { borderLeftColor: "#3b82f6" },
              ]}
            >
              <View style={styles.recommendationHeader}>
                <View
                  style={[
                    styles.recommendationIcon,
                    { backgroundColor: "#3b82f6" },
                  ]}
                >
                  <Text style={styles.recommendationIconText}>N</Text>
                </View>
                <Text style={styles.recommendationTitle}>
                  Nitrogen (N) Application
                </Text>
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationText}>
                  <Text style={styles.recommendationBold}>MAINTENANCE:</Text>{" "}
                  Apply 0.75 to 1 lb N/1000 sq ft in March, May, September, and
                  November. Adjust N rate and timing to accommodate climatic
                  conditions and management practices. If lower maintenance is
                  desired, the May application can be eliminated.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.recommendationCard,
                { borderLeftColor: "#10b981" },
              ]}
            >
              <View style={styles.recommendationHeader}>
                <View
                  style={[
                    styles.recommendationIcon,
                    { backgroundColor: "#10b981" },
                  ]}
                >
                  <Text style={styles.recommendationIconText}>P</Text>
                </View>
                <Text style={styles.recommendationTitle}>
                  Phosphate (P₂O₅) Application
                </Text>
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationText}>
                  Apply half of recommended phosphate in spring and again in
                  fall.
                </Text>
              </View>
            </View>

            {/* Default Potash Recommendation Card */}
            <View
              style={[
                styles.recommendationCard,
                { borderLeftColor: "#f59e0b" },
              ]}
            >
              <View style={styles.recommendationHeader}>
                <View
                  style={[
                    styles.recommendationIcon,
                    { backgroundColor: "#f59e0b" },
                  ]}
                >
                  <Text style={styles.recommendationIconText}>K</Text>
                </View>
                <Text style={styles.recommendationTitle}>
                  Potash (K₂O) Application
                </Text>
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationText}>
                  Apply recommended potash in fall. If the soil is sandy, apply
                  1 lb of potash/1000 sq ft in fall and apply the remaining
                  potash in several smaller applications throughout the growing
                  season.
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <View style={styles.footerLogoContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src="/static soil logo.jpeg" style={styles.footerLogo} />
              <View>
                <Text style={styles.footerCompanyName}>
                  Static Soil Health Lab
                </Text>
                <Text style={styles.footerText}>
                  S.D. Colony, Batmaloo, Srinagar
                </Text>
                <Text style={styles.footerText}>Contact: +918082837794</Text>
              </View>
            </View>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>
              Analysis prepared by: Static Soil Health Lab
            </Text>
            <Text style={styles.footerText}>
              S.D. Colony, Batmaloo, Srinagar
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
