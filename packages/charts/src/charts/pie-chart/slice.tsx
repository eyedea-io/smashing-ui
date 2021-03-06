import * as React from 'react'

import * as d3 from 'd3'

interface IProps {
  key: number
  outerRadius: number
  value: any
  fill?: string
  isDonut?: boolean
  hasLabels?: boolean
  gutter?: number
}

export const Slice: React.FC<IProps> = props => {
  const {value, fill, outerRadius, isDonut, hasLabels, gutter} = props
  const ref = React.useRef(null)
  let innerRadius: number, padAngle: number | undefined
  if (isDonut) {
    innerRadius = outerRadius / 2
    padAngle = gutter === undefined ? 0.04 : gutter
  } else {
    innerRadius = 0
    padAngle = gutter === undefined ? 0 : gutter
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
      .attrTween('d', arcTween)
  })
  return (
    <g>
      <path
        ref={ref}
        d={arc(value) as string}
        fill={value.data.color || fill}
      />
      {hasLabels && (
        <>
          <text
            transform={`translate(${arc.centroid(value)})`}
            textAnchor="middle"
            fill="white"
            style={{fontFamily: 'sans-serif', fontSize: '12'}}
          >
            {value.data.name}
          </text>
          <text
            transform={`translate(${arc.centroid(value)})`}
            dy=".95em"
            textAnchor="middle"
            fill="white"
            style={{fontFamily: 'sans-serif', fontSize: '12'}}
          >
            {value.data.value}
          </text>
        </>
      )}
    </g>
  )
}

Slice.defaultProps = {
  fill: 'white'
}

export default Slice
