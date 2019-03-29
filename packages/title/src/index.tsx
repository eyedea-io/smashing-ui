import * as React from "react"
import {Head} from "@smashing/head"

export const TitleContext = React.createContext("")

export const Title = ({children}: {children?: React.ReactChild}) => {
  const title = React.useContext(TitleContext)

  return (
    <Head>
      <title>{[children, title].filter(Boolean).join(" - ")}</title>
    </Head>
  )
}
