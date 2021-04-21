import { isCustomBreakpoint } from '@chakra-ui/utils';
import type { Breakpoints } from '@chakra-ui/theme-tools';
import type { ResponsiveValue } from '@chakra-ui/react';

// Take a Chakra UI responsive prop and calculate what the value should be for each breakpoint in the theme
export const getResponsiveValues = <T>(
  values: ResponsiveValue<T>,
  breakpoints: Breakpoints<unknown>
) => {
  const breakpointNames = Object.keys(breakpoints).filter(isCustomBreakpoint);

  // Handle objects, e.g. convert { base: "16px", md: "32px", xl: "64px" } to { base: "16px", sm: "16px", md: "32px", lg: "32px", xl: "64px" }
  if (typeof values === 'object') {
    let previousValue: T | undefined;
    return breakpointNames.reduce((obj, bp) => {
      const value = values[bp];
      if (value !== undefined) {
        previousValue = value;
      }
      return { ...obj, [bp]: previousValue };
    }, {});
  }

  // Handle arrays, e.g. convert ["16px", "32px", null, "64px"] to { base: "16px", sm: "32px", md: "32px", lg: "64px", xl: "64px" }
  if (Array.isArray(values)) {
    let previousValue: T | undefined;
    return breakpointNames.reduce((obj, bp, idx) => {
      const value = values[idx];
      if (value !== undefined && value !== null) {
        previousValue = value;
      }
      return { ...obj, [bp]: previousValue };
    }, {});
  }

  // Handle raw values, e.g. convert "16px" to { base: "16px", sm: "16px", md: "16px", lg: "16px", xl: "16px" }
  return breakpointNames.reduce((obj, bp) => ({ ...obj, [bp]: values }), {});
};

// Check if a value is a key in the theme spacing scale
// If so return the theme value, otherwise return the raw value
export const getSpacingValue = (
  value: string | number,
  space: Record<string, string>
) => {
  const key = String(value);
  if (Object.keys(space).includes(key)) {
    return space[key];
  }

  return value;
};
