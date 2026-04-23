import { View } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import {
  getRatingColor,
  getRatingWidth,
} from "../utils/ratingHelpers";

interface BarChartProps {
  value: number;
  param: string;
  rating: string;
}

export const BarChart = ({ value, param, rating }: BarChartProps) => {
  const barColor = getRatingColor(rating);
  const barWidth = getRatingWidth(rating);

  return (
    <View style={styles.barContainer}>
      <View
        style={[
          styles.barSegment,
          {
            left: 0,
            width: barWidth,
            backgroundColor: barColor,
          },
        ]}
      />
    </View>
  );
};
