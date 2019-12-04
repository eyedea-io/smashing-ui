import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ControlGroup} from '@smashing/control-group'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {Heading} from '@smashing/typography'

const items = [...new Array(14)].map((_, index) =>
  ({
    label: `Lorem Ipsum ${index + 1}`,
    value: index + 1
  }))

const layouts = [
  {
    name: 'Default',
    props: {
      items: items.slice(0, 2)
    }
  },
  {
    name: 'Flat',
    props: {
      controlAppearance: 'flat'
    }
  },
  {
    name: 'Primary',
    props: {
      controlAppearance: 'primary',
      textAlign: 'right'
    }
  },
  {
    name: 'Minimal',
    props: {
      controlAppearance: 'minimal',
      textAlign: 'center'
    }
  },
  {
    name: 'Subtle',
    props: {
      controlAppearance: 'subtle',
      textAlign: 'center',
      items
    },
  },
  {
    name: 'Outline',
    props: {
      controlAppearance: 'outline',
      items
    },
  },
  {
    name: 'Card',
    props: {
      controlAppearance: 'card',
      items
    },
  },
  {
    name: 'Toggle',
    props: {
      controlAppearance: 'toggle',
      items
    },
  }
]

const buttonAppearances = ['flat', 'primary', 'minimal', 'default', 'subtle', 'outline']
const checkboxAppearances = ['primary', 'minimal', 'card', 'outline', 'toggle']
const radioAppearances = ['default', 'outline']

addDecorator(withA11y)

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

storiesOf('Form|ControlGroup', module)
  .addDecorator(Decorator)
  .add('layout: default', () => {
    const [value, setValue] = React.useState(1)
    console.log(items)
    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3),
      visibleCount: 3,
    }

    return (
      layouts.filter(layout => buttonAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('layout: equal width', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => buttonAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup layout="equal" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('layout: full width', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => buttonAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup layout="full" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('groupAppearance: button', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => buttonAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('groupAppearance: radio-horizontal', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => radioAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup groupAppearance="radio-horizontal" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('groupAppearance: radio-vertical', () => {
    const [value, setValue] = React.useState(1)

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => radioAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup groupAppearance="radio-vertical" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('groupAppearance: checkbox-horizontal', () => {
    const [value, setValue] = React.useState([1])

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => checkboxAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup groupAppearance="checkbox-horizontal" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })
  .add('groupAppearance: checkbox-vertical', () => {
    const [value, setValue] = React.useState([1])

    const props = {
      onChange: setValue,
      value,
      items: items.slice(0, 3)
    }

    return (
      layouts.filter(layout => checkboxAppearances.includes(layout.name.toLowerCase())).map(layout => (
        <React.Fragment key={layout.name}>
          <Heading variant={100}>{layout.name}</Heading>
          <ControlGroup groupAppearance="checkbox-vertical" {...props} {...layout.props} />
        </React.Fragment>
      ))
    )
  })

storiesOf('Form|ControlGroup/controlAppearance:outline', module)
  .addDecorator(Decorator)
  .add('default', () => {
    const [value, setValue] = React.useState([1, 3])

    return (
      <ControlGroup
        onChange={setValue}
        value={value}
        items={items}
        layout="equal"
        controlAppearance='outline'
      />
    )
  })
  .add('invalid', () => {
    const [value, setValue] = React.useState(3)

    return (
      <ControlGroup
        onChange={setValue}
        value={value}
        items={items}
        controlAppearance='outline'
        invalid
      />
    )
  })
  .add('disabled', () => {
    const [value, setValue] = React.useState(3)

    return (
      <ControlGroup
        onChange={setValue}
        value={value}
        items={items}
        controlAppearance='outline'
        disabled
      />
    )
  })
  .add('height: 60', () => {
    const [value, setValue] = React.useState(3)

    return (
      <ControlGroup
        onChange={setValue}
        value={value}
        items={items}
        controlAppearance='outline'
        height={60}
      />
    )
  })
