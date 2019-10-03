import { cdn, changeString } from '@helpers'
import { Behavior } from 'bloc-utils'
import { Observer } from 'bloc-utils/preact'
import { createContext, h } from 'preact'
import { useContext } from 'preact/hooks'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ThemeValue, ThemeBloc } from './ThemeApp'

function PreviewTile({
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
      class="option"
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

export function PreviewSettings() {
  const theme = useContext(ThemeBloc)

  return (
    <Observer
      of={combineObj(theme.inputs)}
      next={theme => {
        return (
          <div
            class="widget"
            style={{
              backgroundColor: theme.backgroundColor,
              borderRadius: theme.borderRadius,
            }}
          >
            <PreviewTile
              theme={theme}
              image={cdn('/images/shoe1-1.jpg')}
              price="250 USD"
              name="Nike Polk"
            />
            <PreviewTile
              theme={theme}
              name="NJ Dom"
              price="350 USD"
              image={cdn('/images/shoe2-1.jpeg')}
            />
            <PreviewTile
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
