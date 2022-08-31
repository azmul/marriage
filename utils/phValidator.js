import bdPhone from "@0devco/bd-phone-validator";

const phoneNumberValidator = (value) => {
  const info = bdPhone(value);
  return info.core_valid && info.has_operator;
};

export { phoneNumberValidator };