import * as React from "react"
import * as d3 from "d3"

import Axes from "./axes"
import Bar from "./bar"
import Title from "./title"

interface IProps {
  width: number
  height: number
  data: DataItem[]
  titles?: Titles
}

interface Titles {
  left: string
  right: string
}

export interface DataItem {
  label: number
  value: number
  description: string
  isResult?: boolean
}

export interface Margins {
  top: number
  bottom: number
  left: number
  right: number
}

export interface Dimensions {
  width: number
  height: number
}

export interface Scales {
  xScale: d3.ScaleBand<string>
  yScale: d3.ScaleLinear<number, number>
}

//TODO: add gradient on domain

const BarChart: React.SFC<IProps> = ({
  width,
  height,
  data,
  titles = {left: "", right: ""}
}) => {
  const margins = {
    top: height / 5,
    bottom: height / 5,
    left: width / 10,
    right: width / 10
  }
  const maxValue = Math.max(...data.map(d => d.value))

  const makeLabels = (data: DataItem[]) => {
    if (data.length % 2 === 0) {
      let label = data.length / 2
      data.map(item => {
        item.label = label
        --label
        if (label === 0) {
          --label
        }
        return item.label
      })
    } else {
      let label = (data.length - 1) / 2
      data.map(item => {
        item.label = label
        --label
        return item.label
      })
    }
  }
  makeLabels(data)
  const xScale = d3
    .scaleBand()
    .padding(0.5)
    .domain(data.map((d: any, i) => d.label))
    .range([margins.left, width - margins.right])
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue + 0.2])
    .range([height - margins.top, margins.bottom])

  return (
    <div>
      <svg width={width} height={height}>
        <Axes
          scales={{xScale, yScale}}
          margins={margins}
          dimensions={{width, height}}
        />
        <Bar
          scales={{xScale, yScale}}
          margins={margins}
          data={data}
          maxValue={maxValue}
          dimensions={{width, height}}
        />
        {titles.left && (
          <Title
            title={titles.left}
            w={2.5 * margins.left}
            h={height - 5}
            color="#313153"
          />
        )}
        {titles.right && (
          <Title
            title={titles.right}
            w={width - 3.75 * margins.right}
            h={height - 5}
            color="#1C6BC4"
          />
        )}
      </svg>
    </div>
  )
}

export default BarChart
