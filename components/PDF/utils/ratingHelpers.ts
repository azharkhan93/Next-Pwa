export const mapToThreeLevelRating = (
  rating: string
): "Low" | "Medium" | "High" => {
  const ratingLower = rating.toLowerCase();
  if (ratingLower.includes("very low") || ratingLower === "low") {
    return "Low";
  } else if (ratingLower === "medium") {
    return "Medium";
  } else if (ratingLower === "optimum" || ratingLower.includes("high")) {
    return "High";
  }
  return "Medium";
};

// Unified colors for both bars and row backgrounds to ensure 100% synchronization
export const RATING_COLORS = {
  VERY_LOW: "#dc2626", // Red
  LOW: "#f59e0b",      // Orange
  MEDIUM: "#eab308",   // Yellow
  OPTIMUM: "#22c55e",  // Green
  VERY_HIGH: "#16a34a", // Dark Green
};

// Light versions for backgrounds to maintain readability while matching the bar hue
export const BACKGROUND_COLORS = {
  VERY_LOW: "#fee2e2", // Pale Red
  LOW: "#ffedd5",      // Pale Orange
  MEDIUM: "#fef9c3",   // Pale Yellow
  OPTIMUM: "#dcfce7",  // Pale Green
  VERY_HIGH: "#bbf7d0", // Pale Dark Green
};

export const getRatingColor = (rating: string): string => {
  const ratingLower = (rating || "").toLowerCase();
  if (ratingLower.includes("very low")) return RATING_COLORS.VERY_LOW;
  if (ratingLower.includes("very high")) return RATING_COLORS.VERY_HIGH;
  if (ratingLower.includes("low")) return RATING_COLORS.LOW;
  if (ratingLower.includes("medium")) return RATING_COLORS.MEDIUM;
  if (ratingLower.includes("optimum")) return RATING_COLORS.OPTIMUM;
  if (ratingLower.includes("high")) return RATING_COLORS.VERY_HIGH;
  return RATING_COLORS.MEDIUM;
};

export const getRatingWidth = (rating: string): string => {
  const ratingLower = (rating || "").toLowerCase();
  if (ratingLower.includes("very low")) return "20%";
  if (ratingLower === "low") return "40%";
  if (ratingLower === "medium") return "60%";
  if (ratingLower === "optimum") return "80%";
  if (ratingLower.includes("high")) return "100%";
  return "60%";
};

export const getRowBackgroundColor = (ratingStr: string): string => {
  const ratingLower = (ratingStr || "").toLowerCase();
  if (ratingLower.includes("very low")) return BACKGROUND_COLORS.VERY_LOW;
  if (ratingLower.includes("very high")) return BACKGROUND_COLORS.VERY_HIGH;
  if (ratingLower.includes("low")) return BACKGROUND_COLORS.LOW;
  if (ratingLower.includes("medium")) return BACKGROUND_COLORS.MEDIUM;
  if (ratingLower.includes("optimum")) return BACKGROUND_COLORS.OPTIMUM;
  if (ratingLower.includes("high")) return BACKGROUND_COLORS.VERY_HIGH;
  return "#ffffff";
};

export const getThreeLevelColor = (
  rating: "Low" | "Medium" | "High"
): string => {
  const colorMap = {
    Low: RATING_COLORS.LOW,
    Medium: RATING_COLORS.MEDIUM,
    High: RATING_COLORS.OPTIMUM,
  };
  return colorMap[rating] || "#6b7280";
};