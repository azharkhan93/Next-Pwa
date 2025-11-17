export const getRatingColor = (rating?: string) => {
  if (!rating) return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  
  const ratingLower = rating.toLowerCase();
  if (ratingLower === "very low" || ratingLower === "low") {
    return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
  } else if (ratingLower === "medium") {
    return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
  } else if (ratingLower === "high" || ratingLower === "optimum") {
    return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
  } else if (ratingLower === "very high") {
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  }
  return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
};

