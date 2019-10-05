import { changeString } from '@helpers'
import { Behavior } from 'bloc-utils'
import { Observer } from 'bloc-utils/react'
import React from 'react'
import { Setting } from './ThemeApp'

export function SettingInput(props: {
  id: string
  input: Behavior<string>
  setting: Setting<string>
}) {
  const id = props.id
  const unit = props.setting.unit
  return (
    <fieldset>
      <label htmlFor={id}>{props.setting.title}</label>
      <br />
      {unit.kind === 'px' ? (
        <Observer
          of={props.input}
          next={val => (
            <div>
              <span style={{ width: '3rem', display: 'inline-block' }}>
                {val}
              </span>
              <input
                id={id}
                type="range"
                min={unit.min}
                max={unit.max}
                value={val.slice(0, -2)}
                onInput={changeString(str => props.input.next(str + 'px'))}
              />
            </div>
          )}
        />
      ) : unit.kind === 'color' ? (
        <Observer
          of={props.input}
          next={val => (
            <input
              id={id}
              type="color"
              value={val}
              onInput={changeString(str => props.input.next(str))}
            />
          )}
        />
      ) : unit.kind === 'percent' ? (
        <Observer
          of={props.input}
          next={val => (
            <div>
              <span style={{ width: '3rem', display: 'inline-block' }}>
                {val}
              </span>
              <input
                id={id}
                type="range"
                min={unit.min}
                max={unit.max}
                value={val.slice(0, -1)}
                onInput={changeString(str => props.input.next(str + '%'))}
              />
            </div>
          )}
        />
      ) : unit.kind === 'choice' ? (
        <Observer
          of={props.input}
          next={val => (
            <div>
              {unit.options.map(opt => (
                <div>
                  <input
                    type="radio"
                    id={props.id + opt.value}
                    name={props.id}
                    checked={opt.value === val}
                    onClick={() => props.input.next(opt.value)}
                  />
                  <label htmlFor={props.id + opt.value}>{opt.label}</label>
                </div>
              ))}
            </div>
          )}
        />
      ) : null}
    </fieldset>
  )
}
