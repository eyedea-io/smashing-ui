import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {getCheckboxStyle, getLabelStyle} from './styles'
import {useDefaults} from '@smashing/theme'
import {CheckboxAppearanceType, CheckboxProps, StyledLabelProps} from './types'

const Label = styled(Text)<StyledLabelProps>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${_ => (_.disabled ? 'not-allowed' : 'pointer')};
  ${_ => getLabelStyle(_.appearance, _.disabled, _.checked)};
`

const CustomCheckbox = styled.div.attrs({})<StyledLabelProps>`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
  border-radius: 4px;
  transition: all 150ms;
  flex-shrink: 0;

  svg {
    display: flex;
    height: 8px;
    visibility: ${_ => (_.checked ? 'visible' : 'hidden')};
  }
`

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox'
})<{appearance: CheckboxAppearanceType}>`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: relative;
  white-space: nowrap;
  opacity: 0;
  width: 1px;
  ${_ => getCheckboxStyle(_.appearance, _.disabled, _.checked)};
`

const CheckIcon = ({fill = 'currentColor'}) => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path
      d="M1 3L3 5L7 1"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckboxFC: React.FC<CheckboxProps> = ({
  children,
  innerRef,
  ...props
}) => {
  const defaults = useDefaults('checkbox', props, {
    appearance: 'primary' as CheckboxAppearanceType
  })

  const isCommonCheckbox =
    defaults.appearance === 'primary' || defaults.appearance === 'minimal'

  return (
    <Label as="label" ref={innerRef} {...defaults} {...props}>
      <HiddenCheckbox
        checked={props.checked}
        onChange={props.onChange}
        appearance={defaults.appearance}
        {...props}
      />
      {isCommonCheckbox && (
        <CustomCheckbox
          appearance={defaults.appearance}
          checked={props.checked}
          {...props}
        >
          <CheckIcon />
        </CustomCheckbox>
      )}
      {typeof children === 'string' ? (
        <Text variant={300} color={props.disabled ? 'muted' : 'default'}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Label>
  )
}

const Checkbox = styled(CheckboxFC)``

export {Checkbox, CheckboxProps, CheckboxAppearanceType}

declare module 'styled-components' {
  export interface SmashingCheckboxDefaults
    extends Partial<{
      checkbox?: {
        appearance?: CheckboxAppearanceType
      }
    }> {}
}
