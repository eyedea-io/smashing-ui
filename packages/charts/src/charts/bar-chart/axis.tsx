import * as React from "react"
import * as d3 from "d3"
import {AxisDomain} from "d3"

interface IProps {
  orient: string
  scale: any
  translate: string
  tickSize: number
}

const Axis: React.SFC<IProps> = ({orient, scale, translate, tickSize}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    let axis: any

    const renderAxis = () => {
      if (orient === "Bottom") {
        axis = d3
          .axisBottom(scale)
          .tickPadding(8)
          .tickSize(0)
          .tickFormat((d: any) => Math.abs(d) as any)
      } else {
        axis = d3
          .axisLeft(scale)
          .tickSize(-tickSize)
          .tickPadding(12)
          .ticks(3)
          .tickFormat(d3.format("~%") as any)
      }
    }
    renderAxis()

    if (orient === "Bottom") {
      d3.select(ref.current)
        .append("g")
        .call(axis)
        .style("color", "#5B5B82")
        .style("font-weight", "700")
    } else {
      d3.select(ref.current)
        .append("g")
        .call(axis)
        .call(g => g.select(".domain").remove())
        .style("color", "#C5C5DB")
        .style("stroke-dasharray", "2 3")
    }
  })

  return <g ref={ref} transform={translate} />
}

export default Axis
