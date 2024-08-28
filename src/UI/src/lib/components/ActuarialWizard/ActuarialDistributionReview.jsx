import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, Typography, Chip} from '@material-ui/core';
import ActTagChip from './ActTagChip';

const useStyles = makeStyles(theme => ({
  table: {
    overflowX: 'initial',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto'
    }
  },
  tableHeaderCell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableCell: {
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    textAlign: 'center'
  },
  tableContainer: {
    marginTop: theme.spacing(2.5),
    width: '100%'
  },
  clientIdChip: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    backgroundColor: '#34b468',
    color: '#fff',
    borderRadius: '5px',
  },
  clientIdHeaderCell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },  
}))

const Container = ({ withPaper, children }) =>
  withPaper ? <Paper>{children}</Paper> : <div>{children}</div>

const ActuarialDistributionReview = ({ rtpDistribution }) => {
  const classes = useStyles()
  
  const renderRtpDistribution = () =>{
    return rtpDistribution.map(item => {
      return (
        <TableRow key={item}>
        <TableCell className={classes.tableCell}>
          <Typography variant="body1">
            <ActTagChip id={item.payoutShortName} label={item.payoutShortName} isRtp/>
          </Typography>
        </TableCell>
        <TableCell className={classes.tableCell}>
          <Typography variant="body1">{item.moduleId}</Typography>
        </TableCell>
          <TableCell className={classes.tableCell}>
            {item.clientIds.map(clientId => (
              <Chip key={clientId} label={clientId} className={classes.clientIdChip} size="small"/>
            ))}
          </TableCell>
      </TableRow>
      )
    })
  }

  return (        
        <div className={classes.tableContainer}>
          <Container withPaper={true}>
          <MuiTable className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>RTP Variant</TableCell>
                <TableCell className={classes.tableHeaderCell}>Module ID</TableCell>
                <TableCell className={classes.clientIdHeaderCell}>Client Ids</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRtpDistribution()}
            </TableBody>
          </MuiTable>
          </Container>
        </div>
  )
}

export default ActuarialDistributionReview
