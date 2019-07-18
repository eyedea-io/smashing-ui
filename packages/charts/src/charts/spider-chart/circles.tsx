import * as React from "react"
import * as d3 from "d3"
import{SpiderDataItems} from '../../types'

interface IProps {
  width: number
  radialScale: Function
  data: SpiderDataItems
}

const Circles: React.SFC<IProps> = ({ width, data, radialScale }) => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    data.labels.map((t, i: number) =>
      d3
        .select(ref.current)
        .append("circle")
        .attr("cx", `${width / 2}`)
        .attr("cy", `${width / 2}`)
        .attr("fill", "none")
        .attr("stroke", "#ECECEF")
        .attr("stroke-width", "2")
        .attr("stroke-dasharray", "3")
        .attr("stroke-linecap", "round")
        .attr("r", radialScale(i + 1))
    )
  }, [])
  return <g ref={ref} />
}

export default Circles
