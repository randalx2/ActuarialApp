import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

const useDefaultStyles = makeStyles(theme => ({
  table: {
    overflowX: 'initial',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto'
    }
  },
  tableHeaderCell: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableCell: {
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'center'
  },
  descriptionCell: {
    wordBreak: 'break-word', // Enable text wrapping within the cell
    textAlign: 'center' // Optional: Align text to left for better readability
  }
}))

const TreatmentsTable = ({ variantList, handleVariantListRemove, classes, enableDelete }) => {
  const defaultClasses = useDefaultStyles()
  const finalClasses = { ...defaultClasses, ...classes }

  return (
    <MuiTable className={finalClasses.table}>
      <TableHead>
        <TableRow>
          <TableCell className={finalClasses.tableHeaderCell}>Label</TableCell>
          <TableCell className={`${finalClasses.tableHeaderCell} ${finalClasses.descriptionCell}`}>
            Description
          </TableCell>
          <TableCell className={finalClasses.tableHeaderCell}>Pick probability</TableCell>
          <TableCell className={finalClasses.tableHeaderCell}>Is act default</TableCell>
          {enableDelete && handleVariantListRemove && (
            <TableCell className={finalClasses.tableHeaderCell}>Action</TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {variantList.map((item, index) => (
          <TableRow key={index}>
            <TableCell className={finalClasses.tableCell}>
              <Typography variant="body1">{item.label}</Typography>
            </TableCell>
            <TableCell className={`${finalClasses.tableCell} ${finalClasses.descriptionCell}`}>
              <Typography
                className={`${finalClasses.tableCell} ${finalClasses.descriptionCell}`}
                variant="body1">
                {item.description}
              </Typography>
            </TableCell>
            <TableCell className={finalClasses.tableCell}>
              <Typography variant="body1">{item.pickProbabilityPercent}</Typography>
            </TableCell>
            <TableCell className={finalClasses.tableCell}>
              <Typography variant="body1">{item.isControl ? 'Yes' : 'No'}</Typography>
            </TableCell>
            {enableDelete && handleVariantListRemove && (
              <TableCell className={finalClasses.tableCell}>
                <Typography variant="body1">
                  <IconButton onClick={() => handleVariantListRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Typography>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  )
}

export default TreatmentsTable
