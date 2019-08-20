import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ToastManager from './toast-manager'
import {SmashingThemeProvider} from '@smashing/theme'

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * The Toaster manages the interactions between
 * the ToasterManger and the toast API.
 */
export default class Toaster {
  notifyHandler
  getToastsHandler
  closeAllHandler

  constructor() {
    if (!isBrowser) return

    const container = document.createElement('div')
    container.setAttribute('data-toaster-container', '')
    document.body.append(container)

    ReactDOM.render(
      <SmashingThemeProvider>
        <ToastManager
          bindNotify={this._bindNotify}
          bindGetToasts={this._bindGetToasts}
          bindCloseAll={this._bindCloseAll}
        />
      </SmashingThemeProvider>,
      container
    )
  }

  _bindNotify = handler => {
    this.notifyHandler = handler
  }

  _bindGetToasts = handler => {
    this.getToastsHandler = handler
  }

  _bindCloseAll = handler => {
    this.closeAllHandler = handler
  }

  getToasts = () => {
    return this.getToastsHandler()
  }

  closeAll = () => {
    return this.closeAllHandler()
  }

  notify = (title, settings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'none'})
  }

  success = (title, settings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'success'})
  }

  warning = (title, settings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'warning'})
  }

  danger = (title, settings = {}) => {
    return this.notifyHandler(title, {...settings, intent: 'danger'})
  }
}
