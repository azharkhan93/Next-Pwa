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

  // Use rating from testResult data if available, otherwise calculate it
  const originalRating = param.rating || getRatingForParameter(param.param, param.value);
  const rating = mapToThreeLevelRating(originalRating);
  const rowBgColor = getRowBackgroundColor(rating);
  const cecValue = calculateCECValue(param.param, param.value);

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
          {formatResultValue(param.name, param.value)}
        </Text>
      </View>
      <View style={styles.rangeCell}>
        <BarChart value={param.value} param={param.param} rating={originalRating} />
      </View>
      <View style={styles.cecCellData}>
        <Text style={styles.cecText}>{cecValue}</Text>
      </View>
    </View>
  );
};