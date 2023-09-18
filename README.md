Demonstrates differences between loader-returned sources; between `import examplejs from './example.js'` and `import examplejson from './example.json' assert { type: 'json' }`


```javascript
import test from 'node:test'
import assert from 'node:assert'
import module from 'node:module'

module.register('./loader.js', {
  parentURL: import.meta.url
})

test('loader can return fresh source, js', async () => {
  const importOne = await import('./importing.js?t=1')
  const importTwo = await import('./importing.js?t=2')

  assert.deepEqual(importOne.JSobj, { example: 'js-1' })
  assert.deepEqual(importTwo.JSobj, { example: 'js-2' })
})

test('loader cannot return fresh source, json', async () => {
  const importOne = await import('./importing.js?t=3')
  const importTwo = await import('./importing.js?t=4')

  assert.deepEqual(importOne.JSONobj, { example: 'json-3' })
  assert.deepEqual(importTwo.JSONobj, { example: 'json-4' })
})
```

With node v20.6+, use `npm test`,
 * **for "module" type modules,** `import examplejs from './example.js'`, the loader can return different versions of that "module" source to multiple import contexts (desired behaviour),
 * **for "json" type modules,** `import examplejson from './example.json' assert { type: 'json' }`, the loader cannot return different versions of that "json" source to different import contexts and, instead, the first version is seemingly cache-returned to any subsequently-importing context (not-desired behaviour)
