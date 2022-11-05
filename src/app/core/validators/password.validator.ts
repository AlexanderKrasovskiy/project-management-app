import { AbstractControl } from '@angular/forms';
import {
  PASSWORD_LENGTH,
  PASSWORD_LETTERS_BIG,
  PASSWORD_LETTERS_SMALL,
  PASSWORD_SYMBOLS,
} from 'src/app/shared/models/common.model';

export default function ValidatePassword(control: AbstractControl) {
  let length = true;
  let letters = true;
  let symbols = true;
  if (control.value.match(PASSWORD_LENGTH)) {
    length = false;
  }
  if (
    control.value.match(PASSWORD_LETTERS_BIG) &&
    control.value.match(PASSWORD_LETTERS_SMALL)
  ) {
    letters = false;
  }
  if (control.value.match(PASSWORD_SYMBOLS)) {
    symbols = false;
  }

  if (length || letters || symbols) {
    return {
      invalidLength: length,
      invalidLetters: letters,
      invalidSymbols: symbols,
    };
  }

  return null;
}
