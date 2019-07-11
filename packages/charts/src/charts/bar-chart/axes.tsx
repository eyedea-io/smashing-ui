import * as React from "react"
import Axis from "./axis"

import {Margins, Dimensions, Scales} from "./bar-chart"

interface IProps {
  scales: Scales
  dimensions: Dimensions
  margins: Margins
}

const Axes: React.SFC<IProps> = ({scales, margins, dimensions}) => {
  const xProps = {
    orient: "Bottom",
    scale: scales.xScale,
    translate: `translate(0,${dimensions.height - margins.bottom})`,
    tickSize: 0
  }

  const yProps = {
    orient: "Left",
    scale: scales.yScale,
    translate: `translate(${margins.left},0)`,
    tickSize: dimensions.width - margins.left - margins.right
  }

  return (
    <g>
      <Axis {...yProps} />
      <Axis {...xProps} />
    </g>
  )
}

export default Axes
