import * as React from "react"
import * as d3 from "d3"
import {Margins} from "./index"
import {ProgressBarDataItem} from '../../types'

interface IProps {
  width: number
  height: number
  data?: ProgressBarDataItem[]
  margins: Margins
}

const Axis: React.SFC<IProps> = ({width, height, data, margins}) => {
  const ref = React.useRef(null)
  const ticks = [25, 50, 75, 100]
  const scale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margins.left, width - 2 * margins.right])
  React.useEffect(() => {
    let axis = d3
      .axisTop(scale)
      .tickSize(-height)
      .tickValues(ticks)
      .tickPadding(10)
      .tickFormat((d, i) => `${ticks[i]} %`)

    d3.select(ref.current)
      .append("g")
      .call(axis)
      .style("font-size", "11px")
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll("text").style("fill", "#C5C5DB"))
      .style("color", "#ECECEF")
      .style("stroke-dasharray", "2 3")
      .attr("transform", `translate(${margins.left},${margins.top})`)

    d3.select(ref.current)
      .append("text")
      .attr("transform", `translate(${2 * margins.left},${margins.top - 9})`)
      .text("VOTES")
      .style("font-size", "11px")
      .style("fill", "#C5C5DB")
      .attr("font-family", "sans-serif")
  })

  return <g ref={ref} />
}

export default Axis
