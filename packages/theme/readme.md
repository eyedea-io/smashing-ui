# Theme

> Theme configuration for smashing components

```sh
yarn add @smashing/theme
```

### Customizing theme

You can override theme values using `SmashingThemeProvider`. Use typescript autocomplete to see theme schema.

```jsx
import {SmashingThemeProvider, createTheme} from '@smashing/theme'

const baseTheme = createTheme({
  defaults: {
    button: {
      appearance: 'flat',
      height: 40
    }
  },
  fontFamilies: {
    ui: 'arial',
    display: 'Roboto'
  }
})

const App = () => (
  <SmashingThemeProvider theme={baseTheme}>{/* ... */}</SmashingThemeProvider>
)
```

### Theme modifiers (dark mode)

You can change theme for parts of your app using `SmashingThemeModifier`. It will take global smashing theme and overwrite it with values provided in `theme` prop.

```tsx
import {
  SmashingThemeProvider,
  SmashingThemeModifier,
  createTheme
} from '@smashing/theme'

const baseTheme = createTheme({
  colors: {
    heading: {
      default: '#666666'
    }
  }
})

const darkTheme = createTheme({
  colors: {
    heading: {
      default: '#fff'
    }
  }
})

const App = () => (
  <SmashingThemeProvider theme={baseTheme}>
    {/* ... somewhere deep in your app */}
    <SmashingThemeModifier theme={darkTheme}>
      <Heading>I'm light</Heading>
    </SmashingThemeModifier>
    {/* ... */}
  </SmashingThemeProvider>
)
```

You can make a wrapper component for your theme:

```tsx
const DarkTheme = props => (
  <SmashingThemeModifier
    theme={{
      colors: {
        text: {
          muted: '#7887A0',
          default: '#CDD4E3',
          intense: '#FFFFFF',
          success: '#00E074',
          warning: '#E88C32',
          danger: '#FF3730',
          info: '#2998FF'
        }
      }
    }}
    {...props}
  />
)
```

and use it:

```tsx
<DarkTheme>
  <Header>Title</Header>
  <Header color="muted">Meta data...</Header>
</DarkTheme>
```
