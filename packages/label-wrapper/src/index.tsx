import * as React from 'react'
// import * as some from '@smashing/theme'
import {Wrapper, Label} from './styles'

export interface LabelWrapperProps {
  /**
   * Children are expected to be any smashing component
   */
  children: React.ReactNode[]
  labelTitle: string
}

export const LabelWrapper: React.FC<LabelWrapperProps> = ({
  children,
  labelTitle
}) => {
  return (
    <Wrapper>
      <Label>{labelTitle}</Label>
      {children}
    </Wrapper>
  )
}
