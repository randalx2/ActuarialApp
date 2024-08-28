const ValidationRegex = {
  actName: /^([a-zA-Z0-9 !'-\u{2122}\u{00AE}\u{00A9}]*)$/, // Act Name, allows TM (™), R (®), and C (©) symbols
  positiveNumbers: /^([0-9][0-9]+|[0-9])$/, // Positive Numbers
  textField: /^(?!\s*$)[a-zA-Z0-9 .,'-]+$/, // Names, not empty or whitespace only
  label: /^[a-z0-9_]{2,}$/, // Labels
  //ActuarialDesc: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/ // allows special characters
  actuarialDesc: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+(\s[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+)*$/

}

export default ValidationRegex
