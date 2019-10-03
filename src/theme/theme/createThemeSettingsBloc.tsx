import { Behavior } from 'bloc-utils'
import {
  initialTheme,
  SettingsBloc,
  ThemeValue,
  THEME_SETTINGS,
} from './ThemeApp'

export function createThemeSettingsBloc(
  value = initialTheme
): SettingsBloc<ThemeValue> {
  return {
    inputs: kvmap(
      THEME_SETTINGS,
      k => new Behavior(value[k] || initialTheme[k])
    ),
  }
}

function kvmap<T, R>(
  obj: T,
  fn: <P extends keyof T>(key: P, val: T[P]) => R
): { [P in keyof T]: R } {
  const mapped: any = {}
  for (const k in obj) {
    mapped[k] = fn(k, obj[k])
  }
  //@ts-ignore
  return mapped
}
