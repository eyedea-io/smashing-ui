

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

Example Data

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

**Radial Progress Chart**

<p align="center">
  <img src="https://imgur.com/46rpIFy.png" />
</p>

```jsx

<RadialProgress
        width={200}
        height={200}
        data={40}
        description={"45 votes"}
      />
```
**Bar Chart**

<p align="center">
  <img src="https://imgur.com/P9Jbl45.png" />
</p>

Example Data

```jsx
const barChartData = [
  {value: 0.27, description: "5 votes"},
  {value: 0.63, description: "5 votes"},
  {value: 0.17, description: "5 votes"},
  {value: 0.55, description: "5 votes"},
  {value: 0.73, description: "5 votes"},
  {value: 0.13, description: "5 votes", isResult: true},
  {value: 0.68, description: "5 votes"},
  {value: 0.23, description: "5 votes"},
  {value: 0.36, description: "5 votes"},
  {value: 0.44, description: "5 votes"}
]
```
```jsx
<BarChart
        width={600}
        height={250}
        data={barChartData}
        titles={{left: "Serious 45%", right: "Playful 55%"}}
      />
```
**Spider Chart**

<p align="center">
  <img src="https://imgur.com/56dFNG6.png" />
</p>

Example Data

```jsx
const spiderChartData = {
  labels: ["Mass Appeal", "Rebel", "Friend", "Young", "Playful"],
  datasets: [
    {
      title: "BS",
      values: [5, 5, 5, 5, 5]
    },
    {
      title: "Votes",
      values: [2.5, 2.5, 2.5, 2.5, 2.5]
    }
  ]
}
```
```jsx
<SpiderChart width={500} data={spiderChartData} />
```

**Progress Bar Chart**

<p align="center">
  <img src="https://imgur.com/w8xaLFz.png" />
</p>

Example Data

```jsx

const progressBarData = [
  {option: "London", votes: 4},
  {option: "New York", votes: 14, isResult: true},
  {option: "Sydney", votes: 19},
  {option: "Paris", votes: 35},
  {option: "Beijing", votes: 87, isResult: true},
  {option: "New York", votes: 67},
  {option: "Sydney", votes: 76},
  {option: "Sydney", votes: 76},
  {option: "Paris", votes: 1, isResult: true}
]
```
```jsx
<ProgressBar width={600} data={progressBarData} />
```