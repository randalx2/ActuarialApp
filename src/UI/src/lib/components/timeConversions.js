import DateFnsUtils from '@date-io/date-fns'

/**
 * Generates a string that contains a more meaningful
 * presentation for the difference in two Date objects
 * @param {Date} current
 * @param {Date} previous
 */
export function getDateString(previous, current = Date.now()) {
  if (previous === undefined)
    throw new Error('Provide a date to compare to the current date and time')

  if (previous >= current) return 'Just now'

  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  function buildString(value, type) {
    return `${value} ${type}${value === 1 ? '' : 's'} ago`
  }

  if (elapsed === 0) return 'Just now'
  if (elapsed < msPerMinute) {
    return buildString(Math.round(elapsed / 1000), 'sec')
  }
  if (elapsed < msPerHour) {
    return buildString(Math.round(elapsed / msPerMinute), 'min')
  }
  if (elapsed < msPerDay) {
    return buildString(Math.round(elapsed / msPerHour), 'hour')
  }
  if (elapsed < msPerMonth) {
    return buildString(Math.round(elapsed / msPerDay), 'day')
  }
  if (elapsed < msPerYear) {
    return buildString(Math.round(elapsed / msPerMonth), 'month')
  }
  return buildString(Math.round(elapsed / msPerYear), 'year')
}

// Returns the difference in time in minutes and seconds like "3m 44s"
export function getTimeDifference(first, second) {
  if (!first || !second) return '0m 0s'
  const start = new Date(first)
  const end = new Date(second)
  if (end < start) return '0m 0s'
  const difference = Math.abs(end.getTime() - start.getTime())
  const minutes = Math.floor(difference / 60000)
  const seconds = Math.floor((difference % 60000) / 1000)
  return `${minutes}m ${seconds}s`
}

const dateFns = new DateFnsUtils()

export function formatISODate(ISOString, formatString) {
  const date = dateFns.date(ISOString)
  return dateFns.format(date, formatString)
}

// Calculate whether a date is less that 5 days away
export const isDateLessThanNDaysAway = (date, numDays) => {
  const today = new Date()
  const dateToCheck = new Date(date)
  const fiveDaysFromNow = new Date()
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + numDays)
  return dateToCheck >= today && dateToCheck <= fiveDaysFromNow
}

// Calculate whether today is after a date
export const isTodayAfterDate = date => {
  const today = new Date()
  return today > new Date(date)
}

export const getDateOnlyString = ISOString => {
  if (!ISOString) return ''
  return formatISODate(ISOString, 'd MMMM yyyy')
}

export const getDateTimeString = ISOString => {
  if (!ISOString) return ''
  return formatISODate(ISOString, 'd MMMM yyyy HH:mm')
}

export const getTimeStampAsRFC3339 = ISOString => {
  if (!ISOString) return ''
  return formatISODate(ISOString, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
}

export function getRelativeTimeString(ISOString) {
  if (ISOString === undefined) return ''
  if (ISOString === '') return ''
  return getDateString(new Date(ISOString))
}

export const getTimeStamp = ISOString => {
  if (ISOString === undefined) return ''
  if (ISOString === '') return ''
  return ISOString.replace(/[^0-9]/g, '')
}
