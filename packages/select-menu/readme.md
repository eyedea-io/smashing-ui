```sh
yarn add @smashing/select
```

#### Default appearance

![](https://i.imgur.com/qyYFWJd.png)
![](https://i.imgur.com/zWbnORu.png)

```jsx
<Select
  options={['a', 'b', 'c', 'd'].map(value => ({label: value, value}))}
  selected="b"
  onChange={value => {}}
/>
```

#### Modyfing height

![](https://i.imgur.com/vWvvtZp.png)

```jsx
<Select options={/*...*/} height={64} />
```

#### Difference appearances and intents

![](https://i.imgur.com/E8nr1oR.png)

```jsx
<Select options={/*...*/} appearance="primary" intent="danger" />
<Select options={/*...*/} appearance="primary" intent="info" />
<Select options={/*...*/} appearance="flat" intent="warning" />
```

#### Full width

![](https://i.imgur.com/SXGHtrY.png)

```jsx
<Select options={/*...*/} full />
```
