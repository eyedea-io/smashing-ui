import React from 'react'
import {storiesOf} from '@storybook/react'
import {SelectMenu} from '@smashing/select-menu'
import {SmashingThemeProvider} from '@smashing/theme'

const options = [
  {label: 'Apple', value: 'Apple'},
  {label: 'Apricot', value: 'Apricot'},
  {label: 'Banana', value: 'Banana'},
  {label: 'Cherry', value: 'Cherry', disabled: true}
]

const optionsScroll = [
  {label: 'Apple', value: 'Apple'},
  {label: 'Apricot', value: 'Apricot', disabled: true},
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

  const [selectedOptions, changeSelectedOptions] = React.useState([])

  const select = value => {
    changeSelectedOptions([...selectedOptions, value])
  }

  const deselect = option => {
    changeSelectedOptions(selectedOptions.filter(o => o !== option))
  }

  return (
    <div data-wrapper style={{marginBottom: 16}}>
      <style>
        {
          'body {height: 100vh; margin: 0; padding: 8px; box-sizing: border-box}'
        }
      </style>
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

const Decorator = story => (
  <SmashingThemeProvider
    theme={{
      defaults: {
        button: {}
      }
    }}
  >
    {story()}
  </SmashingThemeProvider>
)

storiesOf('Core|Select menu', module)
  .addDecorator(Decorator)
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
          popoverProps={{
            position: 'bottom-left'
          }}
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
  .add('appearance: flat', () => (
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
  .add('placeholder', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          placeholder="Select fruit..."
        />
      )}
    </Wrapper>
  ))
  .add('width', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          width={150}
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
  .add('multi select', () => (
    <Wrapper>
      {({changeSelectedOptions, selectedOptions}) => (
        <SelectMenu
          isMultiSelect
          options={options}
          value={selectedOptions}
          onChange={changeSelectedOptions}
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
storiesOf('Core|Select menu/popoverAppearance: accordion', module)
  .addDecorator(Decorator)
  .add('appearance: default', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          popoverAppearance="accordion"
          width={150}
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
          popoverAppearance="accordion"
          width={150}
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
          popoverAppearance="accordion"
          width={150}
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
          popoverAppearance="accordion"
          width={150}
        />
      )}
    </Wrapper>
  ))
  .add('appearance: flat', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="flat"
          popoverAppearance="accordion"
          width={150}
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
          popoverAppearance="accordion"
          width={150}
        />
      )}
    </Wrapper>
  ))
  .add('height', () => (
    <>
      <Wrapper>
        {({singleSelectedOption, changeSingleSelectedOption}) => (
          <SelectMenu
            options={optionsScroll}
            value={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
            appearance="outline"
            popoverAppearance="accordion"
            height={24}
            width={150}
          />
        )}
      </Wrapper>
      <Wrapper>
        {({singleSelectedOption, changeSingleSelectedOption}) => (
          <SelectMenu
            options={optionsScroll}
            value={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
            appearance="outline"
            popoverAppearance="accordion"
            height={32}
            width={150}
          />
        )}
      </Wrapper>
      <Wrapper>
        {({singleSelectedOption, changeSingleSelectedOption}) => (
          <SelectMenu
            options={optionsScroll}
            value={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
            appearance="outline"
            popoverAppearance="accordion"
            height={40}
            width={150}
          />
        )}
      </Wrapper>
      <Wrapper>
        {({singleSelectedOption, changeSingleSelectedOption}) => (
          <SelectMenu
            options={optionsScroll}
            value={singleSelectedOption}
            onSelect={changeSingleSelectedOption}
            appearance="outline"
            popoverAppearance="accordion"
            height={48}
            width={150}
          />
        )}
      </Wrapper>
    </>
  ))
  .add('popover height', () => (
    <Wrapper>
      {({singleSelectedOption, changeSingleSelectedOption}) => (
        <SelectMenu
          options={optionsScroll}
          value={singleSelectedOption}
          onSelect={changeSingleSelectedOption}
          appearance="outline"
          popoverAppearance="accordion"
          popoverProps={{
            height: 150
          }}
          width={150}
        />
      )}
    </Wrapper>
  ))
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
