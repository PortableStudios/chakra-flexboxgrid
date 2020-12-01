# chakra-flexboxgrid

A collection of [Chakra UI](https://github.com/chakra-ui/chakra-ui)
utility components for creating a grid-based layout using flexbox.

Heavily based on the [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) library.

# Installation

First, ensure you can install private Portable packages by following [the authentication steps in our `figma2theme` repo](https://github.com/PortableStudios/figma2theme).

Then install the dependency via your preferred package manager.

**Yarn:**

```bash
yarn add @portablestudios/chakra-flexboxgrid
```

**NPM:**

```bash
npm install @portablestudios/chakra-flexboxgrid
```

# Usage

See our [Storybook](https://chakra-flexboxgrid.netlify.app/) and the corresponding [story file](./stories/FlexboxGrid.stories.tsx) for usage examples.

## Usage with figma2theme

If you are using our [`figma2theme`](https://github.com/PortableStudios/figma2theme) tool and the Figma project includes
layout grid styles, the tool will generate a `grids.ts` file which will contain "grid config" objects corresponding to each style.

These config objects can be passed directly to the `FlexboxGrid` component. For example, to use the "page" grid layout:

```
import * as gridConfigs from '@/theme/_generated/grids';
...
<FlexboxGrid config={gridConfigs.page}>
  ...
</FlexboxGrid>
```

# Development

While developing, use Storybook to test the components:

```bash
yarn storybook
```

Publish a new version by bumping the version and then pushing to the `main` branch.

# TODO

- Add tests
