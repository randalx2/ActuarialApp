import toCamelCase from 'camelcase'

const isString = value => typeof value === 'string' || value instanceof String

const isNumber = value => typeof value === 'number' || value instanceof Number

const isStringOrNumber = value => isString(value) || isNumber(value)

// Check if value is non empty and contains more than just empty spaces
const isNonEmptyString = value => /(.|\s)*\S(.|\s)*/.test(value)

// Test for a valid numerical string, e.g. -123.45, -12345, 123.45, 12345
const isValidNumber = value => /^-?\d+(\.\d+)?$/.test(value)

const matchesUrl = value => {
  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www|\.|\/)/.test(value)
}

// Tests for valid urls and double back slash
export const customUrlAndServerPrefix = value => {
  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www|\\)/.test(value)
}

export const urlValidation = value => {
  const matches = matchesUrl(value) || value === '' || !value
  return !matches ? 'Not valid' : undefined
}

export const urlOrMgsopsShare = value => {
  const matchUrl = !urlValidation(value)
  const mgsopsUrl = !!(value && value.toLowerCase().startsWith('\\\\mgsops'))

  return matchUrl || mgsopsUrl ? undefined : 'Not valid'
}

export const devShare = value => {
  const devUrl = !!(value && value.toLowerCase().startsWith('https://devdeploy'))

  return devUrl ? undefined : 'Not valid'
}

export const protectedUrlValidation = value => {
  const protectedUrl = !!(value && value.toLowerCase().startsWith('https://'))

  return protectedUrl ? undefined : 'Not valid'
}

export const required = value =>
  (isStringOrNumber(value) ? isNonEmptyString(value) : value) ? undefined : 'Required'

export const arrayNotEmpty = value =>
  value && Array.isArray(value) && value.length > 0 ? undefined : 'Must have at least one item'

export const objectNotEmpty = value => {
  return Object.keys(value || {}).length === 0 ? 'Must have at least one item' : undefined
}

export const maxLength = memo(
  max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
)

export const minLength = memo(
  min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
)

export const mgsOrderNum = value =>
  value &&
  value !== '' &&
  (value.startsWith('MGS') || value.startsWith('GGL')) &&
  value.includes('_')
    ? undefined
    : 'Not valid MGS/GGL order number (MGS####_####) or (GGL#####_#####)'

export const mgaOrderNum = value =>
  value && value !== '' && (value.startsWith('MGA-') || value.startsWith('REQ-'))
    ? undefined
    : 'Not valid MGA/REQ order number (MGA-#####) or (REQ-#####)'

export const any = () => undefined

export const contains = memo((test, isCaseSensitive = true) => input => {
  if (!input) return undefined

  const inputText = isCaseSensitive ? input : input.toLowerCase()
  const testText = isCaseSensitive ? test : test.toLowerCase()

  return !inputText.includes(testText) ? `Must include ${testText}` : undefined
})

export const doesNotContain = memo(
  test => input =>
    input && input !== '' && input.includes(test) ? `Must not include ${test}` : undefined
)

export const number = value =>
  value !== '' && !isValidNumber(value) ? 'Must be a number' : undefined

export const maxValue = memo(
  max => value => value !== '' && value > max ? `Must be ${max} or less` : undefined
)

export const greaterThanZero = value =>
  value !== '' && value <= 0 ? 'Must be greater than zero' : undefined

export const minValue = memo(
  min => value => value !== '' && value < min ? `Must be at least ${min}` : undefined
)

export const notTwitter = value => (value.startsWith('#') ? '#ThisAintTwitter' : undefined)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined

export const alphaNumericWithSpacesAndSpecialCharacters = value =>
  value && /[^a-zA-Z0-9_\- |,:.]/i.test(value)
    ? 'Only alphanumeric characters, hyphens, underscores, commas, periods or colons'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const mgsopsShare = value =>
  value && !value.toLowerCase().startsWith('\\\\mgsops')
    ? 'Not a valid MGSOPS share location'
    : undefined

export const pickupLocation = value =>
  value && value.toLowerCase().match(/(^\\\\mgsops\\)|(^http:\/\/)|(^https:\/\/)/) === null
    ? 'Not a valid MGSOPS share location'
    : undefined

export const notDiscLink = value =>
  value && isString(value) && value.toLowerCase().includes('disc.mgsops.net')
    ? 'DISC links are not valid input'
    : undefined

export const notDiskLink2 = value =>
  value && isString(value) && value.toLowerCase().includes('https://disc')
    ? 'DISC links are not valid input'
    : undefined

export const isValidJson = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return 'Invalid JSON.'
  }
  return undefined
}

export const alphaNumericWithHyphen = value =>
  value && /[^a-zA-Z0-9- ]/i.test(value) ? 'Only alphanumeric characters with hyphen' : undefined

/**
 * If the validator returns a function, you will need to memoize the function by wrapping it with
 * this function.
 * @param {Function} func function to be memoized
 */
function memo(func) {
  const memoizedFunctions = {}

  // eslint-disable-next-line func-names
  return function (...args) {
    if (args in memoizedFunctions) return memoizedFunctions[args]
    return (memoizedFunctions[args] = func.apply(this, args))
  }
}

export const version = value =>
  value && value !== '' && /(^[a-z]|[A-Z0-9])[a-z]*/.test(value)
    ? undefined
    : 'A valid version number is required - Major.Minor.Patch (eg 1.1.11)'

export const semanticVersion = value =>
  value && value !== '' && /^(\d+\.)(\d+\.)(\*|\d+)$/.test(value)
    ? undefined
    : 'A valid version number is required - Major.Minor.Patch (eg 1.1.11)'

export const fourPartVersion = value =>
  value && value !== '' && /^(\d+\.)(\d+\.)(\d+)(\.\d+-[a-zA-z]+|\.\d+|-[a-zA-Z]+)?$/.test(value)
    ? undefined
    : 'A valid version number is required - (eg 1.1.1.12)'

export const twoPartVersion = value =>
  value && /^(\d+\.)(\d+)?$/.test(value)
    ? undefined
    : 'A valid version number is required - (eg 1.0)'

export const camelCase = value =>
  value && value !== '' && value === toCamelCase(value)
    ? undefined
    : 'Camel casing is required (eg. camelCaseFormat)'

export const noWhiteSpace = value =>
  value && value !== '' && !/\s/.test(value) ? undefined : 'No white space is permitted'

export const startsWithLowerCaseOrNumber = value =>
  value && value !== '' && (/^[a-z]/.test(value) || /^[0-9]/.test(value))
    ? undefined
    : 'Must begin with a lowercase character'

export const lengthNoUnderscore = memo(
  length => value =>
    value && value.replace('_', '').length < length ? `Must be ${length} characters` : undefined
)

export const noDuplicates = value =>
  arrayNotEmpty(value) || value.length !== new Set(value).size
    ? 'Should not contain any duplicate values'
    : undefined

export const csvUniqueNumbers = value =>
  value && (!isString(value) || !value.match(/^[0-9]+(,[0-9]+)*$/))
    ? 'Required to be a comma seperated lisy of unique numbers'
    : noDuplicates(value.split(','))

export const doesNotExistInArray = memo(
  array => value => value && array.includes(value) ? 'Must not already exist' : undefined
)

export const notTestSpaceLink = value =>
  value && !value.toLowerCase().includes('http://thelab/testspace/#/detailsprojects/')
    ? 'Please enter a valid TestSpace URL'
    : undefined
