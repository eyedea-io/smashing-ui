<p align="center">
  <img src="https://i.imgur.com/49llvEI.png" />
</p>

```sh
yarn add @smashing/portal
```

## Usage

```jsx
import {Portal} from "@smashing/portal"

export default () => (
  <div>
    App content...
    <Portal>Content moved outside of react tree.</Portal>
  </div>
)
```
