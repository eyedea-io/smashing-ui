import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Text, Heading, Strong, Paragraph} from "@smashing/typography/src/index"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

storiesOf("Typography|Text", module)
  .addDecorator(story => (
    <SmashingThemeProvider>{story()}</SmashingThemeProvider>
  ))
  .add("size:300", () => <Text size={300}>Hello</Text>)
  .add("size:400:default", () => <Text>Hello</Text>)
  .add("size:500", () => <Text size={500}>Hello</Text>)
  .add("size:600", () => <Text size={600}>Hello</Text>)
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
  .add("size:300", () => <Strong size={300}>Hello</Strong>)
  .add("size:400:default", () => <Strong>Hello</Strong>)
  .add("size:500", () => <Strong size={500}>Hello</Strong>)
  .add("size:600", () => <Strong size={600}>Hello</Strong>)
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
  .add("size:300", () => (
    <Paragraph size={300}>
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("size:400:default", () => (
    <Paragraph>
      Leverage agile frameworks to provide a robust synopsis for high level
      overviews.
    </Paragraph>
  ))
  .add("size:500", () => (
    <Paragraph size={500}>
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
  .add("size:100", () => <Heading size={100}>Hello</Heading>)
  .add("size:200", () => <Heading size={200}>Hello</Heading>)
  .add("size:300", () => <Heading size={300}>Hello</Heading>)
  .add("size:400:default", () => <Heading>Hello</Heading>)
  .add("size:500", () => <Heading size={500}>Hello</Heading>)
  .add("size:600", () => <Heading size={600}>Hello</Heading>)
  .add("size:700", () => <Heading size={700}>Hello</Heading>)
  .add("size:800", () => <Heading size={800}>Hello</Heading>)
  .add("size:900", () => <Heading size={900}>Hello</Heading>)
  .add("fontFamily:ui", () => <Heading fontFamily="ui">Hello</Heading>)
  .add("fontFamily:display:default", () => (
    <Heading fontFamily="display">Hello</Heading>
  ))
  .add("fontFamily:mono", () => <Heading fontFamily="mono">Hello</Heading>)
