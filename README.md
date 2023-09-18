Demonstrates differences between loader-returned sources; between `import examplejs from './example.js'` and `import examplejson from './example.json' assert { type: 'json' }`


_psuedo-loader_
```javascript
export const load = async (url, context, nextLoad) => {
  if (url.endsWith('.js')) // imported random does change
    return {
      format: 'module',
      source: `export default { example: "js-${Math.random()}" }`
    }

  if (url.endsWith('.json')) // imported random does not change
    return {
      format: 'json',
      source: `{ "example": "json-${Math.random()}" }`
    }
}
```

With node v20.6+, use `npm test`,
 * **for "module" type modules,** imported this way `import examplejs from './example.js'`, a loader is able to return different versions of that `'module'` source to multiple import contexts (desired behaviour),
 * **for "json" type modules,** imported this way `import examplejson from './example.json' assert { type: 'json' }`, a loader is unable to return different versions of that `json'` source to different import contexts and, instead, the first version is seemingly cache-returned to any subsequently-importing context (not-desired behaviour)
