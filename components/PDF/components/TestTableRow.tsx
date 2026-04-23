import { View, Text } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import type { TestParam } from "@/utils/pdf/types";
import { getRatingForParameter } from "../utils/ratingCalculations";
import { mapToThreeLevelRating } from "../utils/ratingHelpers";
import { getRowBackgroundColor } from "../utils/ratingHelpers";
import { calculateCECValue } from "../utils/cecHelpers";
import { formatResultValue } from "../utils/formatHelpers";
import { BarChart } from "./BarChart";

interface TestTableRowProps {
  param: TestParam;
}

export const TestTableRow = ({ param }: TestTableRowProps) => {
  if (param.value === null) return null;

  const originalRating = param.rating || getRatingForParameter(param.param, param.value);
  const rating = mapToThreeLevelRating(originalRating);
  const rowBgColor = getRowBackgroundColor(originalRating);
  const cecValue = calculateCECValue(param.param, param.value);

  return (
    <View key={param.name} style={styles.tableRow}>
      {/* These cells share the dynamic background color */}
      <View style={[styles.testCell, { backgroundColor: rowBgColor }]}>
        <Text style={styles.testName}>{param.name}</Text>
      </View>
      <View style={[styles.methodCell, { backgroundColor: rowBgColor }]}>
        <Text style={styles.methodText}>{param.range}</Text>
      </View>
      <View style={[styles.additionalCell, { backgroundColor: rowBgColor }]}>
        <Text style={styles.ratingText}>{param.unit}</Text>
      </View>
      <View style={[styles.resultsCell, { backgroundColor: rowBgColor }]}>
        <Text style={styles.resultText}>
          {formatResultValue(param.name, param.value)}
        </Text>
      </View>

      {/* Ratings column - strictly white background */}
      <View style={styles.rangeCell}>
        <BarChart value={param.value} param={param.param} rating={originalRating} />
      </View>

      {/* CEC column - strictly white background */}
      <View style={styles.cecCellData}>
        <Text style={styles.cecText}>{cecValue}</Text>
      </View>
    </View>
  );
};