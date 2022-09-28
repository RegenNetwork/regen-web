import { Bech32Address } from '@keplr-wallet/cosmos';

export const requiredMessage: string = 'This field is required';
export const invalidEmailMessage: string = 'Please enter a valid email address';
export const invalidPassword: string =
  'Your password must contain at least 1 letter, 1 number, 1 special character (!@#$%^&*) and at least 8 characters';
export const requirementAgreement: string = 'You must agree to continue';
export const invalidAmount: string = 'Please enter a valid amount';
export const insufficientCredits: string = `You don't have enough credits`;
export const invalidDate: string = `Invalid date`;
export const invalidPastDate: string = `Must be a date in the past`;
export const invalidURL: string = `Please enter a valid URL`;
export const invalidVCSRetirement: string = `Please enter a valid VCS retirement serial number`;
export const invalidVCSID: string = `Please enter a valid VCS Project ID`;
export const invalidJSON: string = 'Please enter valid JSON-LD';
export const invalidAddress: string = 'Invalid address';
export const invalidRegenAddress: string = 'Invalid regen address';
export const MAX_FRACTION_DIGITS: number = 6; // useful for conversion to micro udenom (BigInt)
export const requiredDenom: string = 'Please choose a denom';

export const numericOnlyRE = /^\d*$/gm;

// RegEx based on https://verra.org/wp-content/uploads/2020/09/VCU-Serial-Number-Help-Format.pdf
// TODO: it is possible to do additional validation to make sure dates and project ID match serial number. See link above.
export const vcsRetirementSerialRE =
  /^(\d{1,}-\d{1,999999999999999}-\d{1,999999999999999}-(((VCS|JNR)-VCU)|VCU)-\d{3}-[A-Z]{3}-[A-Z]{2}-\d{2}-\d*-\d{8}-\d{8}-(0|1))$/gm;

export function validateEmail(email: string): boolean {
  return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/i.test(
    email,
  );
}

export function validatePassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }

  const hasUpperCase: boolean = /[A-Z]/.test(password);
  const hasLowerCase: boolean = /[a-z]/.test(password);
  const hasNumber: boolean = /\d/.test(password);
  const hasSpecialCharacter: boolean = /[!@#$%^&*]+/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
}

export function validateAmount(
  availableTradableAmount: number,
  amount?: number,
  customInsufficientCredits?: string,
  zeroAllowed?: boolean,
): string | undefined {
  if (zeroAllowed && (amount === 0 || (amount && Math.sign(amount) === 0)))
    return;
  if (!amount) {
    return requiredMessage;
  } else if (Math.sign(amount) !== 1) {
    return invalidAmount;
  } else if (amount > availableTradableAmount) {
    return customInsufficientCredits || insufficientCredits;
  }
  return;
}

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function isValidAddress(value: string, prefix?: string): boolean {
  try {
    // throws an error if the address is invalid
    Bech32Address.validate(value, prefix);
    return true;
  } catch (error) {
    return false;
  }
}

export function validatePrice(
  price?: number,
  maximumFractionDigits?: number,
): string | undefined {
  if (!price) {
    return requiredMessage;
  }
  const priceDecimalPlaces = price?.toString().split(/\.|,/)?.[1]?.length;
  maximumFractionDigits = maximumFractionDigits || MAX_FRACTION_DIGITS;
  if (!!priceDecimalPlaces && priceDecimalPlaces > maximumFractionDigits) {
    return `Maximum ${maximumFractionDigits} decimal places`;
  }
  return;
}
