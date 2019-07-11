import * as React from "react"
import * as d3 from "d3"
import Circles from "./circles"
import Axes from "./axes"
import Polygon from "./polygon"
import { angleToCoordinate } from "./axes"
import { LineData } from "./polygon"
import useAlgorithm from "./algorithm"

interface IProps {
  width: number
  data: DataItems
}

export interface DataItems {
  labels: string[]
  colors: string[]
  datasets: DataObject[]
}

export interface DataObject {
  title: string
  values: number[]
}

const SpiderChart: React.SFC<IProps> = ({ width, data }) => {
  const radialScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([0, width / 2 - 100])

  const getPathCoordinates = (point: number[]) => {
    let coordinates: LineData[] = []
    data.labels.map((d, i, data) => {
      const angle = Math.PI / 2 + (2 * Math.PI * i) / data.length
      coordinates.push(angleToCoordinate(angle, point[i], width, radialScale))
    })
    return coordinates
  }
  const result = useAlgorithm(data, getPathCoordinates) // result of the intersection algorithm

  return (
    <>
      <svg width={width} height={width}>
        <Circles width={width} data={data} radialScale={radialScale} />
        <Axes
          width={width}
          data={data}
          radialScale={radialScale}
          colors={data.colors}
        />
        {data.datasets.map((d, i) => {
          return (
            <Polygon
              data={d.values}
              coordinates={getPathCoordinates}
              color={data.colors[i]}
            />
          )
        })}
      </svg>
    </>
  )
}

export default SpiderChart
