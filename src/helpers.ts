export function changeString(
  handler: (value: string) => any
): (evt: any) => void {
  return evt => {
    handler(evt.target.value)
  }
}
export function changeNumber(
  handler: (value: number) => any
): (evt: any) => void {
  return evt => {
    handler(Number(evt.target.value))
  }
}

export function cdn(path: string) {
  return (CDN_PREFIX + ('/' + path).replace(/\/\/+/g, '/'))
}
