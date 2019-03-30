import * as React from "react"
import {Head} from "@smashing/head"

export const TitleContext = React.createContext<{
  title: string
  separator?: string | null
}>({
  title: "",
  separator: ""
})

export const Title = ({children}: {children?: React.ReactChild}) => {
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
