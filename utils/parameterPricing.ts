/**
 * Utility helper for calculating parameter testing prices
 */

const PRICE_PER_PARAMETER = 50; // ₹50 per parameter

/**
 * Calculate the total price based on selected parameters
 * @param paramPh - pH parameter selected
 * @param paramDl - DL parameter selected
 * @param paramCl - CL parameter selected
 * @returns Total price in Indian Rupees
 */
export function calculateParameterPrice(
  paramPh: boolean,
  paramDl: boolean,
  paramCl: boolean
): number {
  let selectedCount = 0;
  
  if (paramPh) selectedCount++;
  if (paramDl) selectedCount++;
  if (paramCl) selectedCount++;
  
  return selectedCount * PRICE_PER_PARAMETER;
}

/**
 * Format price with Indian Rupee symbol
 * @param price - Price in rupees
 * @returns Formatted price string with ₹ symbol
 */
export function formatPrice(price: number): string {
  return `₹${price}`;
}

/**
 * Get the count of selected parameters
 * @param paramPh - pH parameter selected
 * @param paramDl - DL parameter selected
 * @param paramCl - CL parameter selected
 * @returns Number of selected parameters
 */
export function getSelectedParameterCount(
  paramPh: boolean,
  paramDl: boolean,
  paramCl: boolean
): number {
  let count = 0;
  if (paramPh) count++;
  if (paramDl) count++;
  if (paramCl) count++;
  return count;
}

