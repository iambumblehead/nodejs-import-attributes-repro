Demonstrates differences between loader-returned sources; between `import examplejs from './example.js'` and ``import examplejson from './example.json' assert { type: 'json' }`

With node v20.6+, use `npm test`

 * **for "module" type modules,** imported this way `import examplejs from './example.js'`, a loader is able to return different versions of that `'module'` to multiple import contexts (desired behaviour),
 * **for "json" type modules,** imported this way `import examplejson from './example.json' assert { type: 'json' }`, a loader is unable to return different versions of that `json'` to different import contexts and, instead, the first version appears to be cached and is returned to every subsequently-importing context (not-desired behaviour)
