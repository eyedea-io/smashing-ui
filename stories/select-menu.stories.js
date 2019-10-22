import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Button} from '@smashing/button'

addDecorator(withA11y)

const options = [
  {label: 'Apple', value: 'Apple'},
  {label: 'Apricot', value: 'Apricot'},
  {label: 'Banana', value: 'Banana'},
  {label: 'Cherry', value: 'Cherry', disabled: true}
]

const optionsScroll = [
  {label: 'Apple', value: 'Apple'},
  {label: 'Apricot', value: 'Apricot'},
  {label: 'Banana', value: 'Banana'},
  {label: 'Cherry', value: 'Cherry'},
  {label: 'Cucumber', value: 'Cucumber'},
  {label: 'Tomato', value: 'Tomato'},
  {label: 'Orange', value: 'Orange'},
  {label: 'Pepper', value: 'Pepper'},
  {label: 'Potato', value: 'Potato'}
]

const Wrapper = ({children}) => {
  const [singleSelectedOption, changeSingleSelectedOption] = React.useState(
    null
  )

  const [selectedOptions, changeSelectedOptions] = React.useState([
    options[1].value
  ])

  const select = value => {
    changeSelectedOptions([...selectedOptions, value])
  }

  const deselect = option => {
    changeSelectedOptions(selectedOptions.filter(o => o !== option))
  }
  return (
    <div>
      {children({
        singleSelectedOption,
        changeSingleSelectedOption,
        select,
        deselect,
        selectedOptions,
        changeSelectedOptions
      })}
    </div>
  )
}

storiesOf('Core|Select menu', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          button: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('Default single select', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          height={100}
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          hasFilter={true}
          hasTitle={true}
          title="Select Item"
        />
      )}
    </Wrapper>
  ))
  .add('With popover props', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          height={100}
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          hasFilter={true}
          hasTitle={true}
          title="Select Item"
          popoverProps={{
            overlay: true
          }}
        />
      )}
    </Wrapper>
  ))
  .add('Appearance: card', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          minWidth={100}
          height={200}
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="card"
          hasFilter={true}
        />
      )}
    </Wrapper>
  ))
  .add('Appearance: minimal, multi select', () => (
    <Wrapper>
      {({select, deselect, selectedOptions}) => (
        <SelectMenu
          isMultiSelect
          options={options}
          value={selectedOptions}
          multiOptionSelectedItemsLabel={num => `Items: ${num}`}
          onSelect={select}
          onDeselect={deselect}
          appearance="minimal"
        />
      )}
    </Wrapper>
  ))
  .add('Custom list item body', () => (
    <Wrapper>
      {({select, deselect, selectedOptions}) => (
        <SelectMenu
          isMultiSelect
          options={options}
          value={selectedOptions}
          onSelect={select}
          onDeselect={deselect}
          appearance="primary"
          renderItem={(option, click, options, selected) => {
            return (
              <div key={option.value}>
                <Button onClick={click}>{option.label} </Button>
              </div>
            )
          }}
          children={props => (
            <Button ref={props.getRef} onClick={props.toggle}>
              Select
            </Button>
          )}
        />
      )}
    </Wrapper>
  ))
