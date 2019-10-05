import { Behavior } from 'bloc-utils'
import React, { createContext, useContext } from 'react'
import { createThemeSettingsBloc } from './createThemeSettingsBloc'
import { WidgetPreview } from './PreviewSettings'
import { SettingInput } from './SettingInput'
import './theme.scss'
import { THEME_SETTINGS } from './ThemeSettings'

export type Setting<T> = {
  id: T
  title: string
  description: string
  unit:
    | {
        kind: 'px'
        min: number
        max: number
      }
    | {
        kind: 'percent'
        min: number
        max: number
      }
    | {
        kind: 'color'
      }
    | {
        kind: 'choice'
        options: {
          label: string
          value: string
        }[]
      }
}

export type Settings<T> = {
  [P in keyof T]: Setting<P>
}

export interface SettingsBloc<T> {
  inputs: {
    [P in keyof T]: Behavior<any>
  }
}

export const ThemeBloc = createContext(createThemeSettingsBloc())

export function ThemeApp() {
  const theme = useContext(ThemeBloc)

  return (
    <div className="level">
      <div className="level-left">
        {Object.keys(THEME_SETTINGS).map(key => {
          const setting = THEME_SETTINGS[key] as Setting<typeof key>
          return (
            <SettingInput
              key={key}
              input={theme.inputs[key]}
              id={setting.id}
              setting={setting}
            />
          )
        })}
      </div>
      <div className="level-right">
        <WidgetPreview />
      </div>
    </div>
  )
}
