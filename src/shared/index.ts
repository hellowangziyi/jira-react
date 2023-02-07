export const isFalsy = (val: unknown) => (val === 0 ? false : !val)
// 判断空值 防止传参为false时出现bug
export const isVoid = (val: unknown) =>
  val === undefined || val === null || val === '' ? true : false

// 整理传参 把空值去掉
// object类型包括对象、函数以及正则表达式
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach((key: string) => {
    const val = result[key]
    if (isVoid(val)) {
      delete result[key]
    }
  })
}
