import * as React from 'react'
// import {useDefaults} from '@smashing/theme'
// import {SelectProps} from './types'
import {Popover, PopoverProps} from '@smashing/popover'
// import {S} from './styles'
import styled from 'styled-components/macro'
import {Button} from '@smashing/button'
// import {ButtonAppearanceType, ButtonIntentType} from '@smashing/button'

const useClickOutside = (callback: (event: MouseEvent) => void) => {
  React.useEffect(() => {
    document.addEventListener('click', callback)

    return () => {
      document.removeEventListener('click', callback)
    }
  }, [])
}

export type SelectMenuChildrenFn<T> = <T>(props: {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
  selectedItems: T[]
}) => React.ReactNode

interface SelectMenuProps<T> {
  dataSource: T[] | (() => Promise<T[]>)
  children: React.ReactNode | SelectMenuChildrenFn<T>
}

class SelectMenuC<T> extends React.Component<SelectMenuProps<T>, {}> {
  getDefaultButton = () => {
    return <Button>Default button</Button>
  }
  determineChildren = () => {
    if (typeof this.props.children === 'function') {
      return popoverChildrenProps =>
        (this.props.children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: this.props.dataSource as T[]
        })
    }
    return this.getDefaultButton()
  }
  render() {
    return (
      <Popover
        content={({close}) => {
          return (
            <div>
              hello<button onClick={close}>asdf</button>
            </div>
          )
        }}
        children={this.determineChildren()}
      />
    )
  }
}

// const SelectMenuFC: React.FC<SelectMenuProps<{}>> = ({children, ...props}) => {
//   const renderChildren = () => {
//     return children || <Button>noweee</Button>
//   }

//   return (
//     <Popover
//       content={({close}) => {
//         return (
//           <div>
//             hello<button onClick={close}>asdf</button>
//           </div>
//         )
//       }}
//       children={renderChildren()}
//     />
//   )
// }

const SelectMenu = styled(SelectMenuC)``

export {SelectMenu}

//declare module 'styled-components' {
// export interface SmashingSelectDefaults
//   extends Partial<{
//     select?: {
//       height?: number
//       appearance?: ButtonAppearanceType
//       intent?: ButtonIntentType
//     }
//   }> {}
//}
