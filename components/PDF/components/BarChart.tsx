import { View } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";
import {
  mapToThreeLevelRating,
  getThreeLevelColor,
} from "../utils/ratingHelpers";

interface BarChartProps {
  value: number;
  param: string;
  rating: string;
}

export const BarChart = ({ value, param, rating }: BarChartProps) => {
  const threeLevelRating = mapToThreeLevelRating(rating);
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