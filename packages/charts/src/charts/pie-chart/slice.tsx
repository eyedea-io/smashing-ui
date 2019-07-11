import * as React from "react"

import * as d3 from "d3"

interface IProps {
  key: number
  outerRadius: number
  value: any
  fill?: string
  data: any
  isDonut?: boolean
}

export const Slice: React.FC<IProps> = props => {
  const {value, fill, outerRadius, data, isDonut} = props
  const ref = React.useRef(null)
  let innerRadius: number, padAngle: number | undefined
  if (isDonut) {
    innerRadius = outerRadius / 2
    padAngle = 0.04
  } else {
    innerRadius = 0
    padAngle = 0
  }

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(padAngle)

  React.useEffect(() => {
    const arcTween: any = () => {
      const d = props.value
      const i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
      return (t: number) => {
        d.endAngle = i(t)
        return arc(d)
      }
    }
    d3.select(ref.current)
      .transition()
      .duration(1000)
      .ease(d3.easeExpInOut)
      .attrTween("d", arcTween)
  })

  const label = data.find(
    (element: {value: any}) => element.value === value.data
  )
  return (
    <g>
      <path ref={ref} d={arc(value) as string} fill={fill} />
      <text
        transform={`translate(${arc.centroid(value)})`}
        textAnchor="middle"
        fill="white"
        style={{fontFamily:"sans-serif",fontSize:"12"}}
      >
        {label.name}
      </text>
      <text
        transform={`translate(${arc.centroid(value)})`}
        dy=".95em"
        textAnchor="middle"
        fill="white"
        style={{fontFamily:"sans-serif",fontSize:"12"}}
      >
        {value.data}
      </text>
    </g>
  )
}

Slice.defaultProps = {
  fill: "white"
}

export default Slice
