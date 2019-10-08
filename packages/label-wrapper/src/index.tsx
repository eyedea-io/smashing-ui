import * as React from 'react'
// import * as some from '@smashing/theme'
import {Wrapper, Label, Error} from './styles'

export interface LabelWrapperProps {
  /**
   * Children are expected to be any smashing component
   */
  children: React.ReactNode[]
  labelTitle: string
  errorTitle: string
}

export const LabelWrapper: React.FC<LabelWrapperProps> = ({
  children,
  labelTitle,
  errorTitle
}) => {
  return (
    <Wrapper errorTitle={errorTitle}>
      <Label>{labelTitle}</Label>
      {children}
      {errorTitle && <Error>{errorTitle}</Error>}
    </Wrapper>
  )
}
