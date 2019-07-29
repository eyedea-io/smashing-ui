import React from "react"
import {storiesOf, addDecorator} from "@storybook/react"
import {Checkbox} from "@smashing/checkbox"
import {withA11y} from "@storybook/addon-a11y"
import {SmashingThemeProvider} from "@smashing/theme"

addDecorator(withA11y)

const icon = (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.4661 10.9073C6.04232 10.4809 6.04232 9.78957 6.4661 9.36317C7.31414 8.5099 8.68908 8.5099 9.53712 9.36317C9.9609 9.78957 9.9609 10.4809 9.53712 10.9073L8.76894 11.6802C8.34515 12.1066 7.65807 12.1066 7.23429 11.6802L6.4661 10.9073Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0727 7.8216C9.37566 6.11791 6.62425 6.11791 4.92724 7.8216C4.50298 8.24752 3.81513 8.24752 3.39087 7.8216C2.96662 7.39568 2.96662 6.70512 3.39087 6.2792C5.9364 3.72367 10.0635 3.72367 12.609 6.2792C13.0333 6.70512 13.0333 7.39568 12.609 7.8216C12.1848 8.24752 11.4969 8.24752 11.0727 7.8216Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.318191 4.73682C-0.106064 4.3109 -0.106064 3.62034 0.318191 3.19442C4.56074 -1.06481 11.4393 -1.06481 15.6818 3.19442C16.1061 3.62034 16.1061 4.3109 15.6818 4.73682C15.2576 5.16274 14.5697 5.16274 14.1454 4.73682C10.7514 1.32944 5.24859 1.32944 1.85455 4.73682C1.4303 5.16274 0.742446 5.16274 0.318191 4.73682Z"
      fill="currentColor"
    />
  </svg>
)

storiesOf("Core|Checkbox", module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          checkbox: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add("appearance:primary default", () => (
    <React.Fragment>
      <p>
        <Checkbox>Stay signed in</Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("appearance:primary checked", () => (
    <React.Fragment>
      <p>
        <Checkbox checked>Stay signed in</Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("disabled", () => (
    <React.Fragment>
      <p>
        <Checkbox disabled>Stay signed in</Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("checked disabled", () => (
    <React.Fragment>
      <p>
        <Checkbox checked disabled>
          Stay signed in
        </Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("appearance:minimal default", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="minimal">Stay signed in</Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("appearance:minimal checked", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="minimal" checked>
          Stay signed in
        </Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("appearance:card", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="card"> {icon} Stay signed in</Checkbox>
      </p>
    </React.Fragment>
  ))
  .add("appearance:card checked", () => (
    <React.Fragment>
      <p>
        <Checkbox appearance="card" checked>
          {icon}
          Stay signed in
        </Checkbox>
      </p>
    </React.Fragment>
  ))
