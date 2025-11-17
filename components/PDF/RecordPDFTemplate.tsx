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
    padding: 15,
    paddingBottom: 15,
    fontSize: 8,
    fontFamily: "Times-Roman",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottom: "2 solid #dc2626",
    paddingBottom: 12,
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    fontFamily: "Times-Bold",
  },
  addressColumn: {
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.5,
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
    fontSize: 13,
    fontWeight: "medium",
    color: "#111827",
    marginBottom: 8,
    fontFamily: "Times-Bold",
  },
  infoRow: {
    fontSize: 8,
    color: "#374151",
    marginBottom: 3,
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
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottom: "2 solid #000000",
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: "flex-start",
  },
  headerCell: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  testCell: {
    width: "12%",
    paddingRight: 3,
    paddingLeft: 3,
    borderRight: "1 solid #000000",
  },
  methodCell: {
    width: "8%",
    textAlign: "center",
    paddingHorizontal: 2,
    borderRight: "1 solid #000000",
  },
  resultsCell: {
    width: "10%",
    textAlign: "center",
    paddingHorizontal: 2,
    borderRight: "1 solid #000000",
  },
  rangeCell: {
    width: "50%",
    paddingLeft: 4,
    paddingRight: 2,
    flexDirection: "column",
    borderRight: "1 solid #000000",
  },
  additionalCell: {
    width: "20%",
    paddingLeft: 4,
    paddingRight: 3,
    borderRight: "1 solid #000000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #d1d5db",
    paddingVertical: 5,
    paddingHorizontal: 3,
    alignItems: "center",
    minHeight: 32,
  },
  testName: {
    fontSize: 7,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  methodText: {
    fontSize: 7,
    color: "#000000",
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  resultText: {
    fontSize: 7,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    paddingHorizontal: 1,
    flexWrap: "wrap",
  },
  ratingLabel: {
    fontSize: 5.5,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Times-Bold",
  },
  barContainer: {
    height: 12,
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: 1,
    overflow: "hidden",
    border: "0.5 solid #000000",
    width: "100%",
    marginTop: 2,
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
    fontSize: 7,
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
    width: "35%",
    border: "1 solid #000000",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  cecTableHeader: {
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderBottom: "1 solid #000000",
  },
  cecTableTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Times-Bold",
    marginBottom: 3,
  },
  cecTableSubtitle: {
    fontSize: 7,
    color: "#374151",
    fontFamily: "Times-Roman",
  },
  cecTableContent: {
    padding: 0,
  },
  cecTableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #d1d5db",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  cecTableHeaderRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1 solid #000000",
  },
  cecTableCell: {
    fontSize: 7,
    color: "#111827",
    fontFamily: "Times-Roman",
    flex: 1,
    textAlign: "left",
  },
  cecTableCellHeader: {
    fontSize: 7,
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
  return (
    <View style={styles.ratingHeader}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#f59e0b",
              border: "0.5 solid #000",
              marginRight: 3,
            }}
          />
          <Text style={styles.ratingLabel}>Low</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#eab308",
              border: "0.5 solid #000",
              marginRight: 3,
            }}
          />
          <Text style={styles.ratingLabel}>Medium</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#22c55e",
              border: "0.5 solid #000",
              marginRight: 3,
            }}
          />
          <Text style={styles.ratingLabel}>High</Text>
        </View>
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
  return "Medium"; // default
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
      {/* Simple solid fill based on rating */}
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

  // Parse values
  const ph = testResult.ph ? parseFloat(testResult.ph) : null;
  const oc = testResult.organicCarbon
    ? parseFloat(testResult.organicCarbon)
    : null;
  const n = testResult.nitrogen ? parseFloat(testResult.nitrogen) : null;
  const p = testResult.phosphorus ? parseFloat(testResult.phosphorus) : null;
  const k = testResult.potassium ? parseFloat(testResult.potassium) : null;
  const ca = testResult.calcium ? parseFloat(testResult.calcium) : null;
  const mg = testResult.magnesium ? parseFloat(testResult.magnesium) : null;
  const s = testResult.sulfur ? parseFloat(testResult.sulfur) : null;
  const fe = testResult.iron ? parseFloat(testResult.iron) : null;
  const mn = testResult.manganese ? parseFloat(testResult.manganese) : null;
  const zn = testResult.zinc ? parseFloat(testResult.zinc) : null;
  const cu = testResult.copper ? parseFloat(testResult.copper) : null;
  const b = testResult.boron ? parseFloat(testResult.boron) : null;
  const mo = testResult.molybdenum ? parseFloat(testResult.molybdenum) : null;
  const cl = testResult.chlorine ? parseFloat(testResult.chlorine) : null;
  const ni = testResult.nickel ? parseFloat(testResult.nickel) : null;
  const na = testResult.sodium ? parseFloat(testResult.sodium) : null;
  const ec = testResult.electricalConductivity
    ? parseFloat(testResult.electricalConductivity)
    : null;

  const testParams = [
    // Basic Parameters
    {
      name: "pH",
      value: ph,
      unit: "",
      method: "1:2.5",
      param: "ph",
      category: "Basic Parameters",
    },
    {
      name: "EC",
      value: ec,
      unit: " dSm-1",
      method: "EC",
      param: "electricalConductivity",
      category: "Other Parameters",
    },
    {
      name: "Organic Carbon",
      value: oc,
      unit: "%",
      method: "LOI",
      param: "organicCarbon",
      category: "Basic Parameters",
    },
    // Primary Macronutrients
    {
      name: "Nitrogen",
      value: n,
      unit: " Kg/ha",
      method: "M3",
      param: "nitrogen",
      category: "Primary Macronutrients",
    },
    {
      name: "Phosphorus",
      value: p,
      unit: " Kg/ha",
      method: "M3",
      param: "phosphorus",
      category: "Primary Macronutrients",
    },
    {
      name: "Potassium",
      value: k,
      unit: " Kg/ha",
      method: "M3",
      param: "potassium",
      category: "Primary Macronutrients",
    },
    // Secondary Macronutrients
    {
      name: "Calcium",
      value: ca,
      unit: " meq",
      method: "M3",
      param: "calcium",
      category: "Secondary Macronutrients",
    },
    {
      name: "Magnesium",
      value: mg,
      unit: " meq",
      method: "M3",
      param: "magnesium",
      category: "Secondary Macronutrients",
    },
    // { name: 'Sulfur (S)', value: s, unit: ' ppm', method: 'M3', param: 'sulfur', category: 'Secondary Macronutrients' },
    // Micronutrients
    // { name: 'Iron (Fe)', value: fe, unit: ' ppm', method: 'M3', param: 'iron', category: 'Micronutrients' },
    // { name: 'Manganese (Mn)', value: mn, unit: ' ppm', method: 'M3', param: 'manganese', category: 'Micronutrients' },
    // { name: 'Zinc (Zn)', value: zn, unit: ' ppm', method: 'M3', param: 'zinc', category: 'Micronutrients' },
    // { name: 'Copper (Cu)', value: cu, unit: ' ppm', method: 'M3', param: 'copper', category: 'Micronutrients' },
    // { name: 'Boron (B)', value: b, unit: ' ppm', method: 'M3', param: 'boron', category: 'Micronutrients' },
    // { name: 'Molybdenum (Mo)', value: mo, unit: ' ppm', method: 'M3', param: 'molybdenum', category: 'Micronutrients' },
    // { name: 'Chlorine (Cl)', value: cl, unit: ' ppm', method: 'M3', param: 'chlorine', category: 'Micronutrients' },
    // { name: 'Nickel (Ni)', value: ni, unit: ' ppm', method: 'M3', param: 'nickel', category: 'Micronutrients' },
    // Other Parameters
    // { name: 'Sodium (Na)', value: na, unit: ' ppm', method: 'M3', param: 'sodium', category: 'Other Parameters' },
  ];

  // Calculate CEC and saturation (simplified calculations)
  const cec = ca && mg && k ? (ca / 200 + mg / 120 + k / 390) * 10 : 11.1;
  const kSaturation = k && cec ? (k / 390 / cec) * 100 : 4.6;
  const caSaturation = ca && cec ? (ca / 200 / cec) * 100 : 80.0;
  const mgSaturation = mg && cec ? (mg / 120 / cec) * 100 : 12.8;

  // Calculate ratios
  const kMgRatio = k && mg ? k / 390 / (mg / 120) : 0.36;
  const caMgRatio = ca && mg ? ca / 200 / (mg / 120) : 6.25;

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
            <Text style={styles.infoRow}>Page: 1 of 1</Text>
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
                <Text style={styles.headerCell}>Method</Text>
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
              <View style={styles.additionalCell}>
                <Text style={styles.headerCell}>Rating</Text>
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
                    <Text style={styles.methodText}>{param.method}</Text>
                  </View>
                  <View style={styles.resultsCell}>
                    <Text style={styles.resultText}>
                      {param.value.toFixed(
                        param.name === "Soil pH"
                          ? 1
                          : param.name === "Organic Matter"
                          ? 1
                          : 0
                      )}
                      {param.unit}
                    </Text>
                  </View>
                  <View style={styles.rangeCell}>
                    {renderBarChart(param.value, param.param, originalRating)}
                  </View>
                  <View style={styles.additionalCell}>
                    <Text style={styles.ratingText}>{rating}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Cation Exchange Capacity & %Saturation Table */}
          <View style={styles.cecTable}>
            <View style={styles.cecTableHeader}>
              <Text style={styles.cecTableTitle}>
                Cation Exchange Capacity & %Saturation
              </Text>
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

            {/* Default Phosphate Recommendation Card */}
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

        {/* Footer */}
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
