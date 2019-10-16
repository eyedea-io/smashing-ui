import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Select} from '@smashing/select'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import styled from 'styled-components'

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
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="primary"
          intent="none"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="primary"
          intent="danger"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="primary"
          intent="info"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="primary"
          intent="success"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="primary"
          intent="warning"
        />
      </SpecimenContainer>
    </React.Fragment>
  ))
  .add('appearance:flat', () => (
    <React.Fragment>
      <SpecimenContainer>
        <Select options={optionsWithLabels} appearance="flat" intent="none" />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} appearance="flat" intent="danger" />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} appearance="flat" intent="info" />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="flat"
          intent="success"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="flat"
          intent="warning"
        />
      </SpecimenContainer>
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="minimal"
          intent="none"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="minimal"
          intent="danger"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="minimal"
          intent="info"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="minimal"
          intent="success"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="minimal"
          intent="warning"
        />
      </SpecimenContainer>
    </React.Fragment>
  ))
  .add('appearance:subtle', () => (
    <React.Fragment>
      <SpecimenContainer>
        <Select options={optionsWithLabels} appearance="subtle" intent="none" />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="subtle"
          intent="danger"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select options={optionsWithLabels} appearance="subtle" intent="info" />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="subtle"
          intent="success"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="subtle"
          intent="warning"
        />
      </SpecimenContainer>
    </React.Fragment>
  ))
  .add('appearance:outline', () => (
    <React.Fragment>
      <SpecimenContainer>
        <Select
          onChange={console.log}
          placeholder="Placeholder"
          options={optionsWithLabels}
          appearance="outline"
          intent="none"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          onChange={console.log}
          options={optionsWithLabels}
          appearance="outline"
          intent="danger"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="outline"
          intent="info"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="outline"
          intent="success"
        />
      </SpecimenContainer>
      <SpecimenContainer>
        <Select
          options={optionsWithLabels}
          appearance="outline"
          intent="warning"
        />
      </SpecimenContainer>
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
