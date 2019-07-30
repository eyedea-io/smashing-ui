import * as React from 'react'
import * as d3 from 'd3'

interface IProps {
  title: string
  h: number
  w: number
  color: string
}

const Title: React.SFC<IProps> = ({title, h, w, color}) => {
  const ref = React.useRef(null)
  const translate = `translate(${w},${h})`

  React.useEffect(() => {
    d3.select(ref.current)
      .append('text')
      .text(`${title}`)
      .style('fill', color)
      .style('font-weight', '700')
      .style('font-size', '14')
      .style('font-family', 'sans-serif')
  })
  return <g ref={ref} transform={translate} />
}

export default Title
