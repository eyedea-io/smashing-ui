import * as React from 'react'
import styled from 'styled-components'
import {Toast, ToastModel} from './toast'
import {TransitionGroup} from 'react-transition-group'

const ToastsWrapper = styled.span`
  max-width: 560;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
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

let idCounter = 0

const ToastManager: React.FC<ToastManagerProps> = props => {
  const [toasts, setToasts] = React.useState<ToastModel[]>([])
  const closeToast = React.useCallback(
    id => {
      setToasts(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                isShown: false
              }
            : item
        )
      )
    },
    [toasts]
  )

  const removeToast = React.useCallback(id => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }, [])

  const createToastInstance = React.useCallback(
    (title, settings) => {
      const uniqueId = ++idCounter
      const id = hasCustomId(settings) ? `${settings.id}-${uniqueId}` : uniqueId

      return {
        id,
        title,
        description: settings.description,
        hasCloseButton: settings.hasCloseButton || true,
        duration: settings.duration || 5,
        close: () => closeToast(id),
        intent: settings.intent,
        isShown: true
      }
    },
    [toasts, idCounter]
  )

  const getToasts = () => toasts

  const closeAll = React.useCallback(() => {
    toasts.forEach(toast => toast.close())
  }, [toasts])

  const notify = React.useCallback(
    (title, settings) => {
      const instance = createToastInstance(title, settings)
      // If there's a custom toast ID passed, close existing toasts with the same custom ID
      if (hasCustomId(settings)) {
        setToasts([
          instance,
          ...toasts.map(item =>
            String(item.id).startsWith(settings.id)
              ? {
                  ...item,
                  isShown: false
                }
              : item
          )
        ])
      } else {
        setToasts([instance, ...toasts])
      }

      return instance
    },
    [toasts]
  )

  React.useEffect(() => {
    props.bindNotify(notify)
    props.bindGetToasts(getToasts)
    props.bindCloseAll(closeAll)
  }, [toasts])

  return (
    <ToastsWrapper>
      <TransitionGroup>
        {toasts.map(({id, description, ...props}) => (
          <Toast key={id} onRemove={() => removeToast(id)} {...props}>
            {description}
          </Toast>
        ))}
      </TransitionGroup>
    </ToastsWrapper>
  )
}

export default ToastManager
