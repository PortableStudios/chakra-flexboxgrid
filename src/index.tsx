import React, { useContext } from 'react';
import { Flex, useTheme } from '@chakra-ui/react';
import { isCustomBreakpoint } from '@chakra-ui/utils';
import type { FlexProps, ResponsiveValue } from '@chakra-ui/react';

import { getResponsiveValues, getSpacingValue } from './utils';

// Context for sharing the grid config between components

export type FlexboxGridConfig = {
  columns: ResponsiveValue<number>;
  gutter: ResponsiveValue<number | string>;
  margin: ResponsiveValue<number | string>;
};

export type FlexboxGridContextProps = {
  config: FlexboxGridConfig;
};

export const FlexboxGridContext = React.createContext<FlexboxGridContextProps>({
  config: { columns: 1, gutter: 0, margin: 0 },
});

// Grid components

export type FlexboxGridProps = {
  config: FlexboxGridConfig;
} & FlexProps;

export const FlexboxGrid: React.FC<FlexboxGridProps> = ({
  config,
  children,
  ...rest
}) => {
  return (
    <FlexboxGridContext.Provider value={{ config }}>
      <Flex direction="column" paddingX={config.margin} width="100%" {...rest}>
        {children}
      </Flex>
    </FlexboxGridContext.Provider>
  );
};

export type FlexboxGridRowProps = {
  // Value(s) between 0-1 to make the row bleed in to the grid margins
  // (e.g. 0.5 for half-bleed, for 1 for full-bleed)
  ignoreMargins?: ResponsiveValue<number>;
} & FlexProps;

export const FlexboxGridRow: React.FC<FlexboxGridRowProps> = ({
  ignoreMargins = 0,
  ...rest
}) => {
  const { breakpoints, space } = useTheme();
  const { config } = useContext(FlexboxGridContext);
  const breakpointNames = Object.keys(breakpoints).filter(isCustomBreakpoint);

  // Calculate negative horizontal margins using the gutter sizes
  // If ignoreMargins is set, use values to subtract from horizontal margins
  const gutter = getResponsiveValues(config.gutter, breakpoints);
  const margin = getResponsiveValues(config.margin, breakpoints);
  const ignore = getResponsiveValues(ignoreMargins, breakpoints);
  const marginX = breakpointNames.reduce((mx, breakpoint) => {
    const g = getSpacingValue(gutter[breakpoint], space);
    const m = getSpacingValue(margin[breakpoint], space);
    const i = ignore[breakpoint];
    return {
      ...mx,
      [breakpoint]:
        i === 0 ? `calc(-${g} / 2)` : `calc((-${g} / 2) - (${m} * ${i}))`,
    };
  }, {});

  return <Flex direction="row" flexWrap="wrap" marginX={marginX} {...rest} />;
};

export type FlexboxGridItemProps = {
  colOffset?: ResponsiveValue<number>;
  colWidth: ResponsiveValue<number>;
} & FlexProps;

export const FlexboxGridItem: React.FC<FlexboxGridItemProps> = ({
  colOffset = 0,
  colWidth,
  children,
  ...rest
}) => {
  const { breakpoints, space } = useTheme();
  const { config } = useContext(FlexboxGridContext);
  const breakpointNames = Object.keys(breakpoints).filter(isCustomBreakpoint);

  const width = getResponsiveValues(colWidth, breakpoints);
  const offset = getResponsiveValues(colOffset, breakpoints);
  const gutter = getResponsiveValues(config.gutter, breakpoints);
  const columns = getResponsiveValues(config.columns, breakpoints);
  // Calculate the flex-basis from the colWidth values
  const flexBasis = breakpointNames.reduce((fb, breakpoint) => {
    const w = width[breakpoint];
    const c = columns[breakpoint];
    return { ...fb, [breakpoint]: `calc(100% * (${w} / ${c}))` };
  }, {});
  // Calculate the margin-left from the colOffset values
  const marginLeft = breakpointNames.reduce((ml, breakpoint) => {
    const o = offset[breakpoint];
    const c = columns[breakpoint];
    return { ...ml, [breakpoint]: `calc(100% * (${o} / ${c}))` };
  }, {});
  // Calculate the padding from the gutter values
  const paddingX = breakpointNames.reduce((px, breakpoint) => {
    const g = getSpacingValue(gutter[breakpoint], space);
    return { ...px, [breakpoint]: `calc(${g} / 2)` };
  }, {});

  return (
    <Flex
      flexBasis={flexBasis}
      marginLeft={marginLeft}
      maxWidth={flexBasis}
      paddingX={paddingX}
      {...rest}
    >
      {children}
    </Flex>
  );
};
