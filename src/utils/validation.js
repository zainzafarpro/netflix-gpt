const validation = (name, email, password) => {
  const isValidName = /([a-zA-Z0-9_\s]+)/.test(name);
  const isValidEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidName || name.length > 10) {
    return { valid: false, error: "Add valid name" };
  }

  if (!isValidEmail) {
    return { valid: false, error: "Invalid email format." };
  }
  if (!isValidPassword) {
    return {
      valid: false,
      error:
        "Password must be at least 8 characters long and include a mix of uppercase, lowercase, and numbers.",
    };
  }

  return { valid: true };
};

export default validation;
