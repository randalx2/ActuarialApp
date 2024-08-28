import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '../components/Modal'
import FormHeader from '../components/gtp/FormHeader'
import TreatmentsTable from '../components/ActuarialWizard/TreatmentsTable'

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(0)
  },
  heading: {
    marginBottom: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  label: {
    fontWeight: 'bold'
  },
  btn: {
    marginTop: theme.spacing(2)
  },
  details: {
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.type === 'dark' ? '#424242' : '#ffffff',
    color: theme.palette.type === 'dark' ? '#fff' : '#000'
  },
  variants: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2) // Added left and right padding
  },
  //Custom GTP Table styles
  table: {
    overflowX: 'initial',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto'
    }
  },
  noRowsText: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textAlign: 'center'
  },
  toolbar: {
    height: 'auto',
    padding: theme.spacing(0.5)
  },
  caption: {
    paddingRight: theme.spacing(1)
  },
  flex: {
    display: 'flex'
  },
  component: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: 'auto'
  },
  tableHeaderCell: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center' // Center align the header cells
  },
  tableCell: {
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'center' // Center align the content cells
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  tableContainer: {
    marginTop: '20px',
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width: '100%'
  },
  detailsSection: {
    padding: theme.spacing(2)
  },
  reviewLabel: {
    fontWeight: 'bold',
    marginRight: '10px',
    minWidth: '130px'
  },
  reviewValue: {
    wordBreak: 'break-all'
  }
}))

const Container = ({ withPaper, children }) =>
  withPaper ? <Paper>{children}</Paper> : <div>{children}</div>

function ActuarialDetails({ actuarial, onClose }) {
  const classes = useStyles()
  
  if (!actuarial) {
    return <CircularProgress />
  }

  return (
    <Modal onClose={onClose}>
      <main className={classes.main}>
        <div className={classes.variants}>
          <div className={classes.tableContainer}>
            <FormHeader variant="h3" title="Actuarial details" />
            <Container withPaper={true}>
              <div className={classes.detailsSection}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body1" className={classes.reviewLabel}>
                      Actuarial label:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" className={classes.reviewValue}>
                      {actuarial.label}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body1" className={classes.reviewLabel}>
                      Actuarial Type:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" className={classes.reviewValue}>
                      {actuarial.actuarialType}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body1" className={classes.reviewLabel}>
                      Actuarial description:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" className={classes.reviewValue}>
                      {actuarial.description}
                    </Typography>
                  </Grid>
                </Grid>

                

                
              </div>
            </Container>
          </div>
        </div>

        {/* Actuarial treatments section */}
        <div className={classes.variants}>
          <div className={classes.tableContainer}>
            <FormHeader variant="h3" title="Actuarial treatment details" />
            <Container withPaper={true}>
              <TreatmentsTable variantList={actuarial.variants} enableDelete={false} />
            </Container>
          </div>
        </div>
      </main>
    </Modal>
  )
}

export default ActuarialDetails
