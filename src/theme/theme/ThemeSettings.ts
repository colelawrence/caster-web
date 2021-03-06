import { Settings } from './ThemeApp'

export const initialTheme = {
  backgroundColor: '#888',
  tileBackgroundColor: '#222',
  tilePriceColor: '#FF3333',
  tileDescriptionColor: '#f2f2f2',
  borderRadius: '0px',
  tileBorderRadius: '0px',
  tileRatio: '66%',
  tileMarginH: '8px',
  tileMarginV: '16px',
  tilePaddingH: '8px',
  tilePaddingV: '8px',
  tileImageSize: 'cover',
}

export type ThemeValue = typeof initialTheme

export const THEME_SETTINGS: Settings<ThemeValue> = {
  backgroundColor: {
    id: 'backgroundColor',
    title: 'Background color',
    description: 'Background color of the widget',
    unit: {
      kind: 'color',
    },
  },
  tileImageSize: {
    id: 'tileImageSize',
    title: 'Tile image formatting',
    description: 'How do you want the image will be formatted',
    unit: {
      kind: 'choice',
      options: [
        { label: 'Fill', value: 'cover' },
        { label: 'Fit', value: 'contain' },
      ],
    },
  },
  tileBackgroundColor: {
    id: 'tileBackgroundColor',
    title: 'Tile background color',
    description: 'Background color of each concept tile',
    unit: { kind: 'color' },
  },
  tilePriceColor: {
    id: 'tilePriceColor',
    title: 'Tile price text color',
    description: 'Text color of the concept predicted price',
    unit: { kind: 'color' },
  },
  tileDescriptionColor: {
    id: 'tileDescriptionColor',
    title: 'Tile description text color',
    description: 'Text color of the concept description',
    unit: { kind: 'color' },
  },
  tileBorderRadius: {
    id: 'tileBorderRadius',
    title: 'Tile border radius',
    description: 'Set rounded borders for the concept tiles',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
  borderRadius: {
    id: 'borderRadius',
    title: 'Border radius',
    description: 'Set rounded borders of the widget',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
  tileRatio: {
    id: 'tileRatio',
    title: 'Tile Image Ratio',
    description: 'Set ratio of concept tile image',
    unit: {
      kind: 'percent',
      min: 30,
      max: 150,
    },
  },
  tileMarginH: {
    id: 'tileMarginH',
    title: 'Tile horizontal margins',
    description: 'Set spacing around the left and right of each concept tile',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
  tileMarginV: {
    id: 'tileMarginV',
    title: 'Tile vertical margins',
    description: 'Set spacing around the top and bottom of each concept tile',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
  tilePaddingH: {
    id: 'tilePaddingH',
    title: 'Tile horizontal padding',
    description: 'Set padding around the left and right of each concept tile',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
  tilePaddingV: {
    id: 'tilePaddingV',
    title: 'Tile vertical padding',
    description: 'Set padding around the top and bottom of each concept tile',
    unit: {
      kind: 'px',
      min: 0,
      max: 20,
    },
  },
}
