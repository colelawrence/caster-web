import { h } from 'preact'
import { useState } from 'preact/hooks'

export type Preview = {
  href: string
}

function CustomizeChoice({ previews }: { previews : Preview[]}) {
  const [borderRadius, setBorderRadius] = useState(5)

}
