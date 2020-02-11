import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {ListContainer, ListItem} from './styles'

export interface ListProps {
  /**
   * Children are expected to be a list of Elements
   */
  children: React.ReactNode[]
  overlapSize?: number
  className?: string
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
}

export const List: React.FC<ListProps> = ({
  children,
  className,
  ref,
  ...props
}) => {
  const {overlapSize} = useDefaults('list', props, {
    overlapSize: 50
  })

  return (
    <ListContainer className={className} ref={ref}>
      {children.map((child, key) => (
        <ListItem key={key} overlapSize={overlapSize}>
          {child}
        </ListItem>
      ))}
    </ListContainer>
  )
}

declare module 'styled-components' {
  export interface SmashingListDefaults
    extends Partial<{
      list?: {
        overlapSize?: number
      }
    }> {}
}
