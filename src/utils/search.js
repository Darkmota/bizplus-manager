function dfs(obj, keyword, path, callback) {
  if (obj instanceof Array) {
    for (let key in obj) {
      dfs(obj[key], keyword, path === '' ? `$${key}` : `${path}.$${key}`, callback)
    }
  } else if (typeof obj === 'object') {
    for (let key in obj) {
      if (key[0] === '$') {
        dfs(obj[key], keyword, path === '' ? `$${key}` : `${path}.$${key}`, callback)
      } else {
        dfs(obj[key], keyword, path === '' ? key : `${path}.${key}`, callback)
      }
    }
  } else if (typeof obj === 'string' || typeof obj === 'number') {
    obj = String(obj)
    if (obj.indexOf(keyword) !== -1) {
      callback(path, obj)
    }
  }
}

export function search (obj, keyword, rootName) {
  let result = []
  dfs(obj, keyword, rootName || '', (key, value) => {
    let depth = key.split('.').length
    console.log(`\x1b[${31+depth === 37 ? 90 : 31+depth}m${key}\x1b[0m\t${value}`)
    result.push({key, value})
  })
  return result
}
