import * as React from "react"
import * as d3 from "d3"
import BrandSprintResult from "./brand-sprint-result"

import {Margins, Dimensions, Scales, DataItem} from "./bar-chart"

interface IProps {
  maxValue: number
  scales: Scales
  margins: Margins
  dimensions: Dimensions
  data: DataItem[]
}

const Bar: React.SFC<IProps> = ({scales, margins, dimensions, data}) => {
  const colorScale = d3
    .scaleLinear<string>()
    .domain([0, data.length / 2 - 1, data.length / 2, data.length])
    .range(["#313153", "#8080AB", "#82B0E4", "#1C6BC4"])

  const r = 6
  const ref = React.useRef(null)

  React.useEffect(() => {
    data.map((d: any, index) => {
      const bw = scales.xScale.bandwidth()
      const bh = dimensions.height - scales.yScale(d.value) - margins.top
      d3.select(ref.current)
        .append("text")
        .attr("x", `${(scales.xScale(d.label) as number) + bw - r}`)
        .attr("y", `${scales.yScale(d.value) - 16}`)
        .style("fill", colorScale(index))
        .style("font-size", "10")
        .style("font-weight", "700")
        .style("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .text(`${Math.round(d.value * 100)}%`)

      d3.select(ref.current)
        .append("text")
        .attr("x", `${scales.xScale(d.label)}`)
        .attr("y", `${scales.yScale(d.value) - 4}`)
        .style("fill", colorScale(index))
        .style("font-size", "9")
        .style("font-family", "sans-serif")
        .text(`${d.description}`)

      d3.select(ref.current)
        .append("path")
        .attr("fill", colorScale(index))
        .attr("d", item => {
          return bar(
            scales.xScale(d.label) as number,
            dimensions.height - margins.bottom,
            0,
            0,
            r
          )
        })
        .transition()
        .delay(d => 50 * index)
        .attr("d", item => {
          return bar(
            scales.xScale(d.label) as number,
            dimensions.height - margins.bottom,
            bw,
            bh,
            r
          )
        })
    })
  })

  const bar = (x: number, y: number, w: number, h: number, r: number) => {
    const x0 = x + r
    const x1 = x + w - r
    const y0 = y - h + r
    const l = "L",
      a = "A"

    const parts = [
      "M",
      x,
      y,
      l,
      x,
      y0,
      a,
      r,
      r,
      0,
      0,
      1,
      x0,
      y - h,
      l,
      x1,
      y - h,
      a,
      r,
      r,
      0,
      0,
      1,
      x + w,
      y0,
      l,
      x + w,
      y,
      "Z"
    ]
    return parts.join(" ")
  }

  return (
    <g ref={ref}>
      <BrandSprintResult scales={scales} data={data} margins={margins} />
    </g>
  )
}

export default Bar
