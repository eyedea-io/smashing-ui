import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {Text} from '@smashing/typography'
import {TextAreaProps} from './types'
import styled from 'styled-components/macro'

const StyledTextArea = styled(Text)<TextAreaProps>`
  border-radius: 3px;
  padding: 5px;
  width: ${_ => _.width};
`

const Textarea: React.FC<TextAreaProps> = ({children, ...props}) => {
  const {color, appearance, ...defaults} = useDefaults<TextAreaProps>(
    'textarea',
    props,
    {
      disabled: false,
      isInvalid: false,
      required: false
    }
  )

  return (
    <StyledTextArea
      as="textarea"
      className={defaults.className}
      variant={400}
      width={defaults.width}
      height={defaults.height}
      required={defaults.required}
      disabled={defaults.disabled}
      placeholder={defaults.placeholder}
      aria-invalid={defaults.isInvalid}
      styles={defaults.styles}
      {...(defaults.disabled ? {color: 'muted'} : {})}
      {...props}
    >
      {children}
    </StyledTextArea>
  )
}

export {Textarea, TextAreaProps}

declare module 'styled-components' {
  export interface SmashingTextareaDefaults
    extends Partial<{
      textarea?: TextAreaProps
    }> {}
}
