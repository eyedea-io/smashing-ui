import * as React from "react"
import * as d3 from "d3"

import { DataItem } from "./index"
import { Colors } from "./config"

interface IProps {
  width: number
  margins: any
  topValues: DataItem[]
  restValues: DataItem[]
  totalSum: number
}

const Bar: React.SFC<IProps> = ({
  width,
  margins,
  topValues,
  restValues,
  totalSum
}) => {
  const ref = React.useRef(null)
  const margin = width - 3 * margins.left

  const renderBars = (
    data: DataItem[],
    offsetTop: number,
    id: string,
    label: string
  ) => {
    let color: string
    let icon = ""
    d3.select(ref.current)
      .append("g")
      .attr("id", id)
    data.map((d, i) => {
      color = label === "TOP VALUES" ? Colors.topValues : Colors.restValues
      if (d.isResult) {
        if (label === "TOP VALUES") {
          color = Colors.topIsResult
          icon = String.fromCharCode(0x2714)
        } else if (label === "REST VALUES") {
          color = Colors.restIsResult
          icon = String.fromCharCode(215)
        }
      }
      d3.select("#" + id)
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", Colors.greyBackground)
        .attr("y", offsetTop + 60 + 34 * i)
        .attr("x", 2 * margins.left)
        .attr("height", 4)
        .attr("width", margin) //background

      d3.select("#" + id)
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", color)
        .attr("height", 4)
        .attr("y", offsetTop + 60 + 34 * i)
        .attr("x", 2 * margins.left)
        .attr("width", 0)
        .transition()
        .ease(d3.easeCircle)
        .duration(750)
        .delay(item => 100 * i)
        .attr("width", (d.votes * margin) / totalSum) //progress

      if ((d.votes * margin) / totalSum > d.option.length * 6) {
        d3.select("#" + id)
          .append("text")
          .style("font-size", "11px")
          .style("fill", color)
          .attr("font-family", "sans-serif")
          .attr("x", 2 * margins.left)
          .attr("y", offsetTop + 57 + 34 * i)
          .transition()
          .ease(d3.easeCircle)
          .duration(750)
          .delay(item => 100 * i)
          .attr("x", 2 * margins.left + (d.votes * margin) / totalSum)
          .text(`${d.votes}`)

        d3.select("#" + id)
          .datum(d)
          .append("text")
          .attr("x", 2 * margins.left)
          .attr("y", offsetTop + 57 + 34 * i)
          .style("font-size", "11px")
          .attr("font-family", "sans-serif")
          .style("fill", color)
          .text(d => {
            return d.isResult
              ? `${d.option} ${icon}`
              : d.option
          })
      } else {
        d3.select("#" + id)
          .datum(d)
          .append("text")
          .attr("x", 2 * margins.left)
          .attr("y", offsetTop + 57 + 34 * i)
          .style("font-size", "11px")
          .attr("font-family", "sans-serif")
          .style("fill", color)
          .text(d => {
            return d.isResult
              ? `${d.option} ${icon} ${d.votes}`
              : `${d.option} ${d.votes}`
          })
      }
    })

    const domainHeight = (d3
      .select("#" + id)
      .node() as HTMLElement).getBoundingClientRect().height

    const scale = d3.scaleBand().range([domainHeight, 0])
    let yAxis = d3
      .axisLeft(scale)
      .tickSize(0)
      .ticks(0)
    d3.select("#" + id)
      .append("g")
      .call(yAxis)
      .style("color", Colors.greyLabels)
      .attr(
        "transform",
        `translate(${1.65 * margins.left},${offsetTop + margins.top})`
      )
    const d = [label]
    
    d3.select("#" + id)
    .data(d)
    .append("text")
    .each(function(d) {
      let text = d.split(" ")
        d3.select(this)
          .append("tspan")
          .attr("dy", "-.5em")
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .text(text[0])
        d3.select(this)
          .append("tspan")
          .text(text[1])
          .attr("dy", "1.2em")
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
      })
      .attr(
        "transform",
        `translate(${margins.left + 10},${offsetTop +
        margins.top +
        domainHeight / 2})`
      )
      .style("fill", Colors.greyLabels)
      .style("font-size", "11px")
      .attr("font-family", "sans-serif")
  }

  React.useEffect(() => {
    renderBars(topValues, 20, "group", "TOP VALUES")
    const offsetTop = topValues.reduce(sum => sum + 34, 48)
    renderBars(restValues, offsetTop, "group1", "REST VALUES")
  })
  return (
    <g>
      <g ref={ref} />
    </g>
  )
}

export default Bar
