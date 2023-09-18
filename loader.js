export const resolve = async (specifier, context, nextResolve) => {
  const { parentURL } = context
  const match = (String(parentURL).match(/(\?t=\d\.\d)/) || [])[0]
  const resolved = await nextResolve(specifier, context)

  if (match)
    resolved.url = resolved.url + match

  return resolved
}

export const load = async (url, context, nextLoad) => {
  const match = (String(url).match(/example.*\?t=(\d\.\d)/) || [])[1]
  const loaded = await nextLoad(url, context)

  if (match) {
    return {
      format: loaded.format,
      shortCircuit: true,
      responseURL: loaded.url,
      source: loaded.format === 'json'
        ? `{ "example": "json-${match}" }`
        : `export default { example: "js-${match}" }`
    }
  }

  return loaded
}
