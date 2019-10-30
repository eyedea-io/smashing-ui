import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Select} from '@smashing/select'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import styled from 'styled-components'

const SelectWithState = ({children}) => {
  const [value, setValue] = React.useState()
  return children({value, setValue})
}
const SpecimenContainer = styled.div`
  margin-bottom: 16px;
`
addDecorator(withA11y)

const optionsWithLabels = [
  {value: 'abc', label: 'ABC Option'},
  {value: 'bca', label: 'BCA Option'},
  {value: 'cde', label: 'Longer Option'},
  {value: 'def', label: 'DEF Option'}
]
const intentKinds = ['none', 'danger', 'info', 'success', 'warning']

storiesOf('Core|Select', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('Simple usage', () => (
    <React.Fragment>
      <Select options={optionsWithLabels} />
    </React.Fragment>
  ))
  .add('With value', () => {
    const INITIAL_STATE = optionsWithLabels[1].value

    const ComponentWithState = () => {
      const [selected, setSelected] = React.useState(INITIAL_STATE)
      return (
        <Select
          options={optionsWithLabels}
          value={selected}
          onChange={event => setSelected(event.target.value)}
        />
      )
    }

    return <ComponentWithState />
  })
  .add('Height', () => (
    <React.Fragment>
      <SpecimenContainer>
        <Select options={optionsWithLabels} />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} height={34} />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} height={48} />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} height={64} />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} height={96} />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} height={128} />
      </SpecimenContainer>
    </React.Fragment>
  ))
  .add('appearance:primary', () => (
    <React.Fragment>
      {intentKinds.map(intent => (
        <SpecimenContainer key={intent}>
          <Select
            options={optionsWithLabels}
            appearance="primary"
            intent={intent}
          />
        </SpecimenContainer>
      ))}
    </React.Fragment>
  ))
  .add('appearance:flat', () => (
    <React.Fragment>
      {intentKinds.map(intent => (
        <SpecimenContainer key={intent}>
          <Select
            options={optionsWithLabels}
            appearance="flat"
            intent={intent}
          />
        </SpecimenContainer>
      ))}
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      {intentKinds.map(intent => (
        <SpecimenContainer key={intent}>
          <Select
            options={optionsWithLabels}
            appearance="minimal"
            intent={intent}
          />
        </SpecimenContainer>
      ))}
    </React.Fragment>
  ))
  .add('appearance:subtle', () => (
    <React.Fragment>
      {intentKinds.map(intent => (
        <SpecimenContainer key={intent}>
          <Select
            options={optionsWithLabels}
            appearance="subtle"
            intent={intent}
          />
        </SpecimenContainer>
      ))}
    </React.Fragment>
  ))
  .add('Full', () => (
    <React.Fragment>
      <Select full options={optionsWithLabels} />
    </React.Fragment>
  ))
  .add('Disabled', () => (
    <React.Fragment>
      <Select disabled options={optionsWithLabels} />
    </React.Fragment>
  ))
