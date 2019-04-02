# Theme

> Theme configuration for smashing components

```sh
yarn add @smashing/theme
```


### Customizing theme

You can override theme values using `SmashingThemeProvider`. Use typescript autocomplete to see theme schema.

```jsx
import {SmashingThemeProvider} from '@smashing/theme'

const App = () => (
  <SmashingThemeProvider
    theme={{
      defaults: {
        button: {
          appearance: 'flat',
          height: 40
        }
      },
      fontFamilies: {
        ui: "arial",
        display: "Roboto"
      }
    }}
  >
    {/* ... */}
  </SmashingThemeProvider>
)
```
