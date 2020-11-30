import React from 'react';
import { rem } from 'polished';
import { Box, Flex } from '@chakra-ui/react';
import type { Story, Meta } from '@storybook/react';

import { FlexboxGrid, FlexboxGridItem, FlexboxGridRow } from '../src';

export default {
  title: 'FlexboxGrid/Examples',
  component: FlexboxGrid,
} as Meta;

type Args = React.ComponentProps<typeof FlexboxGrid>;

// An example grid config to use for the stories
const exampleConfig = {
  columns: { base: 4, md: 4, lg: 12 },
  gutter: { base: 2, md: 4, lg: 6 },
  margin: { base: 4, md: 8, lg: 24 },
};

const Block: React.FC<{ num: number }> = ({ num }) => {
  const colours = ['red', 'blue', 'teal', 'purple', 'yellow'];
  return (
    <Box
      backgroundColor={`${colours[num - 1]}.100`}
      boxShadow="0 0 0 1px black"
      fontFamily="Arial"
      fontSize={rem('24px')}
      fontWeight="bold"
      paddingY={10}
      textAlign="center"
      width="100%"
    >
      {num}
    </Box>
  );
};

export const Simple: Story<Args> = (args) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="black"
      border="2px solid black"
      direction="column"
      width="100%"
    >
      <FlexboxGrid backgroundColor="gray.50" maxWidth={rem('1440px')} {...args}>
        <FlexboxGridRow>
          <FlexboxGridItem colWidth={{ base: 4, lg: 6 }}>
            <Block num={1} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, lg: 6 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={2} />
          </FlexboxGridItem>
        </FlexboxGridRow>
        <FlexboxGridRow marginTop={4}>
          <FlexboxGridItem colWidth={{ base: 4, lg: 4 }}>
            <Block num={3} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, lg: 4 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={4} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, lg: 4 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={5} />
          </FlexboxGridItem>
        </FlexboxGridRow>
      </FlexboxGrid>
    </Flex>
  );
};
Simple.args = { config: exampleConfig };

export const Complex: Story<Args> = (args) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="black"
      border="2px solid black"
      direction="column"
      width="100%"
    >
      <FlexboxGrid backgroundColor="gray.50" maxWidth={rem('1440px')} {...args}>
        <FlexboxGridRow>
          <FlexboxGridItem colWidth={{ base: 1, lg: 4 }}>
            <Block num={1} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colOffset={{ base: 0, lg: 2 }}
            colWidth={{ base: 2, lg: 6 }}
          >
            <Block num={2} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colOffset={{ base: 0, lg: 4 }}
            colWidth={{ base: 1, lg: 8 }}
            marginTop={{ base: 0, lg: 4 }}
          >
            <Block num={3} />
          </FlexboxGridItem>
        </FlexboxGridRow>
        <FlexboxGridRow marginTop={4}>
          <FlexboxGridItem
            colOffset={{ base: 0, md: 1, lg: 0 }}
            colWidth={{ base: 4, md: 3, lg: 4 }}
          >
            <Block num={4} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, md: 3, lg: 8 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={5} />
          </FlexboxGridItem>
        </FlexboxGridRow>
      </FlexboxGrid>
    </Flex>
  );
};
Complex.args = { config: exampleConfig };

export const OverhangingRow: Story<Args> = (args) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="black"
      border="2px solid black"
      direction="column"
      width="100%"
    >
      <FlexboxGrid backgroundColor="gray.50" maxWidth={rem('1440px')} {...args}>
        <FlexboxGridRow ignoreMargins={{ base: 1, lg: 1 / 2 }}>
          <FlexboxGridItem colWidth={{ base: 4, lg: 12 }}>
            <Block num={1} />
          </FlexboxGridItem>
        </FlexboxGridRow>
        <FlexboxGridRow marginTop={4}>
          <FlexboxGridItem colWidth={{ base: 4, lg: 4 }}>
            <Block num={3} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, lg: 4 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={4} />
          </FlexboxGridItem>
          <FlexboxGridItem
            colWidth={{ base: 4, lg: 4 }}
            marginTop={{ base: 4, lg: 0 }}
          >
            <Block num={5} />
          </FlexboxGridItem>
        </FlexboxGridRow>
      </FlexboxGrid>
    </Flex>
  );
};
OverhangingRow.args = { config: exampleConfig };
