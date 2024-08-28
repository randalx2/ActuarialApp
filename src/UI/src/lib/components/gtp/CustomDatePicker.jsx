import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import FieldDisabledContext from './FieldDisabledContext'
import FieldContext from './FieldContext'

const useStyles = makeStyles(theme => ({
  datePicker: {
    marginTop: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#337d9e'
      }
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#337d9e'
      }
    }
  }
}))

function CustomDatePicker(props) {
  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)
  const {
    disabled,
    required,
    label,
    onChange,
    value,
    disablePast,
    id,
    autoOk = true,
    variant = 'inline',
    minDate,
    maxDate,
    alwaysEditable
  } = props

  const contextDisabled = useContext(FieldDisabledContext)
  const fieldDisabled = !alwaysEditable && contextDisabled(id)

  const hidden = useContext(FieldContext)
  if (hidden || props.hidden) return null

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        onClick={() => setOpen(true)}
        onClose={() => setOpen(false)}
        required={required}
        label={label}
        className={classes.datePicker}
        disabled={disabled || fieldDisabled}
        inputVariant="outlined"
        cy-data={`${id}Field`}
        onChange={onChange}
        autoOk={autoOk}
        disablePast={disablePast}
        minDate={minDate}
        maxDate={maxDate}
        value={value || null}
        InputLabelProps={{
          shrink: true
        }}
        PopoverProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        }}
        InputAdornmentProps={{
          style: {
            hidden: true
          }
        }}
        InputProps={{
          readOnly: true
        }}
        fullWidth
        disableToolbar
        variant={variant}
        format="dd/MMM/yyyy"
        open={isOpen && !(disabled || fieldDisabled)}
      />
    </MuiPickersUtilsProvider>
  )
}

export default CustomDatePicker
