import * as React from 'react'
import * as S from './styles'

type TimePickerProps = {
  hoursLabel: string
  minutesLabel: string
  minutesInterval: number
  hourValue?: number
  minuteValue?: number
  changeTime: (hours?: number, minutes?: number) => void
}

export const TimePicker: React.FC<TimePickerProps> = ({
  hoursLabel,
  minutesLabel,
  minutesInterval,
  hourValue,
  minuteValue,
  changeTime
}) => {
  return (
    <S.TimePicker>
      <S.TimeButton>Time picker</S.TimeButton>
      <S.TimeLabel>{hoursLabel}</S.TimeLabel>
      <S.TimeButtonsContainer>
        {Array.from(Array(24).keys()).map(elem => (
          <S.TimePickButton
            as="button"
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
