// Helper function to calculate CEC value for specific nutrients
export const calculateCECValue = (param: string, value: number): string => {
  // Only calculate for K, Ca, Mg
  if (param === "potassium") {
    return (value / 390).toFixed(2);
  } else if (param === "calcium") {
    return (value / 200).toFixed(2);
  } else if (param === "magnesium") {
    return (value / 120).toFixed(2);
  }
  return "-";
};

export const calculateCEC = (
  calcium: number | null,
  magnesium: number | null,
  potassium: number | null
): number => {
  if (calcium && magnesium && potassium) {
    return (calcium / 200 + magnesium / 120 + potassium / 390) * 10;
  }
  return 11.1;
};

export const calculateSaturations = (
  potassium: number | null,
  calcium: number | null,
  magnesium: number | null,
  cec: number
) => {
  const kSaturation =
    potassium && cec ? (potassium / 390 / cec) * 100 : 4.6;
  const caSaturation = calcium && cec ? (calcium / 200 / cec) * 100 : 80.0;
  const mgSaturation = magnesium && cec ? (magnesium / 120 / cec) * 100 : 12.8;

  return {
    kSaturation,
    caSaturation,
    mgSaturation,
  };
};