import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ToastManager from './toast-manager'
import {SmashingThemeProvider} from '@smashing/theme'
import {ToastModel, ToastSettings} from './types'

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * The Toaster manages the interactions between
 * the ToasterManger and the toast API.
 */
export default class Toaster {
  private notifyHandler
  private getToastsHandler
  private closeAllHandler

  constructor() {
    if (!isBrowser) return

    const container = document.createElement('div')
    container.setAttribute('data-toaster-container', '')
    document.body.append(container)

    ReactDOM.render(
      <SmashingThemeProvider>
        <ToastManager
          bindNotify={this.bindNotify}
          bindGetToasts={this.bindGetToasts}
          bindCloseAll={this.bindCloseAll}
        />
      </SmashingThemeProvider>,
      container
    )
  }

  private bindNotify = handler => {
    this.notifyHandler = handler
  }

  private bindGetToasts = (handler: () => ToastModel[]) => {
    this.getToastsHandler = handler
  }

  private bindCloseAll = (handler: () => void) => {
    this.closeAllHandler = handler
  }

  getToasts = (): ToastModel[] => {
    return this.getToastsHandler()
  }

  closeAll = () => {
    this.closeAllHandler()
  }

  notify = (title: string, settings: ToastSettings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'none'})
  }

  success = (title: string, settings: ToastSettings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'success'})
  }

  warning = (title: string, settings: ToastSettings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'warning'})
  }

  danger = (title: string, settings: ToastSettings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'danger'})
  }
}
