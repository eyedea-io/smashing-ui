<p align="center">
  <img src="https://i.imgur.com/Ud8aAT5.png" />
</p>

```sh
yarn add @smashing/button-group
```

#### Default usage

![](https://i.imgur.com/Ud8aAT5.png)

```jsx
const ReactComponent = () => {
  const [value, setValue] = React.useState(1)

  return (
    <ButtonGroup
      onChange={v => setValue(v)}
      value={value}
      options={[
        {
          label: 'first button',
          value: 1
        },
        {
          label: 'second button',
          value: 2
        }
      ]}
    />
  )
}
```
