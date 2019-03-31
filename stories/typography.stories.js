import React from "react"
import {storiesOf} from "@storybook/react"
import {Text} from "@smashing/typography/src/index"

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
