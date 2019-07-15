import * as React from "react"
import * as d3 from "d3"
import{SpiderDataItems} from '../../types'

interface IProps {
  data: SpiderDataItems
  radialScale: Function
  width: number
  colors: string[]
}

export const angleToCoordinate = (
  angle: number,
  value: number,
  width: number,
  radialScale: Function
) => {
  let x = Math.cos(angle) * radialScale(value)
  let y = Math.sin(angle) * radialScale(value)
  return { x: width / 2 + x, y: width / 2 - y }
}

const Axes: React.SFC<IProps> = ({ data, width, radialScale, colors }) => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    data.labels.map((d, i, data) => {
      const angle = Math.PI / 2 + (2 * Math.PI * i) / data.length
      const lineCoordinate = angleToCoordinate(angle, 5, width, radialScale)
      const labelCoordinate = angleToCoordinate(angle, 6.5, width, radialScale)
      d3.select(ref.current)
        .append("line")
        .attr("x1", `${width / 2}`)
        .attr("y1", `${width / 2}`)
        .attr("x2", `${lineCoordinate.x}`)
        .attr("y2", `${lineCoordinate.y}`)
        .attr("stroke", "#C5C5D7")
        .attr("stroke-width", "2")
        .style("mix-blend-mode", "multiply")

      d3.select(ref.current)
        .append("text")
        .attr("x", `${labelCoordinate.x}`)
        .attr("y", `${labelCoordinate.y}`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12")
        .attr("font-family", "sans-serif")
        .text(`${d}`)
    })

    let offsetY = 0
    let offsetX = 0
    let textAnchor: string
    data.datasets.map((d, index) => {
      d.values.map((item, i, array) => {
        const angle = Math.PI / 2 + (2 * Math.PI * i) / array.length
        const labelCoordinate = angleToCoordinate(
          angle,
          6.5,
          width,
          radialScale
        )
        if (i === 0 && index === 0) {
          offsetX = -45
        }
        if (i === 0) {
          offsetY = 20

          textAnchor = "start"
        } else {
          offsetX = 0
          offsetY = +18 * (index + 1)
          textAnchor = "middle"
        }
        d3.select(ref.current)
          .append("text")
          .attr("x", `${labelCoordinate.x + offsetX}`)
          .attr("y", `${labelCoordinate.y + offsetY}`)
          .attr("fill", `${colors[index]}`)
          .text(`${d.title} - ${d.values[i]}`)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", textAnchor)
          .attr("font-size", "12")
      })
    })
  }, [])
  return <g ref={ref} />
}

export default Axes
