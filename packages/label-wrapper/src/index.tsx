import * as React from 'react'
// import * as some from '@smashing/theme'
import {Label} from '@smashing/typography'

export interface ListProps {
  /**
   * Children are expected to be any smashing component
   */
  children: React.ReactNode[]
}

export const LabelWrapper: React.FC<ListProps> = ({children, ...props}) => {
  return (
    <LabelWrapper>
      <Label></Label>
      {children}
    </LabelWrapper>
  )
}
