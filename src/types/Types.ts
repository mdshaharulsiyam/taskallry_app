export enum FieldType {
  STRING = "string",
  NUMBER = "number",
  SELECT = "select",
  CHECKBOX = "checkbox",
  PASSWORD = "password",
  DATE = "date",
  TIME = "time",
  TEXTAREA = "textarea",
  RANGE = "range",
  GRIDINPUT = "gridinput",
  LOCATION = "location",
}

export enum KeyboardType {
  ASCII_CAPABLE = "ascii-capable",
  DECIMAL_PAD = "decimal-pad",
  DEFAULT = "default",
  EMAIL_ADDRESS = "email-address",
  NAME_PHONE_PAD = "name-phone-pad",
  NUMBER_PAD = "number-pad",
  NUMBERS_AND_PUNCTUATION = "numbers-and-punctuation",
  NUMERIC = "numeric",
  PHONE_PAD = "phone-pad",
  TWITTER = "twitter",
  URL = "url",
  VISIBLE_PASSWORD = "visible-password",
}

export interface FieldsType {
  name: string;
  type: FieldType;
  keyboard: KeyboardType;
  placeHolder: string;
  label: string;
  error: boolean;
  value: string | number | boolean | string[] | { min: number; max: number };
  required: boolean;
  options?: { label: string; value: string }[];
  multiple?: boolean; // for SELECT: allow multiple selection
  min?: number;       // for RANGE: lower bound
  max?: number;       // for RANGE: upper bound
  step?: number;      // for RANGE: step size
  range?: boolean;    // for RANGE: enable dual-thumb behavior
  showLabel?: boolean;
}
