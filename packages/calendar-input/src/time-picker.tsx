import * as React from 'react'
import * as S from './styles'
import {ChevronDownIcon} from './icons'
import {TimePickerProps} from './types'

export const TimePicker: React.FC<TimePickerProps> = ({
  hoursLabel,
  minutesLabel,
  minutesInterval,
  hourValue,
  minuteValue,
  changeTime,
  clockIcon,
  header,
  close,
  isOpen,
  collapseIcon = () => <ChevronDownIcon />
}) => {
  return (
    <S.TimePicker isOpen={isOpen}>
      <S.TimePickerHeader
        visible={isOpen}
        tabIndex={isOpen ? 0 : -1}
        appearance="minimal"
        iconAfter={collapseIcon}
        onClick={close}
      >
        <S.TimePickerHeaderText variant={300}>{header}</S.TimePickerHeaderText>
      </S.TimePickerHeader>
      <S.ClockElement>{clockIcon}</S.ClockElement>
      <S.TimeLabel>{hoursLabel}</S.TimeLabel>
      <S.TimeButtonsContainer>
        {Array.from(Array(24).keys()).map(elem => (
          <S.TimePickButton
            as="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => changeTime(elem, minuteValue)}
            active={elem === hourValue}
            key={elem}
          >
            {elem < 10 ? `0${elem}` : elem}
          </S.TimePickButton>
        ))}
      </S.TimeButtonsContainer>
      <S.TimeLabel>{minutesLabel}</S.TimeLabel>
      <S.TimeButtonsContainer>
        {Array.from(Array(60).keys())
          .filter(elem => elem % minutesInterval === 0)
          .map(elem => (
            <S.TimePickButton
              as="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => changeTime(hourValue, elem)}
              active={elem === minuteValue}
              key={elem}
            >
              {elem < 10 ? `0${elem}` : elem}
            </S.TimePickButton>
          ))}
      </S.TimeButtonsContainer>
    </S.TimePicker>
  )
}
