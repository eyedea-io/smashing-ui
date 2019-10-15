import styled, {css} from 'styled-components'
import {Label as PureLabel, Paragraph, getTextStyle} from '@smashing/typography'
import {Alert as PureAlert, StyledAlert} from '@smashing/alert'
import {FormFieldLabelAppearance, FormFieldAlertAppearance} from './types'

export const Description = styled(Paragraph)`
  margin: 0 0 ${_ => _.theme.spacing.xxxs};
`

export const Hint = styled(Paragraph)`
  margin: ${_ => _.theme.spacing.xxxs} 0 0;
`

interface LabelProps {
  hasDescription: boolean
  appearance?: FormFieldLabelAppearance
}

export const Label = styled(PureLabel)<LabelProps>`
  ${_ =>
    _.appearance === 'block' &&
    css`
      margin-bottom: ${_.hasDescription ? 0 : _.theme.spacing.xxxs};
    `}

  ${_ =>
    _.appearance === 'overlay' &&
    css`
      position: absolute;
      transform: translateY(-50%);
      left: ${_ => _.theme.spacing.xxs};
      background-color: ${_ => _.theme.colors.background.default};
      background: ${_ => _.theme.colors.background.default};
      padding: 0 5px;
      z-index: 1;
    `}
`

interface AlertProps {
  alertAppearance: FormFieldAlertAppearance
}

export const Alert = styled(PureAlert)<AlertProps>`
  margin-top: ${_ => _.theme.spacing.xxs};

  ${_ =>
    _.alertAppearance === 'overlay' &&
    css`
      position: relative;
      margin-bottom: -18px;
      top: -18px;
      margin-left: ${_ => _.theme.spacing.xxs};
      background: ${_ => _.theme.colors.background.default};
      padding: 0 4px;
      z-index: 1;
      justify-self: flex-start;
    `}

  ${StyledAlert.Description} {
    ${getTextStyle({variant: 300, intent: 'danger'})};
  }
`

interface FormFieldProps {
  labelColumnWidth: string
  labelAppearance: FormFieldLabelAppearance
}

export const ErrorWrapper = styled.div``
export const DefaultInput = styled.input``

export const FormField = styled.div<FormFieldProps>`
  position: relative;
  display: grid;

  ${_ =>
    _.labelAppearance === 'inline' &&
    css`
      grid-template-columns:
        var(
          --label-column-width,
          ${`${_.labelColumnWidth}${
            typeof _.labelColumnWidth === 'number' ? 'px' : ''
          }`}
        )
        1fr;

      ${Label} {
        grid-row-start: 1;
        grid-row-end: 4;
      }
    `}
`
