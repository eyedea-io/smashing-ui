import * as React from "react"


export interface SpinnerProps {
  /**
     * Delay after which spinner should be visible.
     */
    delay?:number,

    /**
     * The size of the spinner.
     */
    size: number
     /**
     * The color of the spinner.
     */
    color?: string
}

export interface SpinnerCircleProps {
     /**
     * The color of the spinner.
     */
    color: string
}