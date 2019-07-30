import * as React from 'react'
import * as d3 from 'd3'
interface IProps {
  data: number[]
  coordinates: Function
  color: string
}

export interface LineData {
  x: number
  y: number
}

const Polygon: React.SFC<IProps> = ({data, coordinates, color}) => {
  const line = d3
    .line<LineData>()
    .x((d: LineData) => d.x)
    .y((d: LineData) => d.y)

  const ref = React.useRef(null)
  React.useEffect(() => {
    d3.select(ref.current)
      .append('path')
      .datum(coordinates(data))
      .attr('d', line)
      .transition()
      .duration(500)
      .ease(d3.easeBack)
      .attr('fill', `${color}`)
      .attr('opacity', 0.75)
      .style('mix-blend-mode', 'multiply')

    coordinates(data).map(d => {
      d3.select(ref.current)
        .append('g')
        .append('circle')
        .attr('cx', `${d.x}`)
        .attr('cy', `${d.y}`)
        .attr('fill', `${color}`)
        .attr('r', '1')
        .transition()
        .duration(500)
        .ease(d3.easeBack)
        .attr('r', '4')
    })
  }, [])
  return <g ref={ref} />
}

export default Polygon
