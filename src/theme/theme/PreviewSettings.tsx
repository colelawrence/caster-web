import { cdn } from '@helpers'
import { Observer } from 'bloc-utils/react'
import React, { useContext } from 'react'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ThemeBloc } from './ThemeApp'
import { ThemeValue } from './ThemeSettings'

function OptionPreview({
  theme,
  image,
  name,
  price,
}: {
  theme: ThemeValue
  image: string
  price: string
  name: string
}) {
  return (
    <div
      className="option"
      style={{
        backgroundColor: theme.tileBackgroundColor,
        padding: `${theme.tilePaddingV} ${theme.tilePaddingH}`,
        margin: `${theme.tileMarginV} ${theme.tileMarginH}`,
        borderRadius: theme.tileBorderRadius,
      }}
    >
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${image})`,
          paddingBottom: theme.tileRatio,
          backgroundSize: theme.tileImageSize,
        }}
      ></div>
      <div
        className="description"
        style={{
          color: theme.tileDescriptionColor,
        }}
      >
        {name}
      </div>
      <div
        className="price"
        style={{
          color: theme.tilePriceColor,
        }}
      >
        {price}
      </div>
    </div>
  )
}

export function WidgetPreview() {
  const theme = useContext(ThemeBloc)

  return (
    <Observer
      of={combineObj(theme.inputs)}
      next={theme => {
        return (
          <div
            className="widget"
            style={{
              backgroundColor: theme.backgroundColor,
              borderRadius: theme.borderRadius,
            }}
          >
            <OptionPreview
              theme={theme}
              image={cdn('/images/shoe1-1.jpg')}
              price="250 USD"
              name="Nike Polk"
            />
            <OptionPreview
              theme={theme}
              name="NJ Dom"
              price="350 USD"
              image={cdn('/images/shoe2-1.jpeg')}
            />
            <OptionPreview
              theme={theme}
              name="Nucci"
              price="720 USD"
              image={cdn('/images/shoe3-1.jpg')}
            />
          </div>
        )
      }}
    />
  )
}

function combineObj<T extends { [key: string]: Observable<any> }>(
  obj: T
): Observable<
  {
    [P in keyof T]: T[P] extends Observable<infer R> ? R : never
  }
> {
  const obs: Observable<[string, any]>[] = []
  for (const id in obj) {
    obs.push(obj[id].pipe(map(a => [id, a])))
  }
  // @ts-ignore
  return combineLatest(...obs).pipe(
    map(obs => {
      const res = {}
      for (const [id, value] of obs) {
        res[id] = value
      }
      return res
    })
  )
}
