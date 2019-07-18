import * as React from "react"

import Arc from "./arc"
import {RadialProgressProps} from '../../types'
// TODO : Title with dynamic size
// const Title = styled.h1`
//   font-family: sans-serif;
//   color: #585882;
//   line-height: 16px;
//   margin-bottom: 12px;
// `

const ProgressChart: React.SFC<RadialProgressProps> = props => {
  const x = props.width / 2
  const y = props.height / 2
  const minSize = Math.min(props.width, props.height)
  const radius = (minSize * 0.9) / 2
  return (
    <div>
      <svg width={props.width} height={props.height}>
        <Arc
          x={x}
          y={y}
          radius={radius}
          data={props.data}
          description={props.description}
          color={props.color}
        />
      </svg>
    </div>
  )
}

declare module "styled-components" {
  export interface SmashingRadialProgressDefaults
    extends Partial<{
      radialProgressChart?: {
        color?: string
      }
    }> {}
}

export default ProgressChart
