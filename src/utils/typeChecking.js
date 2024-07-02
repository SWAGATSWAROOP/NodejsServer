function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (passwordRegex.test(password)) {
    return true;
  }
  return false;
}

module.exports = { validateEmail, validatePassword };
