# Head

> Manage page head content. Add meta, link, title, style tags to page head.

```sh
yarn add @smashing/head
```

### Usage

```jsx
import {Head} from "@smashing/head"

export const AboutPage = () => (
  <div>
    <Head>
      <title>About us</title>
      <meta property="og:title" content="About us" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
    </Head>
  </div>
)
```
