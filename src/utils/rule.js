/*
  此处编写允许被搜索的数据的正则表达式。
*/
const rules = [
  /home_news/g,
  /achieve/g,
  /home_card/g,
  // /(jp|cn|en)/g // 允许所有
]

export function obj () {
  for (let rule of rules) {
    if (obj.key.match(rule)) {
      return true
    }
  }
  return false
}
