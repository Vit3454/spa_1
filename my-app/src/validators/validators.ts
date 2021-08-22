export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (values) => {
  if (values) return undefined
  return 'Поле обязательно для заполнения'
}

export const maxLength =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    if (value && value.length > maxLength)
      return `Максимальная длинна ${maxLength} символов`
    return undefined
  }
