import React from "react"
import {storiesOf} from "@storybook/react"
import {Text, Heading} from "@smashing/typography/src/index"

storiesOf("Typography|Text", module)
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

storiesOf("Typography|Heading", module)
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
