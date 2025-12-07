import {
  getPhRating,
  getOrganicCarbonRating,
  getCalciumRating,
  getMagnesiumRating,
  getSulfurRating,
  getIronRating,
  getManganeseRating,
  getZincRating,
  getCopperRating,
  getBoronRating,
  getMolybdenumRating,
  getChlorineRating,
  getNickelRating,
  getSodiumRating,
  getElectricalConductivityRating,
} from "@/utils/pdfChartColors";
import {
  getNitrogenRating,
  getPhosphorusRating,
  getPotassiumRating,
} from "@/utils/soilRating";

export const getRatingForParameter = (
  param: string,
  value: number
): string => {
  if (param === "ph") {
    return getPhRating(value);
  } else if (param === "nitrogen") {
    const nRating = getNitrogenRating(value);
    return nRating === "High" ? "Optimum" : nRating;
  } else if (param === "phosphorus") {
    const pRating = getPhosphorusRating(value);
    return pRating === "High" ? "Optimum" : pRating;
  } else if (param === "potassium") {
    const kRating = getPotassiumRating(value);
    return kRating === "High" ? "Optimum" : kRating;
  } else if (param === "calcium") {
    return getCalciumRating(value);
  } else if (param === "magnesium") {
    return getMagnesiumRating(value);
  } else if (param === "organicCarbon") {
    return getOrganicCarbonRating(value);
  } else if (param === "sulfur") {
    return getSulfurRating(value);
  } else if (param === "iron") {
    return getIronRating(value);
  } else if (param === "manganese") {
    return getManganeseRating(value);
  } else if (param === "zinc") {
    return getZincRating(value);
  } else if (param === "copper") {
    return getCopperRating(value);
  } else if (param === "boron") {
    return getBoronRating(value);
  } else if (param === "molybdenum") {
    return getMolybdenumRating(value);
  } else if (param === "chlorine") {
    return getChlorineRating(value);
  } else if (param === "nickel") {
    return getNickelRating(value);
  } else if (param === "sodium") {
    return getSodiumRating(value);
  } else if (param === "electricalConductivity") {
    return getElectricalConductivityRating(value);
  }
  return "N/A";
};