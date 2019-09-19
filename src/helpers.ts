export function changeString(
  handler: (value: string) => any
): (evt: any) => void {
  return evt => {
    handler(evt.target.value)
  }
}
