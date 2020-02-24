//Spider Chart Interfaces

export interface SpiderProps {
  /**
   * The size of chart.
   */
  width: number
  /**
   * The data for visualization.
   */
  data: SpiderDataItems
}

export interface SpiderDataItems {
  /**
   * The names of variables represented by chart.
   */
  labels: string[]
  /**
   * Array of colors for each polygon created from dataset.
   * If colors are not given, colors will be used from theme.
   */
  colors?: string[]
  /**
   * The datasets for visualization. Each dataset contains title and array of values.
   */
  datasets: SpiderDataObject[]
}

export interface SpiderDataObject {
  /**
   * The title of dataset.
   */
  title: string
  /**
   * Array of points corresponding to chart labels.
   * @example
   * datasets: [
   *   {
   *    title: "BS",
   *     values: [5, 5, 5, 5, 5]
   *   },
   *   {
   *     title: "Votes",
   *     values: [2.5, 2.5, 2.5, 2.5, 2.5]
   *   }
   * ]
   * }
   */
  values: number[]
}

//RadialProgress types

export interface RadialProgressProps {
  /**
   * The width of chart.
   */
  width: number
  /**
   * The height of chart.
   */
  height: number
  /**
   * The number given in percent for visualisation.
   */
  data: number
  /**
   * The title of chart.
   */
  title?: string
  /**
   * The description of chart.
   */
  description?: string
  /**
   * The color of progress circle.If it is not given, color will be used from theme.
   */
  color?: string
}

//ProgressBar types

export interface ProgressBarProps {
  /**
   * The width of chart.
   */
  width: number
  /**
   * The dataset for visualisation.
   * @example
   * const progressBarData = [
   * {
   *   option: "London",
   *   votes: 4
   * },
   * {
   *   option: "New York",
   *   votes: 14,
   *   isResult: true
   * },
   * {
   *   option: "Sydney",
   *   votes: 19
   * },
   * {
   *   option: "Paris",
   *   votes: 35
   * },
   * {
   *   option: "Beijing",
   *   votes: 87,
   *   isResult: true
   * }]
   */
  data: ProgressBarDataItem[]
  /**
   * The colors of progress bars.If they are not given, color will be used from theme.
   */
  colors?: ProgressBarColors
}

export interface ProgressBarColors {
  /**
   * The color of bar in background.
   */
  greyBackground: string
  /**
   * The color of progress bars in second(rest) group.
   */
  restValues: string
  /**
   * The color of progress bars in first(top) group.
   */
  topValues: string
  /**
   * The color of labels and top axis
   */
  greyLabels: string
  /**
   * The color of highlighted value in first(top) group.
   */
  topIsResult: string
  /**
   * The color of highlighted value in second(rest) group.
   */
  restIsResult: string
}

export interface ProgressBarDataItem {
  /**
   * The name of presenting value.
   */
  option: string
  /**
   * The number given in percent for visualisation.
   */
  votes: number
  /**
   * The flag of highlighted value.
   */
  isResult?: boolean
}

//Pie Chart types

export interface PieChartProps {
  /**
   * The width of chart.
   */
  width: number
  /**
   * The height of chart.
   */
  height: number
  /**
   * The dataset for visualisation.
   * @example
   * const pieChartData = [
   * {name: "USA", value: 60},
   * {name: "UK", value: 20},
   * {name: "Canada", value: 30},
   * {name: "Mexico", value: 15},
   * {name: "Japan", value: 10}
   * ]
   */
  data: PieChartData[]
  /**
   * Starting and end color name to generate color range.
   * If colors are not given, they will be used from theme.
   */
  colors?: [string, string]
  /**
   * The flag checking type of chart(Pie Chart or Donut Chart).
   * If true : Donut Chart
   * If false : Pie Chart
   */
  isDonut?: boolean
  /**
   * Value of space between chart parts
   */
  gutter?: number
  /**
   * Show chart labels with values
   */
  hasLabels?: boolean
}

export interface PieChartData {
  /**
   * The name of each slice.
   */
  name: string
  /**
   * The value of each slice.
   */
  value: number
  /**
   * Color of the slice
   */
  color?: string
}

//Bar Chart types

export interface BarChartProps {
  /**
   * The width of chart.
   */
  width: number
  /**
   * The height of chart.
   */
  height: number
  /**
   * The dataset for visualisation.
   * @example
   * const barChartData = [
   * {value: 0.27, description: "5 votes"},
   * {value: 0.63, description: "5 votes"},
   * {value: 0.17, description: "5 votes"},
   * {value: 0.55, description: "5 votes"},
   * {value: 0.73, description: "5 votes"},
   * {value: 0.13, description: "5 votes", isResult: true},
   * {value: 0.68, description: "5 votes"},
   * {value: 0.23, description: "5 votes"},
   * {value: 0.36, description: "5 votes"},
   * {value: 0.44, description: "5 votes"}
   * ]
   */
  data: BarChartDataItem[]
  /**
   * The titles for each group of bars.
   */
  titles?: BarChartTitles
  /**
   * Starting and end colors names to generate color range.
   * First two colors are for making range for left group of bars.
   * Two last colors are for right group of bars.
   * If colors are not given, they will be used from theme.
   */
  colors?: [string, string, string, string]
}

export interface BarChartTitles {
  /**
   * The title for left group of bars.
   */
  left: string
  /**
   * The title for right group of bars.
   */
  right: string
}

export interface BarChartDataItem {
  /**
   * The label generated from index in dataset.
   */
  label: number
  /**
   * The value of bar data.
   */
  value: number
  /**
   * The description for bar.
   */
  description: string
  /**
   * The flag of highlighted value.
   */
  isResult?: boolean
}
