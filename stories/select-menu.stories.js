import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

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
        options[1]
      ])

      const select = option => {
        changeSelectedOptions([...selectedOptions, option])
      }

      const deselect = option => {
        changeSelectedOptions(selectedOptions.filter(o => o !== option))
      }

      return (
        <div style={{height: 700}}>
          {/* <SelectMenu
            options={options}
            selected={selectedOptions}
            onSelect={select}
          />
          <hr />
          <SelectMenu
            options={options}
            selected={selectedOptions}
            onSelect={select}
            children={props => (
              <span ref={props.getRef} onClick={props.toggle}>
                HELO ({props.selectedItems.length})
              </span>
            )}
          /> */}
          <hr />
          <h2>single select</h2>
          SELECTED: {JSON.stringify(singleSelectedOption)}
          <br />
          <SelectMenu
            options={options}
            selected={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
          />
          <hr />
          <h2>MultiSelect</h2>
          SELECTED: {JSON.stringify(selectedOptions)}
          <br />
          <SelectMenu
            isMultiSelect
            options={options}
            selected={selectedOptions}
            multiOptionSelectedItemsLabel={num => `jest ${num} itemów`}
            placeholder="Wez cos wpisz"
            onSelect={select}
            onDeselect={deselect}
          />
          <hr />
          <h2>MultiSelect</h2>
          SELECTED: {JSON.stringify(selectedOptions)}
          <br />
          <SelectMenu
            isMultiSelect
            options={options}
            selected={selectedOptions}
            onSelect={select}
            onDeselect={deselect}
            renderItem={(option, click, options, selected) => {
              return (
                <div key={option.value}>
                  kuarcze {option.label} <button onClick={click}>a</button>
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
