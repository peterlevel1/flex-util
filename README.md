### FlexUtil

#### pure computing flex-shrink,  flex-grow
#### compitale for PC, mobile web or webView

`npm install flex-util`

#### exports.flexGrow(width, list<{ key: string, flexGrow: number, width: number }>): {Object|Null}
`flexGrow: when items width sum <= container value, or you would got null`
```javascripts:
const FlexUtil = require('flex-util')

const containerWidth = 500

const arr = [
  { key: 'item0', value: 100, flexGrow: 1 },
  { key: 'item1', value: 100, flexGrow: 1 },
  { key: 'item2', value: 100, flexGrow: 1 },
]

const obj = FlexUtil.flexGrow(containerWidth, arr)

// obj ->
// { item0: 166.66666666666666,
//   item1: 166.66666666666666,
//   item2: 166.66666666666666 }
```

#### exports.flexShrink(width, list<{ key: string, flexGrow: number, width: number }>): {Object|Null}
`flexShrink: when items width sum >= container value, or you would got null`
```javascripts:
const FlexUtil = require('flex-util')

const containerWidth = 500

const arr = [
  { key: 'item0', value: 200, flexShrink: 0 },
  { key: 'item1', value: 300, flexShrink: 0 },
  { key: 'item2', value: 200, flexShrink: 1 },
]

const obj = FlexUtil.flexShrink(containerWidth, arr)
// obj ->
// { item0: 200, item1: 300, item2: 0 }
```

### LICENSE: MIT

