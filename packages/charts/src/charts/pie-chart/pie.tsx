import * as React from 'react'

import * as d3 from 'd3'

import Slice from './slice'
import {ThemeContext} from 'styled-components'
import {useDefaults} from '@smashing/theme'
import {PieChartData} from '../../types'

interface IProps {
  x: number
  y: number
  radius: number
  data: PieChartData[]
  colors?: [string, string]
  isDonut?: boolean
  hasLabels?: boolean
  gutter?: number
}

const Pie: React.SFC<IProps> = ({
  x,
  y,
  radius,
  data,
  isDonut,
  hasLabels,
  gutter,
  ...props
}) => {
  const theme = React.useContext(ThemeContext)
  const defaults = useDefaults('pieChart', props, {
    colors: theme.colors.chart.pie
  })
  const colorScale: any = d3
    .scaleLinear<string, number>()
    .domain([0, data.length])
    .range(defaults.colors)

  const renderSlice = (value: any, i: number) => {
    return (
      <Slice
        key={i}
        outerRadius={radius}
        value={value}
        data={data}
        fill={colorScale(i)}
        isDonut={isDonut}
        hasLabels={hasLabels}
        gutter={gutter}
      />
    )
  }
  const pie = d3.pie()
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(
        data.map(function(d) {
          return d.value
        })
      ).map(renderSlice)}
    </g>
  )
}

export default Pie
