export const mapToThreeLevelRating = (
  rating: string
): "Low" | "Medium" | "High" => {
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

export const getThreeLevelColor = (
  rating: "Low" | "Medium" | "High"
): string => {
  const colorMap = {
    Low: "#f59e0b",
    Medium: "#eab308",
    High: "#22c55e",
  };
  return colorMap[rating] || "#6b7280";
};

export const getRowBackgroundColor = (
  rating: "Low" | "Medium" | "High"
): string => {
  if (rating === "Low") {
    return "#fed7aa";
  } else if (rating === "Medium") {
    return "#fef08a";
  } else if (rating === "High") {
    return "#dcfce7";
  }
  return "#ffffff";
};