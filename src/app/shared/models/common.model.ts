export interface PasswordErrors {
  length: boolean;
  letters: boolean;
  symbols: boolean;
}

export const EMAIL_PATTERN: RegExp =
  /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;

export const URL_PATTERN: RegExp =
  /^(?:http(s)?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

export const PASSWORD_LENGTH: RegExp = /^(?=.{8,})/i;

export const PASSWORD_LETTERS: RegExp = /^(?=.[a-z])(?=.[A-Z])/i;

export const PASSWORD_LETTERS_SMALL: RegExp = /[a-z]+/g;

export const PASSWORD_LETTERS_BIG: RegExp = /[A-Z]+/g;

export const PASSWORD_NUMBERS: RegExp = /[0-9]+/g;

export const PASSWORD_SYMBOLS: RegExp =
  /^(?=.*[!@#\\$%\\^&\\*\\'()+\\,-.\\/:;<>=\\?\\_`{}~])/i;

export const PASSWORD_ALL: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\'()+\\,-.\\/:;<>=\\?\\_`{}~])(?=.{8,})/i;

export enum MessageError {
  boardNotFound = 'Board was not founded!',
}
