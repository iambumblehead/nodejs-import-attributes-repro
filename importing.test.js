import test from 'node:test'
import assert from 'node:assert/strict'
import module from 'node:module'

module.register('./loader.js', {
  parentURL: import.meta.url
})

test('should return fresh source, js', async () => {
  const importOne = await import('./importing.js?t=1.1')
  const importTwo = await import('./importing.js?t=1.2')

  assert.deepEqual(importOne.JSobj, { example: 'js-1.1' })
  assert.deepEqual(importTwo.JSobj, { example: 'js-1.2' })
})

test('should return fresh source, json', async () => {
  const importOne = await import('./importing.js?t=1.1')
  const importTwo = await import('./importing.js?t=1.2')

  assert.deepEqual(importOne.JSONobj, { example: 'json-1.1' })
  assert.deepEqual(importTwo.JSONobj, { example: 'json-1.2' })
})
