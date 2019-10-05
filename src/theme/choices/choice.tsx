import React, { useState } from 'react'

export type Preview = {
  href: string
}

function CustomizeChoice({ previews }: { previews: Preview[] }) {
  const [borderRadius, setBorderRadius] = useState(5)
}
