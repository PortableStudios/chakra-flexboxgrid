import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { StoryWrapper } from '@storybook/addons';

const withThemeProvider: StoryWrapper = (Story, context) => {
  return (
    <ChakraProvider>
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
