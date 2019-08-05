import * as React from 'react'
import {useDefaults} from '@smashing/theme'

import {ListContainer, ListItem} from './styles'

export interface ListProps {
  /**
   * Children are expected to be a list of Elements
   */
  children: React.ReactNode[]
  overlapSize: number
}

export const List: React.FC<ListProps> = ({children, ...props}) => {
  const {overlapSize} = useDefaults('list', props, {
    overlapSize: 50
  })

  return (
    <ListContainer>
      {children.map(child => (
        <ListItem overlapSize={overlapSize}>{child}</ListItem>
      ))}
    </ListContainer>
  )
}

declare module 'styled-components' {
  export interface SmashingListDefaults
    extends Partial<{
      overlapSize?: number
    }> {}
}
