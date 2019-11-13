import * as React from 'react'
import {TextInputAffixProps} from '../types'
import {useTheme, getTextSizeForControlHeight} from '@smashing/theme'
import * as S from '../styled'

export const TextInputAffix: React.FC<TextInputAffixProps> = ({
  isBefore,
  component: Component,
  disabled,
  height,
  inputRef,
  invalid,
  onClickBefore,
  onClickAfter
}) => {
  const {text} = useTheme().colors
  const color = invalid ? text.danger : disabled ? text.muted : text.default

  const cssProps = {
    disabled,
    height: typeof height === 'string' ? parseInt(height) : height,
    invalid,
    isBefore,
    get variant() {
      return getTextSizeForControlHeight(this.height)
    }
  }

  const componentIsString = typeof Component === 'string'
  const componentIsClickable = onClickBefore || onClickAfter ? true : false

  return (
    <S.TextInputAffix
      {...cssProps}
      onClick={e =>
        isBefore
          ? onClickBefore && onClickBefore(inputRef, e)
          : onClickAfter && onClickAfter(inputRef, e)
      }
      isString={componentIsString}
      isClickable={componentIsClickable}
    >
      {componentIsString ? Component : <Component color={color} />}
    </S.TextInputAffix>
  )
}
