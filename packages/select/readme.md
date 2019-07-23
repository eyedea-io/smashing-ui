<p align="center">
  <img src="https://i.imgur.com/i0AZMKy.png" />
</p>

```sh
yarn add @smashing/alert
```

[![Edit alert](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qvxn187xr4?fontsize=14)

#### Default appearance

![](https://i.imgur.com/aTOMmI5.png)

```jsx
<Alert title="Your account is active" />
<Alert title="Your account is active" intent="danger" />
<Alert title="Your account is active" intent="success" />
<Alert title="Your account is active" intent="warning" />
```

#### Card appearance

![](https://i.imgur.com/ZGi6w9e.png)

```jsx
<Alert title="Your account is active" appearance="card" />
<Alert title="Your account is active" appearance="card" intent="danger" />
<Alert title="Your account is active" appearance="card" intent="success" />
<Alert title="Your account is active" appearance="card" intent="warning" />
```

#### Inline appearance

![](https://i.imgur.com/vmXFlNm.png)

```jsx
<Alert title="Your account is active" appearance="inline" />
<Alert title="Your account is active" appearance="inline" intent="danger" />
<Alert title="Your account is active" appearance="inline" intent="success" />
<Alert title="Your account is active" appearance="inline" intent="warning" />
```

#### With description

![](https://i.imgur.com/8igOXGy.png)

```jsx
<Alert title="Your account is active">Lorem ipsum dolor sit amet.</Alert>
```

#### Without icon

![](https://i.imgur.com/jFJPWDW.png)

```jsx
<Alert title="Your account is active" hasIcon={false}>
  Lorem ipsum dolor sit amet.
</Alert>
```

#### Without trim(border)

![](https://i.imgur.com/NWX0EAL.png)

```jsx
<Alert title="Your account is active" hasTrim={false}>
  Lorem ipsum dolor sit amet.
</Alert>
```
