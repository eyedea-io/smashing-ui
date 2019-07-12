import * as React from "react"

import Pie from "./pie"
import {Data} from "./pie"

interface IProps {
  width: number
  height: number
  data: Data[]
  colors?: [string,string]
  isDonut?: boolean
}

const PieChart: React.SFC<IProps> = props => {
  const x = props.width / 2
  const y = props.height / 2
  const minSize = Math.min(props.width, props.height)
  const radius = (minSize * 0.9) / 2

  return (
    <svg width={props.width} height={props.height}>
      <Pie
        x={x}
        y={y}
        radius={radius}
        data={props.data}
        colors={props.colors}
        isDonut={props.isDonut}
      />
    </svg>
  )
}

PieChart.defaultProps = {
  isDonut: true
}
declare module "styled-components" {
  export interface SmashingPieChartDefaults
    extends Partial<{
      pieChart?: {
        colors?: [string,string]
      }
    }> {}
}

export default PieChart
