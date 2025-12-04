export const getRatingColor = (rating?: string) => {
  if (!rating) return "bg-gray-100 text-gray-700";
  
  const ratingLower = rating.toLowerCase();
  if (ratingLower === "very low" || ratingLower === "low") {
    return "bg-red-100 text-red-700";
  } else if (ratingLower === "medium") {
    return "bg-yellow-100 text-yellow-700";
  } else if (ratingLower === "high" || ratingLower === "optimum") {
    return "bg-green-100 text-green-700";
  } else if (ratingLower === "very high") {
    return "bg-blue-100 text-blue-700";
  }
  return "bg-gray-100 text-gray-700";
};

