const ValidationRegex = {
  actName: /^([a-zA-Z0-9 !'-\u2122\u00AE\u00A9]*)$/, // Act Name, allows TM (™), R (®), and C (©) symbols
  positiveNumbers: /^([0-9][0-9]+|[0-9])$/, // Positive Numbers
  textField: /^(?!\s*$)[a-zA-Z0-9 .,'-]+$/, // Names, not empty or whitespace only
  label: /^[a-z0-9_]{2,}$/ // Labels
}

export default ValidationRegex
