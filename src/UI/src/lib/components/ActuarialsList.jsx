import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Spacer from './Spacer'
import Actuarial from './Actuarial'
import AddItem from './AddItem'
import TextWithHelp from './TextWithHelp'
import LastChangelogMessage from './LastChangelogMessage'

const useStyles = makeStyles(theme => ({
  actuarials: {
    listStyle: 'none',
    maxWidth: '60rem',
    margin: '0 auto', // Reduce the top margin to 0.5rem
    padding: '1rem 0',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    display: 'list',
    gap: '1rem',
    justifyContent: 'center'
  },
  noActuarials: {
    textAlign: 'center'
  },
  addItem: {
    maxWidth: '60rem',
    margin: '0.5rem auto 0 auto', // Reduce the bottom margin to 0
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing(0)
  },
  helpMeItem: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingRight: theme.spacing(2)
  },
  intro: {
    maxWidth: '60rem',
    margin: '0 auto 0 auto', // Reduce the bottom margin to 0
    //padding: '1rem 0',
    display: 'list',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing(0)
  }
}))

function ActuarialsList({ actuarials, actProps, onDelete, onDetails }) {
  const classes = useStyles()
  const history = useHistory()

  const handleAddItem = () => {
    history.push({
      pathname: `/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials/create-actuarial`,
      state: { actProps: actProps }
    })
  }

  const sortedActuarials = actuarials.sort(
    (a, b) => new Date(b.startDateTimeUtc) - new Date(a.startDateTimeUtc)
  )

  // Extract Actuarial IDs from sortedActuarials
  const actuarialIds = sortedActuarials.map(act => act.actuarialId)

  return (
    <>
      <div className={classes.intro}>
        <Spacer height={3} />
        <TextWithHelp title="Add Actuarial data" />
        <Spacer height={1} />
        <Typography variant="body2" gutterBottom>
          Add Actuarial data for this profile.
        </Typography>
        <Spacer height={1} />
      </div>
      <div className={classes.addItem}>
        <AddItem withPaper onAdd={handleAddItem} isDisabled={!actProps.isProjectInDevelopment} />
      </div>
      {sortedActuarials.length > 0 ? (
        <>
          <ul className={classes.actuarials}>
            {sortedActuarials.map(actuarial => (
              <Actuarial
                key={actuarial.actuarialId}
                actuarial={actuarial}
                actProps={actProps}
                onDelete={() => onDelete(actuarial)}
                onDetails={() => onDetails(actuarial)}
              />
            ))}
          </ul>
          {/* Display the LastChangelogMessage for the most recent Actuarial at the bottom */}
          <div className={classes.actuarials}>
            <LastChangelogMessage actuarialIds={actuarialIds} />
          </div>
        </>
      ) : (
        <div className={classes.noActuarials}>
          <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
            There is no Actuarial data for this profile.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Start adding some Actuarial data above.
          </Typography>
        </div>
      )}
    </>
  )
}

export default ActuarialsList
