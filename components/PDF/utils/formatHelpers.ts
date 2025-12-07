export const formatDate = (dateString?: string): string => {
  if (!dateString) return new Date().toLocaleDateString();
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatResultValue = (name: string, value: number): string => {
  if (name === "Soil pH" || name === "Buffer pH") {
    return value.toFixed(2);
  } else if (name === "Organic Carbon (OC)") {
    return value.toFixed(2);
  } else if (name.includes("(Ca)") || name.includes("(Mg)")) {
    return value.toFixed(1);
  }
  return value.toFixed(0);
};