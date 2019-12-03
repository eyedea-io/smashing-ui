import * as React from 'react'
import * as S from './styles'
import {
  CalendarDate as CalendarDateHelper,
  CalendarDateTime,
  DateTimePartsType,
  DateValue,
  KEYS
} from './utils'
import {CalendarIcon, ChevronUpIcon} from './icons'
import {DateInputProps} from './types'

export const DateInput: React.FC<DateInputProps> = ({
  onChange = () => {},
  onClick,
  value,
  getRef,
  openCalendar,
  hasTime = false,
  minutesInterval,
  timeValue,
  isExpanded,
  expandIcon = () => <CalendarIcon />,
  collapseIcon = () => <ChevronUpIcon />,
  ...props
}) => {
  const CalendarDate = hasTime
    ? new CalendarDateTime()
    : new CalendarDateHelper()
  const [inputValue, setInputValue] = React.useState<DateValue>(
    CalendarDate.initValue
  )
  const inputNode = React.useRef<HTMLInputElement | null>(null)
  const [cursorPosition, setCursorPosition] = React.useState(0)
  const [activeDatePart, setActiveDatePart] = React.useState<Partial<
    DateTimePartsType
  > | null>(null)

  React.useEffect(() => {
    setSelectionRange(cursorPosition, cursorPosition + 1)
  }, [cursorPosition])
  React.useEffect(() => {
    if (value) {
      setInputValue(CalendarDate.getValue(value))
    } else {
      setInputValue({
        ...inputValue,
        hours: timeValue.hours || CalendarDate.initValue.hours,
        minutes: timeValue.minutes || CalendarDate.initValue.minutes
      })
    }
  }, [value, timeValue])

  const changeInputValue = (newValue: DateValue) => {
    const isValidDate = !Object.values(newValue).some(elem =>
      isNaN(Number(elem))
    )
    if (isValidDate) {
      const minutes = Number(newValue.minutes)
      const increaseMinutes = minutes % minutesInterval > minutesInterval / 2
      onChange(
        CalendarDate.getDate({
          ...newValue,
          minutes:
            minutes -
            (minutes % minutesInterval) +
            (increaseMinutes ? minutesInterval : 0)
        })
      )
    } else {
      onChange()
      setInputValue(newValue)
    }
  }

  const setSelectionRange = (start: number, end: number) => {
    if (inputNode.current) {
      inputNode.current.childNodes.forEach(node => {
        if (node.nodeName === 'INPUT' && activeDatePart) {
          ;(node as HTMLInputElement).focus()
          ;(node as HTMLInputElement).setSelectionRange(start, end)
        }
      })
    }
  }

  const focusNextPart = () => {
    if (activeDatePart) {
      const activeDatePartIndex = CalendarDate.format.indexOf(activeDatePart)
      if (activeDatePartIndex + 1 < CalendarDate.format.length) {
        setActiveDatePart(CalendarDate.format[activeDatePartIndex + 1])
        setCursorPosition(
          CalendarDate.getPartStartIndex(
            CalendarDate.format[activeDatePartIndex + 1]
          )
        )
      }
    }
  }
  const focusPrevPart = () => {
    if (activeDatePart) {
      const activeDatePartIndex = CalendarDate.format.indexOf(activeDatePart)
      if (activeDatePartIndex > 0) {
        setActiveDatePart(CalendarDate.format[activeDatePartIndex - 1])
        setCursorPosition(
          CalendarDate.getPartStartIndex(
            CalendarDate.format[activeDatePartIndex - 1]
          )
        )
      }
    }
  }

  const isStartCurrentPart = () => {
    if (activeDatePart) {
      return CalendarDate.getPartStartIndex(activeDatePart) === cursorPosition
    }
    return false
  }
  const isEndCurrentPart = () => {
    if (activeDatePart) {
      return CalendarDate.getPartEndIndex(activeDatePart) - 1 === cursorPosition
    }
    return false
  }

  const setPartValue = (part: DateTimePartsType, value) => {
    let newValue = Number(value)
    if (isNaN(newValue)) {
      changeInputValue({...inputValue, [part]: value})
    } else {
      if (part === 'month' && newValue > 12) {
        newValue = 12
      } else if (part === 'day' && newValue > 31) {
        newValue = 31
      } else if (part === 'hours' && newValue > 23) {
        newValue = 23
      } else if (part === 'minutes' && newValue > 59) {
        newValue = 59
      }
      changeInputValue({...inputValue, [part]: newValue})
    }
  }

  const moveCursorRight = (count: number = 1) => {
    for (let i = 0; i < count; i++) {
      if (isEndCurrentPart()) {
        focusNextPart()
      } else if (
        cursorPosition + 1 <
        CalendarDate.getStringValueForParts(inputValue).length
      ) {
        setCursorPosition(cursorPosition + 1)
      }
    }
  }

  const moveCursorLeft = (count: number = 1) => {
    for (let i = 0; i < count; i++) {
      if (isStartCurrentPart()) {
        focusPrevPart()
      } else if (cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<{}>) => {
    e.stopPropagation()
    if (e.key === KEYS.DOWN) {
      openCalendar()
    } else if (e.key === KEYS.LEFT) {
      moveCursorLeft()
    } else if (e.key === KEYS.RIGHT) {
      moveCursorRight()
    } else if (e.key === KEYS.TAB) {
      if (
        !e.shiftKey &&
        activeDatePart !== CalendarDate.format[CalendarDate.format.length - 1]
      ) {
        e.preventDefault()
        focusNextPart()
      } else if (e.shiftKey && activeDatePart !== CalendarDate.format[0]) {
        e.preventDefault()
        focusPrevPart()
      }
    } else if (e.key === KEYS.HOME) {
      setCursorPosition(0)
      setActiveDatePart(CalendarDate.format[0])
    } else if (e.key === KEYS.END) {
      const endPart = CalendarDate.format[CalendarDate.format.length - 1]
      setCursorPosition(CalendarDate.getPartEndIndex(endPart) - 1)
      setActiveDatePart(endPart)
    } else if (e.key === KEYS.BACKSPACE && activeDatePart) {
      if (isStartCurrentPart()) {
        const activeDatePartIndex = CalendarDate.format.indexOf(activeDatePart)
        const prevDatePart = CalendarDate.format[activeDatePartIndex - 1]
        focusPrevPart()
        setPartValue(prevDatePart, CalendarDate.initValue[prevDatePart])
      } else {
        setPartValue(activeDatePart, CalendarDate.initValue[activeDatePart])
        setCursorPosition(CalendarDate.getPartStartIndex(activeDatePart))
      }
    } else {
      const character = e.key
      if (!/^[0-9]$/.test(character) || !activeDatePart) {
        return
      }
      const value = CalendarDate.getStringValueForParts(inputValue, [
        activeDatePart
      ])

      const relativeCursorPosition =
        cursorPosition - CalendarDate.getPartStartIndex(activeDatePart)
      setPartValue(
        activeDatePart,
        value.substr(0, relativeCursorPosition) +
          character +
          value.substr(relativeCursorPosition + 1)
      )
      moveCursorRight()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text/plain')
    const newDate = Date.parse(data)
    if (isNaN(newDate)) {
      e.preventDefault()
    } else {
      setInputValue(CalendarDate.getValue(new Date(newDate)))
    }
  }

  const handleClick = (e?: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick()
    }
    const clickedCharPosition =
      e && e.currentTarget && e.currentTarget.selectionStart
    if (
      clickedCharPosition &&
      clickedCharPosition <
        CalendarDate.getStringValueForParts(inputValue).length
    ) {
      CalendarDate.format.forEach(part => {
        const partStartIndex = CalendarDate.getPartStartIndex(part)
        if (clickedCharPosition && partStartIndex < clickedCharPosition) {
          setCursorPosition(partStartIndex)
          setActiveDatePart(part)
        }
      })
    } else {
      setCursorPosition(0)
      setActiveDatePart(CalendarDate.format[0])
      setSelectionRange(cursorPosition, cursorPosition + 1)
    }
  }

  return (
    <S.StyledInput
      innerRef={ref => {
        inputNode.current = ref
        getRef(ref)
      }}
      readOnly
      onFocus={() => {
        setActiveDatePart(CalendarDate.format[0])
      }}
      onBlur={() => {
        setActiveDatePart(null)
        setCursorPosition(0)
      }}
      aria-expanded={isExpanded}
      onPaste={handlePaste}
      width={props.width}
      onClick={handleClick}
      appearance={props.appearance}
      onKeyDown={handleKeyDown}
      value={CalendarDate.getStringValueForParts(inputValue)}
      affixAfter={isExpanded ? collapseIcon : expandIcon}
      onClickAfter={() => handleClick()}
    ></S.StyledInput>
  )
}
