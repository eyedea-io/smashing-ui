import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Button} from '@smashing/button'
import {Overlay} from '@smashing/overlay'

addDecorator(withA11y)

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
  .add('Select menu', () => {
    const options = [
      {label: 'Abc', value: 'abc'},
      {label: 'Bca', value: 'bca'},
      {label: 'Xyz', value: 'xyz'},
      {label: 'Disabled', value: 'dis', disabled: true}
    ]
    return React.createElement(() => {
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
        <div style={{height: 700}}>
          <hr />
          <h2>single select</h2>
          SELECTED: {JSON.stringify(singleSelectedOption)}
          <br />
          <SelectMenu
            width={100}
            height={100}
            options={options}
            value={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
            appearance="card"
            hasFilter="true"
          />
          <hr />
          <h2>MultiSelect</h2>
          SELECTED: {JSON.stringify(selectedOptions)}
          <br />
          <SelectMenu
            isMultiSelect
            options={options}
            value={selectedOptions}
            multiOptionSelectedItemsLabel={num => `jest ${num} itemów`}
            placeholder="Wez cos wpisz"
            onSelect={select}
            onDeselect={deselect}
            appearance="minimal"
          />
          <hr />
          <h2>MultiSelect</h2>
          SELECTED: {JSON.stringify(selectedOptions)}
          <br />
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
              <button ref={props.getRef} onClick={props.toggle}>
                PRZYCISK
              </button>
            )}
          />
        </div>
      )
    })
  })
