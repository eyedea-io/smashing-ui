```sh
yarn add @smashing/select
```

#### Default appearance

![](https://i.imgur.com/yAfwzze.png)

```jsx
<Select
  options={["a", "b", "c", "d"].map(value => ({label: value, value}))}
  selected="a"
  onDeselect={item => {}}
  onSelect={item => {}}
>  
  <Button>Select option</Button>
</Select>
```

#### Multi select

![](https://i.imgur.com/Qy0pfgd.png)

```jsx
<Select
  options={["a", "b", "c", "d"].map(value => ({label: value, value}))}
  selected={["a"]}
  isMultiSelect
  onDeselect={item => {}}
  onSelect={item => {}}
>
  <Button>Select options</Button>
</Select>
```