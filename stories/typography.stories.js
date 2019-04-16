import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {
  Text,
  Heading,
  Strong,
  Paragraph,
  Label
} from "@smashing/typography/src/index"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Typography|Text", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("variant:300", () => <Text variant={300}>Hello</Text>)
  .add("variant:400:default", () => <Text>Hello</Text>)
  .add("variant:500", () => <Text variant={500}>Hello</Text>)
  .add("variant:600", () => <Text variant={600}>Hello</Text>)
  .add("color:muted", () => <Text color="muted">Hello</Text>)
  .add("color:default", () => <Text color="default">Hello</Text>)
  .add("color:dark", () => <Text color="dark">Hello</Text>)
  .add("intent:danger", () => <Text intent="danger">Hello</Text>)
  .add("intent:info", () => <Text intent="info">Hello</Text>)
  .add("intent:success", () => <Text intent="success">Hello</Text>)
  .add("intent:warning", () => <Text intent="warning">Hello</Text>)

storiesOf("Typography|Strong", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("variant:300", () => <Strong variant={300}>Hello</Strong>)
  .add("variant:400:default", () => <Strong>Hello</Strong>)
  .add("variant:500", () => <Strong variant={500}>Hello</Strong>)
  .add("variant:600", () => <Strong variant={600}>Hello</Strong>)
  .add("color:muted", () => <Strong color="muted">Hello</Strong>)
  .add("color:default", () => <Strong color="default">Hello</Strong>)
  .add("color:dark", () => <Strong color="dark">Hello</Strong>)
  .add("intent:danger", () => <Strong intent="danger">Hello</Strong>)
  .add("intent:info", () => <Strong intent="info">Hello</Strong>)
  .add("intent:success", () => <Strong intent="success">Hello</Strong>)
  .add("intent:warning", () => <Strong intent="warning">Hello</Strong>)

storiesOf("Typography|Paragraph", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("variant:300", () => (
    <Paragraph variant={300}>
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("variant:400:default", () => (
    <Paragraph>
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("variant:500", () => (
    <Paragraph variant={500}>
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("color:muted", () => (
    <Paragraph color="muted">
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("color:default", () => (
    <Paragraph color="default">
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("color:dark", () => (
    <Paragraph color="dark">
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))

storiesOf("Typography|Heading", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("variant:100", () => <Heading variant={100}>Hello</Heading>)
  .add("variant:200", () => <Heading variant={200}>Hello</Heading>)
  .add("variant:300", () => <Heading variant={300}>Hello</Heading>)
  .add("variant:400:default", () => <Heading>Hello</Heading>)
  .add("variant:500", () => <Heading variant={500}>Hello</Heading>)
  .add("variant:600", () => <Heading variant={600}>Hello</Heading>)
  .add("variant:700", () => <Heading variant={700}>Hello</Heading>)
  .add("variant:800", () => <Heading variant={800}>Hello</Heading>)
  .add("variant:900", () => <Heading variant={900}>Hello</Heading>)
  .add("fontFamily:ui", () => <Heading fontFamily="ui">Hello</Heading>)
  .add("fontFamily:display:default", () => (
    <Heading fontFamily="display">Hello</Heading>
  ))
  .add("fontFamily:mono", () => <Heading fontFamily="mono">Hello</Heading>)

storiesOf("Typography|Label", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("variant:300", () => <Label variant={300}>Hello</Label>)
  .add("variant:400:default", () => <Label>Hello</Label>)
  .add("variant:500", () => <Label variant={500}>Hello</Label>)
  .add("fontFamily:ui", () => <Label fontFamily="ui">Hello</Label>)
  .add("fontFamily:display:default", () => (
    <Label fontFamily="display">Hello</Label>
  ))
  .add("fontFamily:mono", () => <Label fontFamily="mono">Hello</Label>)
