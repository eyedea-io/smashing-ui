# Alert

> Component are used to give feedback to the user about an action or state.

```sh
yarn add @smashing/alert
```

![](https://i.imgur.com/jf1rlVb.png)


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
