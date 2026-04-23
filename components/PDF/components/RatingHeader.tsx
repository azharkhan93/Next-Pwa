import { View, Text } from "@react-pdf/renderer";

export const RatingHeader = () => {
  const ratingLevels = [
    { label: "Very Low", color: "#dc2626" },
    { label: "Low", color: "#f59e0b" },
    { label: "Medium", color: "#eab308" },
    { label: "Optimum", color: "#22c55e" },
    { label: "Very High", color: "#16a34a" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: 10,
        border: "0.5 solid #000000",
      }}
    >
      {ratingLevels.map((level, index) => (
        <View
          key={level.label}
          style={{
            flex: 1,
            backgroundColor: level.color,
            alignItems: "center",
            justifyContent: "center",
            borderRight: index < ratingLevels.length - 1 ? "0.5 solid #000000" : "none",
          }}
        >
          <Text style={{ 
            fontSize: 4, 
            color: "#000000", 
            fontWeight: "bold",
            fontFamily: "Times-Bold"
          }}>
            {level.label}
          </Text>
        </View>
      ))}
    </View>
  );
};