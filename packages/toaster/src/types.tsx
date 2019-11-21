import {AlertAppearanceType} from '@smashing/alert'

export interface ToastModel {
  id: string | number
  title: string
  description?: string
  hasCloseButton?: boolean
  duration: number
  close: () => void
  intent: 'success' | 'warning' | 'danger' | 'info'
  isShown: boolean
}

export interface ToastSettings {
  /**
   * There are cases when only one toast with the same content can be shown at a time. By setting this property to unique ID, all previous toasts with the same ID will close before showing a new one.
   */
  id?: string
  /**
   * Time for how long toast is displayed. Property is in seconds - not milliseconds
   * @default 5
   */
  duration?: number
  /** Additional description displayed under title */
  description?: string
  hasCloseButton?: boolean
}

export interface ToastProps {
  /**
   * The z-index of the toast.
   */
  zIndex?: number

  /**
   * Duration of the toast.
   */
  duration?: number

  /**
   * Function called when the toast is all the way closed.
   */
  onRemove?: () => void

  /**
   * The type of the alert.
   */
  intent?: 'success' | 'warning' | 'danger' | 'info'

  /**
   * The title of the alert.
   */
  title?: string

  /**
   * When true, show a close icon button inside of the toast.
   */
  hasCloseButton?: boolean

  /**
   * When false, will close the Toast and call onRemove when finished.
   */
  isShown?: boolean
  apperance?: AlertAppearanceType
}

export interface ToastManagerProps {
  /**
   * Function called with the `this.notify` function.
   */
  bindNotify: any

  /**
   * Function called with the `this.getToasts` function.
   */
  bindGetToasts: any

  /**
   * Function called with the `this.closeAll` function.
   */
  bindCloseAll: any
}
