import {
  noPassword,
  shortPassword,
  noNumber,
  noSpecialChar,
} from "./ErrorMessages.js";

const sc_regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/;

export const CreateError = (code, message) => {
  const error = new Error();
  error.message = message;
  error.code = code;
  return error;
};

export const VerifyPasswordFormat = (password) => {
  if (!password) {
    return { valid: false, error: CreateError(400, noPassword) };
  }
  if (password.length < 8) {
    return {
      valid: false,
      error: CreateError(400, shortPassword),
    };
  }
  if (
    password.split("").every((char) => {
      return isNaN(char);
    })
  ) {
    return { valid: false, error: CreateError(400, noNumber) };
  }
  if (!sc_regex.test(password)) {
    return { valid: false, error: CreateError(400, noSpecialChar) };
  }
  return { valid: true, error: null };
};
