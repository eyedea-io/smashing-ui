```sh
yarn add @smashing/css
```

> CSS utils: reset to sane defaults, normalize across browsers.

```tsx
import {Reset, Normalize} from "@smashing/css"
import {createGlobalStyle} from "styled-components"

const App = () => (
  <div>
    <GlobalStyle />
    <Reset />
    <Normalize />
  </div>
)
```
