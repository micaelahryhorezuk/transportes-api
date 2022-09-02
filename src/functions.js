function validate(objects, fields) {
  let isValid = true;
  if (Array.isArray(fields)) {
    fields.forEach(field => {
      objects.forEach(obj => {
        if (Object.keys(obj).indexOf(field) < 0) {
          isValid = false;
          return
        };
      })
    })
  }
  return isValid;
}

module.exports = {
  validate
}