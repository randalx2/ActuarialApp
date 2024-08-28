import React from 'react'
import { TextField } from '@material-ui/core'
import { useDebouncedCallback } from 'use-debounce'
import ValidationAdornment from './ValidationAdornment'
import FieldDisabledContext from './FieldDisabledContext'

export function TextInputAsync(props) {
  const {
    input,
    validation,
    required,
    autoFocus,
    label,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    spellCheck,
    meta: { touched, asyncValidating, error, pristine },
    id,
    helperText,
    inputProps
  } = props

  const fieldRef = React.useRef(null)
  React.useEffect(() => {
    if (!fieldRef.current) return
    fieldRef.current.value = props.input.value
  }, [props.input.value])

  const debouncedCallback = useDebouncedCallback(value => {
    props.input.onChange(value.trim())
  }, 500)

  const handleBlur = value => {
    props.input.onBlur(value.trim())
  }

  const hasValidation = validation !== undefined && touched
  const hasError = error !== undefined && hasValidation
  const contextDisabled = React.useContext(FieldDisabledContext)

  return (
    <div>
      <TextField
        margin="normal"
        variant="outlined"
        cy-data={`${id}Field`}
        fullWidth
        disabled={contextDisabled(id)}
        label={label}
        helperText={hasError ? helperText : undefined}
        error={hasError}
        inputRef={fieldRef}
        defaultValue={input.value}
        onChange={e => debouncedCallback.callback(e.target.value)}
        onBlur={e => (pristine ? null : handleBlur(e.target.value))}
        required={required}
        autoFocus={autoFocus}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          ...inputProps,
          autoComplete,
          autoCorrect,
          autoCapitalize,
          spellCheck,
          endAdornment: hasValidation ? (
            <ValidationAdornment isLoading={asyncValidating} hasError={hasError} />
          ) : undefined
        }}
      />
    </div>
  )
}

function CustomTextInputField(props) {
  const {
    id,
    label,
    validation,
    required,
    autoFocus,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    spellCheck,
    onChange,
    onBlur,
    value,
    error,
    helperText,
    inputProps
  } = props

  const [touched, setTouched] = React.useState(false) // Add state for tracking user interaction

  const input = {
    onChange: value => {
      setTouched(true) // Set touched to true on change
      onChange(value)
    },
    onBlur: value => {
      setTouched(true) // Set touched to true on blur
      onBlur(value)
    },
    value
  }

  const meta = {
    touched,
    asyncValidating: false,
    error: error,
    pristine: true
  }

  return (
    <TextInputAsync
      id={id}
      label={label}
      type="text"
      input={input}
      validate={validation}
      validation={validation}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      spellCheck={spellCheck}
      meta={meta}
      helperText={helperText}
      inputProps={inputProps}
    />
  )
}

export default CustomTextInputField
