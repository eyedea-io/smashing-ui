import * as React from "react"
import {Head} from "@smashing/head"

export const TitleContext = React.createContext<{
  title: string
  separator?: string | null
}>({
  title: "",
  separator: ""
})

/**
 * Set page title using react component.
 *
 * @example
 * <Title>Page Title</Title>
 */
export const Title: React.FC = ({children}) => {
  const {title, separator = " - "} = React.useContext(TitleContext)

  return (
    <Head>
      <title>
        {[children, title]
          .filter(Boolean)
          .join(separator === null ? "" : separator)}
      </title>
    </Head>
  )
}
