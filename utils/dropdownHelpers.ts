import type { DropdownOption } from "@/components/Dropdown/Dropdown";

export const OTHER_OPTION_VALUE = "__other__";
export const OTHER_OPTION_LABEL = "Other";

/**
 * Checks if the given value is the "other" option
 */
export const isOtherOption = (value: string): boolean => {
  return value === OTHER_OPTION_VALUE;
};

/**
 * Creates an "Other" option for dropdowns
 */
export const createOtherOption = (): DropdownOption => {
  return {
    label: OTHER_OPTION_LABEL,
    value: OTHER_OPTION_VALUE,
  };
};

/**
 * Adds "Other" option to the end of options array if it doesn't exist
 */
export const addOtherOptionIfNeeded = (
  options: DropdownOption[]
): DropdownOption[] => {
  const hasOther = options.some((opt) => opt.value === OTHER_OPTION_VALUE);
  if (hasOther) {
    return options;
  }
  return [...options, createOtherOption()];
};

/**
 * Gets the display value for a dropdown, handling "other" option
 */
export const getDropdownDisplayValue = (
  value: string,
  options: DropdownOption[],
  placeholder: string,
  otherValue?: string
): string => {
  if (isOtherOption(value)) {
    return otherValue || OTHER_OPTION_LABEL;
  }
  const selectedOption = options.find((opt) => opt.value === value);
  return selectedOption?.label || placeholder;
};

/**
 * Normalizes the value - if it's a custom "other" value, returns OTHER_OPTION_VALUE
 */
export const normalizeDropdownValue = (
  value: string,
  options: DropdownOption[]
): string => {
  // If value exists in options, return it
  if (options.some((opt) => opt.value === value)) {
    return value;
  }
  // If value is not in options and not already "other", treat as "other"
  if (value && !isOtherOption(value)) {
    return OTHER_OPTION_VALUE;
  }
  return value;
};

