import React, {useCallback, useEffect} from 'react'
import {storiesOf} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {SmashingThemeProvider} from '@smashing/theme'
import {Button} from '@smashing/button'
import {FormField} from '@smashing/form-field'
import styled from 'styled-components'
import {Label} from '@smashing/typography'
import {useForm} from '@smashing/form'
import {StyledAlert} from '@smashing/alert'

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
  {label: 'Cucumber', value: 'Cucumber', disabled: true},
  {label: 'Tomato', value: 'Tomato'},
  {label: 'Orange', value: 'Orange'},
  {label: 'Pepper', value: 'Pepper'},
  {label: 'Potato', value: 'Potato'}
]

const useFont = () => {
  useEffect(() => {
    const fontStyle = document.createElement('style')
    fontStyle.innerHTML =
      '@import url(\'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap\');'
    document.head.appendChild(fontStyle)
  }, [])
}

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
    <div data-wrapper style={{marginBottom: 16}}>
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
  .add('appearance: default', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
        />
      )}
    </Wrapper>
  ))
  .add('appearance: primary', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="primary"
        />
      )}
    </Wrapper>
  ))
  .add('appearance: subtle', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="subtle"
        />
      )}
    </Wrapper>
  ))
  .add('appearance: minimal', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="minimal"
        />
      )}
    </Wrapper>
  ))
  .add('appearance: outline', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="outline"
        />
      )}
    </Wrapper>
  ))
  .add('with title', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          hasTitle={true}
          title="Select Item"
        />
      )}
    </Wrapper>
  ))
  .add('with filter', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          hasFilter={true}
        />
      )}
    </Wrapper>
  ))
  .add('with popover props', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          popoverProps={{
            overlay: true,
            elevate: true,
            minWidth: 400
          }}
        />
      )}
    </Wrapper>
  ))
  // FIXME: remove if unused
  // .add('Appearance: card', () => (
  //   <Wrapper>
  //     {({singleSelectedOption, changeSingleSelectedOption}) => (
  //       <SelectMenu
  //         minWidth={100}
  //         height={200}
  //         options={optionsScroll}
  //         value={singleSelectedOption}
  //         onSelect={changeSingleSelectedOption}
  //         appearance="card"
  //         hasFilter={true}
  //       />
  //     )}
  //   </Wrapper>
  // ))
  .add('multi select', () => (
    <Wrapper>
      {({select, deselect, selectedOptions}) => (
        <SelectMenu
          isMultiSelect
          options={options}
          value={selectedOptions}
          onSelect={select}
          onDeselect={deselect}
          multiOptionSelectedItemsLabel={num => `Fruits: ${num}`}
        />
      )}
    </Wrapper>
  ))
  .add('button height', () => (
    <div>
      <Wrapper>
        {({select, deselect, selectedOptions}) => (
          <SelectMenu
            isMultiSelect
            options={options}
            height={24}
            value={selectedOptions}
            onSelect={select}
            onDeselect={deselect}
            multiOptionSelectedItemsLabel={num => `Fruits: ${num}`}
          />
        )}
      </Wrapper>
      <Wrapper>
        {({select, deselect, selectedOptions}) => (
          <SelectMenu
            isMultiSelect
            options={options}
            value={selectedOptions}
            onSelect={select}
            onDeselect={deselect}
            multiOptionSelectedItemsLabel={num => `Fruits: ${num}`}
          />
        )}
      </Wrapper>
      <Wrapper>
        {({select, deselect, selectedOptions}) => (
          <SelectMenu
            isMultiSelect
            options={options}
            height={40}
            value={selectedOptions}
            onSelect={select}
            onDeselect={deselect}
            multiOptionSelectedItemsLabel={num => `Fruits: ${num}`}
          />
        )}
      </Wrapper>
    </div>
  ))
  .add('popover height', () => (
    <div>
      <Wrapper>
        {({select, deselect, selectedOptions}) => (
          <SelectMenu
            isMultiSelect
            options={optionsScroll}
            value={selectedOptions}
            onSelect={select}
            onDeselect={deselect}
            popoverProps={{
              height: 250
            }}
            multiOptionSelectedItemsLabel={num => `Fruits: ${num}`}
          />
        )}
      </Wrapper>
    </div>
  ))
// .add('appearance: outline', () => (
//   <Wrapper>
//     {({singleSelectedOption, changeSingleSelectedOption}) => (
//       <SelectMenu
//         options={options}
//         value={singleSelectedOption}
//         onSelect={changeSingleSelectedOption}
//         // appearance="outline"
//       />
//     )}
//   </Wrapper>
// ))
// .add('Custom list item body', () => (
//   <Wrapper>
//     {({select, deselect, selectedOptions}) => (
//       <SelectMenu
//         isMultiSelect
//         options={options}
//         value={selectedOptions}
//         onSelect={select}
//         onDeselect={deselect}
//         appearance="primary"
//         renderItem={(option, click, options, selected) => {
//           return (
//             <div key={option.value}>
//               <Button onClick={click}>{option.label} </Button>
//             </div>
//           )
//         }}
//         children={props => (
//           <Button ref={props.getRef} onClick={props.toggle}>
//             Select
//           </Button>
//         )}
//       />
//     )}
//   </Wrapper>
// ))
// .add('Usage in form while being heavily styled', () => {
//   const CustomFormField = styled(FormField)`
//     ${Label} {
//       left: ${_ => _.theme.spacing.xs};
//       font-size: 12px;
//       font-weight: 600;
//     }
//     ${StyledAlert.Box} {
//       margin-left: ${_ => _.theme.spacing.xs};
//     }
//   `

//   const StoryComponent = () => {
//     const {Form, form} = useForm({
//       initialValues: {
//         fruit: 'Cherry'
//       },
//       validateOnChange: true
//     })

//     useFont()

//     const checkErrors = useCallback(value => {
//       form.errors['fruit'] = value === 'Banana' ? 'It\'s an error!' : undefined
//     })

//     return (
//       <SmashingThemeProvider
//         theme={{
//           fontFamilies: {ui: 'Nunito'},
//           colors: {
//             text: {default: '#1D304E', intense: '#1D304E'},
//             border: {default: '#1D304E', muted: '#A2ADC2'},
//             background: {default: '#F1F1F2', blueTint: '#E8EDF7'}
//           }
//         }}
//       >
//         <style>{'body {background-color: #F1F1F2}'}</style>
//         <Form>
//           <Wrapper>
//             {({singleSelectedOption, changeSingleSelectedOption}) => (
//               <CustomFormField
//                 labelAppearance="overlay"
//                 alertAppearance="overlay"
//                 label="Label"
//                 name="fruit"
//                 component={({value, onChange}) => (
//                   <SelectMenu
//                     height={200}
//                     minWidth={146}
//                     hideSelectedItem
//                     options={options}
//                     appearance="outline"
//                     onSelect={value => {
//                       checkErrors(value)
//                       onChange(value)
//                     }}
//                     value={value}
//                   />
//                 )}
//               />
//             )}
//           </Wrapper>
//         </Form>
//       </SmashingThemeProvider>
//     )
//   }

//   return <StoryComponent />
// })
