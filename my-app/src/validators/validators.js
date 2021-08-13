export const requiredField = (values) => {
  if (values) return undefined
  return 'Поле обязательно для заполнения'
}

export const maxLength = (maxLength) => (value) => {
  if (value && value.length > maxLength)
    return `Максимальная длинна ${maxLength} символов`
  return undefined
}
