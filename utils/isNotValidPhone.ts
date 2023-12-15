export function isNotValidPhone(phoneNumber: string) {
  const PHONE_NUMBER_REGEX_PATTERN =
    /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})([-.\s]?)\d{3}([-.\s]?)\d{4}$/;
  if (PHONE_NUMBER_REGEX_PATTERN.test(phoneNumber)) {
    return false;
  }

  return true;
}
