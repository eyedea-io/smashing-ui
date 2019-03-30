# Title

> Manage page title with React component.

```sh
yarn add @smashing/title
```

### Change page title

This will set page title to `About`. If app title is configured, it will be set to `About - App Title`

```jsx
import {Title} from "@smashing/title"

export const AboutPage = () => (
  <div>
    <Title>About</Title>
  </div>
)
```

### Setup app title and separator

```jsx
import {TitleContext} from "@smashing/title"

export const App = () => (
  <TitleContext.Provider
    value={{
      title: 'My App Name',
      separator: ' - '
    }}
  >
    {/* ... */}
  </TitleContext.Provider>
)
```

