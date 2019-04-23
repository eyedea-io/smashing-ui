import * as React from "react"
import * as ReactDOM from "react-dom"

/**
 * Check if current env has access to DOM
 */
const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

let portalContainer: HTMLDivElement

export const Portal: React.FC = ({children}) => {
  const element = React.useRef(document.createElement("div"))

  React.useEffect(() => {
    if (!canUseDOM) return
    const {current} = element
    if (!portalContainer) {
      portalContainer = document.createElement("div")
      portalContainer.setAttribute("smashing-portal-container", "")
      document.body.append(portalContainer)
    }
    portalContainer.append(current)

    return () => {
      portalContainer.removeChild(current)
    }
  }, [element])

  if (!canUseDOM) return null

  return ReactDOM.createPortal(children, element.current)
}
