export const required = (value: any) => value ? undefined : 'Required'
const maxLength = (max: any) => (value: any) =>
value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength30 = maxLength(30)
export const maxLength50 = maxLength(50)
export const maxLength10 = maxLength(10)
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//     'Invalid email address' : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value) ?
//     'Really? You still use AOL for your email?' : undefined
