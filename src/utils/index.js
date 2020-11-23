const validData = (data, required = false) => {
  let control = true
  if (data) {
    control = (control && data.identification < 9999999999 && data.identification > 0)
    control = (control && data.fullname !== '')
    control = (control && String(data.type_identification).length === 2)
  } else {
    control = required ? false : true
  }
  return control
}

module.exports = {
  validData
}