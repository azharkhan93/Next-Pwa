import { View, Text } from "@react-pdf/renderer";
import { styles } from "../RecordPDFTemplate.styles";

export const RatingHeader = () => {
  const ratingLevels = [
    { label: "Very Low", color: "#dc2626" },
    { label: "Low", color: "#f59e0b" },
    { label: "Medium", color: "#eab308" },
    { label: "Optimum", color: "#22c55e" },
    { label: "Very High", color: "#16a34a" },
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