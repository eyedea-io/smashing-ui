import * as React from "react"
import Bar from "./bar"
import Axis from "./axis"

interface IProps {
  width: number
  data: DataItem[]
}

export interface DataItem {
  option: string
  votes: number
  isResult?: boolean
}

export interface Margins {
  top: number
  left: number
  right: number
}

const Chart: React.SFC<IProps> = ({width, data}) => {
  const ref = React.useRef(null)
  const maxHeight = data.reduce(sum => sum + 34, 0) + 30
  const margins = {
    top: 50,
    left: width / 10,
    right: width / 10
  }

  let totalSum = 0
  let topValues: DataItem[] = []
  let restValues: DataItem[] = []
  data.map(d => (totalSum += d.votes))
  data.sort((a, b) => {
    return b.votes - a.votes
  })

  data.reduce((prev, curr, i) => {
    if (i <= 2) {
      topValues.push(curr)
    } else {
      if (prev.votes === curr.votes) {
        topValues.push(curr)
      } else {
        restValues.push(curr)
      }
    }
    return curr
  }, data[0])

  return (
    <svg width={width} height={maxHeight + margins.top + 10}>
      <Axis data={data} width={width} height={maxHeight} margins={margins} />
      <Bar
        width={width}
        margins={margins}
        topValues={topValues}
        restValues={restValues}
        totalSum={totalSum}
      />
    </svg>
  )
}

export default Chart
