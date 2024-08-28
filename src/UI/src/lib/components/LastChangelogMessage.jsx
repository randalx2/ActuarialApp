import React from 'react'
import { Typography, useTheme } from '@material-ui/core'
import useFetchLatestChangelogAcrossActuarials from '../hooks/api/useFetchLatestChangelogAcrossActuarials'
import { format, utcToZonedTime } from 'date-fns-tz'

// Adjust props to accept an array of Actuarial IDs
const LastChangelogMessage = ({ actuarialIds }) => {
  const theme = useTheme()
  const {
    data: lastChangelog,
    isLoading,
    isError
  } = useFetchLatestChangelogAcrossActuarials(actuarialIds)

  if (isLoading) {
    return <Typography variant="body2" color="error">
    {' '}
  </Typography>
  }

  if (isError || !lastChangelog) {
    return (
      <Typography variant="body2" color="error">
        {' '}
      </Typography>
    )
  }
 
  // Extracting and formatting the date and time
  const date = new Date(lastChangelog.modifiedDate)
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const zonedDate = utcToZonedTime(date, userTimeZone)
  
  const formattedDate = format(zonedDate, 'dd MMMM yyyy', { timeZone: userTimeZone })
  const formattedTime = format(zonedDate, 'HH:mm', { timeZone: userTimeZone })

  return (
    <Typography variant="body2">
      Last updated by{' '}
      <span style={{ color: theme.palette.primary.main }}>{lastChangelog.name}</span> on{' '}
      {formattedDate} {formattedTime}
    </Typography>
  )
}

export default LastChangelogMessage
