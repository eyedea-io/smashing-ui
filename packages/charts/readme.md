

# Chart Components

**Simple charts components for data visualization**

```sh
yarn add @smashing/charts
```
## Usage

**Pie Chart**

<p align="center">
  <img src="https://imgur.com/VdUMbLi.png" />
</p>

#### Example Data

```jsx
const pieChartData = [
  {name: "USA", value: 60},
  {name: "UK", value: 20},
  {name: "Canada", value: 30},
  {name: "Mexico", value: 15},
  {name: "Japan", value: 10}
]
```
```jsx
<PieChart width={300} height={300} data={pieChartData} />
```

<!-- [![Edit avatar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smashingavatar-yov92?fontsize=14)

#### Subtle(default) appearance

![](https://i.imgur.com/YjcCils.png)

```jsx
<Avatar name="Sasha Ho" />
```

#### Solid appearance

![](https://i.imgur.com/C9R6lGt.png)

```jsx
<Avatar name="Sasha Ho" appearance="solid" />
``` -->


