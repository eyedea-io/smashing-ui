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

    return `${datePart}${datePart && timePart ? ' ' : ''}${timePart}`
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
  BACKSPACE: 'Backspace',
  END: 'End',
  HOME: 'Home',
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  TAB: 'Tab'
}
