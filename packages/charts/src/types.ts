//Spider Chart Interfaces

export interface SpiderProps {
  width: number
  data: SpiderDataItems
}

export interface SpiderDataItems {
  labels: string[]
  colors: string[]
  datasets: SpiderDataObject[]
}

export interface SpiderDataObject {
  title: string
  values: number[]
}

  /**
   * The name used for the initials and title attribute.
   * @example 
   * const spiderChartData = {
  * labels: ["Mass Appeal", "Rebel", "Friend", "Young", "Playful"],
    colors: ["#6969AB", "#47B881"],
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
   */
 