import * as React from 'react'
import {ScrollbarSizeProps} from './types/tableHead'
export const ScrollbarSize: React.FC<ScrollbarSizeProps> = ({
  handleScrollbarSize = e => {},
  ...props
}) => {
  const [innerWidth, setInnerWidth] = React.useState(0)
  const [outerWidth, setOuterWidth] = React.useState(0)
  let outerRef = React.useRef(null)
  let innerRef = React.useRef(null)

  const handleOuterRef = ref => {
    outerRef = ref
  }

  const handleInnerRef = ref => {
    innerRef = ref
  }
  React.useEffect(() => {
    const inner = innerRef
    // const outer = (outerRef as any).current.getBoundingClientRect().width
    console.log(inner)
    // setInnerWidth(inner)
    // setOuterWidth(outer)
    // if (innerWidth > 0 && outerWidth > 0) {
    //   handleScrollbarSize(outerWidth - innerWidth)
    // }
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
