```sh
yarn add @smashing/css
```

> CSS utils: reset to sane defaults, normalize across browsers.

```tsx
import {Reset, Normalize} from "@smashing/css"
import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    --border-color: #e5e5e5;
    --base-spacing: 16px;
  }
`

const App = () => (
  <div>
    <GlobalStyle />
    <Reset />
    <Normalize />
  </div>
)
```
