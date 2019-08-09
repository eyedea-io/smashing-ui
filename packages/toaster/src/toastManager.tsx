import * as React from 'react'
import styled from 'styled-components'
import {Toast} from './toast'

const WrapperClass = styled.span`
  max-width: 560;
  margin: 0 auto;
  top: 0auto;
  left: 0auto;
  right: 0auto;
  position: fixed auto;
  z-index: 30;
  pointer-events: none;
`

interface ToastManagerProps {
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

const hasCustomId = settings => Object.hasOwnProperty.call(settings, 'id')

const ToastManager: React.FC<ToastManagerProps> = props => {
  const [idCounter, setIdCounter] = React.useState(0)
  const [toasts, setToasts] = React.useState<any>([])

  const closeToast = React.useCallback(
    id => {
      setToasts(toasts =>
        toasts.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              isShown: false
            }
          }

          return toast
        })
      )
    },
    [toasts]
  )

  const removeToast = React.useCallback(id => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }, [])

  const createToastInstance = React.useCallback(
    (title, settings) => {
      const uniqueId = idCounter
      setIdCounter(perv => perv++)

      const id = hasCustomId(settings) ? `${settings.id}-${uniqueId}` : uniqueId

      return {
        id,
        title,
        description: settings.description,
        hasCloseButton: settings.hasCloseButton || true,
        duration: settings.duration || 5,
        close: () => closeToast(id),
        intent: settings.intent
      }
    },
    [toasts, idCounter]
  )

  const getToasts = () => toasts

  const closeAll = React.useCallback(
    () => getToasts().forEach(toast => toast.close()),
    [toasts]
  )

  const notify = React.useCallback(
    (title, settings) => {
      // If there's a custom toast ID passed, close existing toasts with the same custom ID
      if (hasCustomId(settings)) {
        for (const toast of toasts) {
          // Since unique ID is still appended to a custom ID, skip the unique ID and check only prefix
          if (String(toast.id).startsWith(settings.id)) {
            closeToast(toast.id)
          }
        }
      }

      const instance = createToastInstance(title, settings)

      setToasts(perv => [instance, ...perv])

      return instance
    },
    [toasts]
  )

  React.useEffect(() => {
    //@ts-ignore-next-line
    props.bindNotify(notify)
    //@ts-ignore-next-line
    props.bindGetToasts(getToasts)
    //@ts-ignore-next-line
    props.bindCloseAll(closeAll)
  }, [])

  return (
    <WrapperClass>
      {toasts.map(({id, description, ...props}) => {
        return (
          <Toast key={id} onRemove={() => removeToast(id)} {...props}>
            {description}
          </Toast>
        )
      })}
    </WrapperClass>
  )
}

export default ToastManager
