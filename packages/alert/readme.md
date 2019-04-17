![](https://i.imgur.com/zttpCqn.png)

```sh
yarn add @smashing/alert
```

[![Edit alert](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qvxn187xr4?fontsize=14)

## Design

![](https://i.imgur.com/jf1rlVb.png)

## Usage

```jsx
<Heading>Default style</Heading>
<Alert title="Your account is active" />
<Alert title="Your account is active" intent="danger" />
<Alert title="Your account is active" intent="success" />
<Alert title="Your account is active" intent="warning" />

<Heading>Card style</Heading>
<Alert title="Your account is active" appearance="card" />
<Alert title="Your account is active" appearance="card" intent="danger" />
<Alert title="Your account is active" appearance="card" intent="success" />
<Alert title="Your account is active" appearance="card" intent="warning" />

<Heading>Inline style</Heading>
<Alert title="Your account is active" appearance="inline" />
<Alert title="Your account is active" appearance="inline" intent="danger" />
<Alert title="Your account is active" appearance="inline" intent="success" />
<Alert title="Your account is active" appearance="inline" intent="warning" />

<Heading>With description</Heading>
<Alert title="Your account is active">
  Lorem ipsum dolor sit amet.
</Alert>
```
