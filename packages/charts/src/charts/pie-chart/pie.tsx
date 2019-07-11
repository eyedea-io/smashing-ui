import * as React from "react"

import * as d3 from "d3"

import Slice from "./slice"

interface IProps {
  x: number
  y: number
  radius: number
  data: Data[]
  colors: any
  isDonut?: boolean
}

export interface Data {
  name: string
  value: number
}

class Pie extends React.Component<IProps, any> {
  public colorScale: any = d3
    .scaleLinear()
    .domain([0, this.props.data.length])
    .range(this.props.colors)

  public renderSlice = (value: any, i: number) => {
    return (
      <Slice
        key={i}
        outerRadius={this.props.radius}
        value={value}
        data={this.props.data}
        fill={this.colorScale(i)}
        isDonut={this.props.isDonut}
      />
    )
  }

  public render() {
    const {x, y, data} = this.props
    const pie = d3.pie()
    return (
      <g transform={`translate(${x}, ${y})`}>
        {pie(
          data.map(function(d) {
            return d.value
          })
        ).map(this.renderSlice)}
      </g>
    )
  }
}

export default Pie
