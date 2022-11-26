import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function LengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.trim().length < min ||
      control.value.trim().length > max
      ? { lengthError: true }
      : null;
  };
}
