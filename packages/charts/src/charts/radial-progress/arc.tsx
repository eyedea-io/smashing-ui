import * as React from "react"
import * as d3 from "d3"
import {DefaultArcObject, ValueFn} from "d3"

interface IProps {
  x: number
  y: number
  radius: number
  data: number
  description?: string
  color?: string
}

const Arc: React.SFC<IProps> = props => {
  const {x, y, data, radius, description, color} = props
  const ref = React.useRef(null)
  const reff = React.useRef(null)
  var tau = 2 * Math.PI

  const arc = d3
    .arc()
    .innerRadius(radius / 1.2)
    .outerRadius(radius)
    .startAngle(0)
    .cornerRadius(20)

  React.useEffect(() => {
    const arcTween: any = newAngle => (d: DefaultArcObject) => {
      const i = d3.interpolate(d.endAngle, newAngle)
      return (t: number) => {
        d.endAngle = i(t)
        return arc(d)
      }
    }

    d3.select(ref.current)
      .datum({endAngle: tau})
      .style("fill", "#ECECEF")
      .attr("d", arc as any)

    d3.select(reff.current)
      .append("path")
      .datum({endAngle: 0})
      .style("fill", color as any)
      .attr("d", arc as any)
      .transition()
      .ease(d3.easeBack)
      .duration(1000)
      .attrTween("d", arcTween(0.01 * data * tau))

    var svg = d3.select("g")

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .text(data + "%")
      .attr("font-family", "sans-serif")
      .attr("font-size", radius / 2.6)
      .attr("fill", "#585882")
      .attr("font-weight", "bold")
      .attr("dy", -(radius / 6))

    if (description) {
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .text(description)
        .attr("font-family", "sans-serif")
        .attr("font-size", radius / 3.2)
        .attr("fill", "#585882")
        .attr("dy", radius / 4)
    } else {
      svg
        .select("text")
        .attr("dy", radius / 7)
        .attr("font-size", radius / 2)
    }
  })

  return (
    <g ref={reff} transform={`translate(${x},${y})`}>
      <path ref={ref} />
    </g>
  )
}

Arc.defaultProps = {
  description: "",
  color: "#78D0AF"
}

export default Arc
