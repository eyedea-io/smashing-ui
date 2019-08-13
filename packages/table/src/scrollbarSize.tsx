import * as React from 'react'
import {ScrollbarSizeProps} from './types/tableHead'
export const ScrollbarSize: React.FC<ScrollbarSizeProps> = ({
  handleScrollbarSize = () => {},
  ...props
}) => {
  const [innerWidth, setInnerWidth] = React.useState(null)
  const [outerWidth, setOuterWidth] = React.useState(null)
  let outerRef = React.useRef(null)
  let innerRef = React.useRef(null)

  const handleOuterRef = ref => {
    outerRef = ref
  }

  const handleInnerRef = ref => {
    innerRef = ref
  }
  React.useEffect(() => {
    const innerWidth = (innerRef as any).current.getBoundingClientRect().width
    const outerWidth = (outerRef as any).current.getBoundingClientRect().width
    setInnerWidth(innerWidth)
    setOuterWidth(outerWidth)
  })
  return (
    <div
      ref={handleOuterRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: -500,
        left: -500,
        width: 100,
        overflowY: 'scroll'
      }}
    >
      <div ref={handleInnerRef} />
    </div>
  )
}
