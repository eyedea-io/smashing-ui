import * as React from 'react'
import styled from 'styled-components'
import {ButtonAppearanceType} from '@smashing/button'
import {Radio, RadioAppearanceType} from '@smashing/radio'
import {Checkbox, CheckboxAppearanceType} from '@smashing/checkbox'
import {
  ControlProps,
  ControlGroupProps,
  ControlAppearanceType,
  ControlGroupAppearanceType
} from './types'
import {useDefaults, safeInvoke} from '@smashing/theme'
import {ControlButton, ControlGroupWrapper, MoreButton, Select} from './styles'
// TODO: add icon component
const ArrowIcon = () => (
  <svg
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="#1D304E"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.310946 0.808831C0.725541 0.397056 1.39773 0.397056 1.81233 0.808831L8 6.95442L14.1877 0.808831C14.6023 0.397056 15.2745 0.397056 15.6891 0.808831C16.1036 1.22061 16.1036 1.88823 15.6891 2.3L8.75069 9.19117C8.5516 9.38891 8.28156 9.5 8 9.5C7.71844 9.5 7.44841 9.38891 7.24931 9.19117L0.310946 2.3C-0.103649 1.88823 -0.103649 1.22061 0.310946 0.808831Z"
    />
  </svg>
)

const Control: React.FC<ControlProps> = ({
  item,
  textAlign,
  disabled,
  invalid,
  height,
  value: groupValue,
  groupAppearance,
  controlAppearance,
  isOpen,
  onChange
}) => {
  const checked = Array.isArray(groupValue)
    ? groupValue.includes(item.value || '')
    : groupValue === item.value

  const renderProps = {
    textAlign,
    checked,
    disabled,
    invalid,
    height,
    ...item
  }
  const handleOnChange = (itemValue: string) => {
    if (Array.isArray(groupValue)) {
      if (groupValue.includes(itemValue)) {
        safeInvoke(
          onChange,
          groupValue.filter(item => item !== itemValue)
        )
      } else {
        safeInvoke(onChange, groupValue.concat(itemValue))
      }
    } else {
      const newValue = groupValue === itemValue ? undefined : itemValue
      safeInvoke(onChange, newValue)
    }
  }

  switch (groupAppearance) {
    case 'radio-horizontal':
    case 'radio-vertical':
      return (
        <Radio
          {...renderProps}
          appearance={controlAppearance as RadioAppearanceType}
          onChange={() => safeInvoke(handleOnChange, item.value)}
        >
          {item.label}
        </Radio>
      )
    case 'checkbox-horizontal':
    case 'checkbox-vertical':
      return (
        <Checkbox
          {...renderProps}
          appearance={controlAppearance as CheckboxAppearanceType}
          onChange={() => safeInvoke(handleOnChange, item.value)}
        >
          {item.label}
        </Checkbox>
      )
    case 'button':
    default:
      return (
        <ControlButton
          {...renderProps}
          appearance={controlAppearance as ButtonAppearanceType}
          onClick={() => safeInvoke(handleOnChange, item.value)}
          activeGroup={Boolean(
            Array.isArray(groupValue) ? groupValue.length : groupValue
          )}
          isOpen={isOpen}
        >
          {item.label}
        </ControlButton>
      )
  }
}

const ControlGroupFC: React.FC<ControlGroupProps> = props => {
  const {height, controlAppearance, groupAppearance} = useDefaults(
    'controlGroup',
    props,
    {
      height: 32,
      controlAppearance: 'default' as ControlAppearanceType,
      groupAppearance: 'button' as ControlGroupAppearanceType
    }
  )
  const {
    items,
    onChange,
    value,
    layout,
    textAlign,
    disabled,
    invalid,
    visibleCount
  } = props

  const [controlsNumber, setControlsNumber] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [width, setWidth] = React.useState(0)
  const hasMoreButton =
    controlAppearance === 'outline' && groupAppearance === 'button'
  const wrapperNode = React.useRef<HTMLDivElement>(null)
  const moreButtonNode = React.createRef<HTMLButtonElement>()

  React.useEffect(() => {
    setControlsNumber(visibleCount ? visibleCount + 1 : 0)
  }, [])

  // when user click More button, function triggers hidden select menu, makes it visible and hide control group
  // TODO: getElementsByClassName is temporary solution, need to pass ref in props to Select Menu component
  const handleSelectTrigger = () => {
    if (wrapperNode.current && hasMoreButton) {
      let select = wrapperNode.current.getElementsByClassName(
        'selectMenuInput'
      ) as HTMLCollectionOf<HTMLButtonElement>
      select[0].click()
      setIsOpen(true)
    }
  }
  // TODO: add recalculate on window resize
  React.useLayoutEffect(() => {
    if (
      wrapperNode &&
      wrapperNode.current &&
      !visibleCount &&
      !controlsNumber
    ) {
      const {clientWidth, children: listChildren} = wrapperNode.current
      let widthSum = moreButtonNode.current
        ? moreButtonNode.current.clientWidth
        : 0

      let childCount = 0
      Array.from(listChildren).forEach(child => {
        if (widthSum + child.scrollWidth <= clientWidth) {
          widthSum += child.scrollWidth
          childCount++
        }
      })
      setControlsNumber(childCount)
    }
    if (wrapperNode && wrapperNode.current) {
      setWidth(wrapperNode.current.clientWidth)
    }
  }, [wrapperNode && wrapperNode.current && wrapperNode.current.clientWidth])

  return (
    <>
      <ControlGroupWrapper
        ref={wrapperNode}
        groupAppearance={groupAppearance}
        controlAppearance={controlAppearance}
        childrenAmount={items.length}
        layout={layout}
        isOpen={isOpen}
        visibleItemsCount={controlsNumber}
        hasMoreButton={hasMoreButton}
        width={width > 0 ? width : null}
      >
        {items.map(item => (
          <Control
            key={`${item.label}-${item.value}`}
            item={item}
            onChange={onChange}
            value={value}
            textAlign={textAlign}
            disabled={disabled}
            invalid={invalid}
            groupAppearance={groupAppearance}
            controlAppearance={controlAppearance}
            height={height}
            isOpen={isOpen}
          />
        ))}
        {hasMoreButton && (
          <>
            <Select
              className="selectMenuInput"
              options={items}
              value={value}
              height={height}
              appearance="outline"
              onSelect={onChange}
              popoverAppearance="accordion"
              width={width}
              hideSelectedItem
              isSelectable={false}
              disabled={disabled}
              invalid={invalid}
            />
            <MoreButton
              key="more-button"
              appearance="outline"
              activeGroup={Boolean(Array.isArray(value) ? value.length : value)}
              isOpen={isOpen}
              checked={false}
              height={height}
              invalid={invalid}
              disabled={disabled}
              iconAfter={ArrowIcon}
              onClick={handleSelectTrigger}
            />
          </>
        )}
      </ControlGroupWrapper>
    </>
  )
}
const ControlGroup = styled(ControlGroupFC)``

export {ControlGroup, ControlGroupProps}

declare module 'styled-components' {
  export interface SmashingControlGroupDefaults
    extends Partial<{
      controlGroup: Pick<
        ControlGroupProps,
        'controlAppearance' | 'groupAppearance' | 'height'
      >
    }> {}
}
