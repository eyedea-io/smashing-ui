export type DateTimePartsType = 'year' | 'month' | 'day' | 'hours' | 'minutes'
export type DateValue = {
  [key in DateTimePartsType]?: string | number
}

export interface ICalendarDate {
  format: DateTimePartsType[]
  dateSeparator: string
  timeSeparator?: string
  initValue: DateValue
  getValue: (date: Date) => DateValue
  getDate: (value: DateValue) => Date
  getStringValueForParts: (
    value: DateValue,
    parts?: DateTimePartsType[]
  ) => string
  getPartStartIndex: (part: DateTimePartsType) => number
  getPartEndIndex: (part: DateTimePartsType) => number
}

export class CalendarDate implements ICalendarDate {
  format: DateTimePartsType[] = ['day', 'month', 'year']
  dateSeparator = ' / '
  initValue: DateValue = {
    year: 'YYYY',
    month: 'MM',
    day: 'DD'
  }

  getValue = (date: Date): DateValue => {
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      day: date.getDate()
    }
  }

  getDate = (value: DateValue) => {
    return new Date(
      Number(value.year),
      Number(value.month) - 1,
      Number(value.day)
    )
  }

  getStringValueForParts = (
    value: DateValue,
    parts: DateTimePartsType[] = this.format
  ) => {
    return parts
      .map(part => {
        const numberVal = Number(value[part])
        if (['month', 'day'].includes(part) && numberVal < 10) {
          return `0${value[part]}`
        }
        return value[part]
      })
      .join(this.dateSeparator)
  }

  getPartStartIndex = (part: DateTimePartsType) => {
    const activeDatePartIndex = this.format.indexOf(part)
    if (activeDatePartIndex === 0) {
      return 0
    }
    return (
      this.getStringValueForParts(
        this.initValue,
        this.format.slice(0, activeDatePartIndex)
      ) + this.dateSeparator
    ).length
  }

  getPartEndIndex = (part: DateTimePartsType) => {
    const activeDatePartIndex = this.format.indexOf(part)
    return this.getStringValueForParts(
      this.initValue,
      this.format.slice(0, activeDatePartIndex + 1)
    ).length
  }
}

export class CalendarDateTime implements ICalendarDate {
  format: DateTimePartsType[] = ['day', 'month', 'year', 'hours', 'minutes']
  dateSeparator = ' / '
  timeSeparator = ':'
  initValue: {[key in DateTimePartsType]: string | number} = {
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
    hours: 'HH',
    minutes: 'MM'
  }

  getValue = (date: Date): DateValue => {
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    }
  }

  getDate = (value: DateValue) => {
    return new Date(
      Number(value.year),
      Number(value.month) - 1,
      Number(value.day),
      Number(value.hours),
      Number(value.minutes)
    )
  }

  private getStringValueForDateParts = (
    value: DateValue,
    parts: DateTimePartsType[] = this.format
  ): string => {
    return parts
      .reduce((result: string[], part) => {
        if (['day', 'month', 'year'].includes(part)) {
          const numberVal = Number(value[part])
          if (['month', 'day'] && numberVal < 10) {
            return [...result, `0${value[part]}`]
          }
          return [...result, value[part] as string]
        }

        return result
      }, [])
      .join(this.dateSeparator)
  }

  private getStringValueForTimeParts = (
    value: DateValue,
    parts: DateTimePartsType[] = this.format
  ): string => {
    return parts
      .reduce((result: string[], part) => {
        if (['minutes', 'hours'].includes(part)) {
          const numberVal = Number(value[part])
          return [...result, `${numberVal < 10 ? '0' : ''}${value[part]}`]
        }

        return result
      }, [])
      .join(this.timeSeparator)
  }

  getStringValueForParts = (
    value: DateValue,
    parts: DateTimePartsType[] = this.format
  ) => {
    const datePart = this.getStringValueForDateParts(value, parts)
    const timePart = this.getStringValueForTimeParts(value, parts)

    const v = `${datePart}${datePart && timePart ? ' ' : ''}${timePart}`
    return v
  }

  getPartStartIndex = (part: DateTimePartsType): number => {
    const activeDatePartIndex = this.format.indexOf(part)
    if (activeDatePartIndex === 0) {
      return 0
    }
    const isTimePart = ['minutes', 'hours'].includes(part)
    const endSeparator = isTimePart ? this.timeSeparator : this.dateSeparator
    return (
      this.getStringValueForParts(
        this.initValue,
        this.format.slice(0, activeDatePartIndex)
      ) + endSeparator
    ).length
  }

  getPartEndIndex = (part: DateTimePartsType) => {
    const activeDatePartIndex = this.format.indexOf(part)
    return this.getStringValueForParts(
      this.initValue,
      this.format.slice(0, activeDatePartIndex + 1)
    ).length
  }
}

export const KEYS = {
  BACKSPACE: 8,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  NUM_0: 48,
  NUM_1: 49,
  NUM_2: 50,
  NUM_3: 51,
  NUM_4: 52,
  NUM_5: 53,
  NUM_6: 54,
  NUM_7: 55,
  NUM_8: 56,
  NUM_9: 57,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105
}

export function getCharacter(keyCode: number) {
  switch (keyCode) {
    default:
      return '.'
    case KEYS.NUM_0:
    case KEYS.NUMPAD_0:
      return '0'
    case KEYS.NUM_1:
    case KEYS.NUMPAD_1:
      return '1'
    case KEYS.NUM_2:
    case KEYS.NUMPAD_2:
      return '2'
    case KEYS.NUM_3:
    case KEYS.NUMPAD_3:
      return '3'
    case KEYS.NUM_4:
    case KEYS.NUMPAD_4:
      return '4'
    case KEYS.NUM_5:
    case KEYS.NUMPAD_5:
      return '5'
    case KEYS.NUM_6:
    case KEYS.NUMPAD_6:
      return '6'
    case KEYS.NUM_7:
    case KEYS.NUMPAD_7:
      return '7'
    case KEYS.NUM_8:
    case KEYS.NUMPAD_8:
      return '8'
    case KEYS.NUM_9:
    case KEYS.NUMPAD_9:
      return '9'
  }
}
