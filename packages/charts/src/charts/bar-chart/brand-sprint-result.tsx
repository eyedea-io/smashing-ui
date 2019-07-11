import * as React from "react"
import * as d3 from "d3"

import {Margins, Scales, DataItem} from "./bar-chart"

interface IProps {
  scales: Scales
  data: DataItem[]
  margins: Margins
}

const BrandSprintResult: React.SFC<IProps> = ({scales, data, margins}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    data.map((d: any) => {
      if (d.isResult) {
        d3.select(ref.current)
          .append("text")
          .text("Brand Sprint Result")
          .attr("x", (scales.xScale(d.label) as number) + 12)
          .attr("dy", margins.top)
          .attr("text-anchor", "middle")
          .style("fill", "#1171CB")
          .style("font-weight", "700")
          .style("font-size", "12")
          .style("font-family", "sans-serif")

        d3.select(ref.current)
          .append("line")
          .attr("x1", (scales.xScale(d.label) as number) + 12)
          .attr("y1", margins.top + 8)
          .attr("x2", (scales.xScale(d.label) as number) + 12)
          .attr("y2", scales.yScale(d.value) - 34)
          .attr("stroke", "#1171CB")
          .attr("stroke-dasharray", "3,3")
      }
    })
  })
  return <g ref={ref} />
}

export default BrandSprintResult
