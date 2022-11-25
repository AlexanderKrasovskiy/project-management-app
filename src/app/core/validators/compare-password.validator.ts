import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const ComparePassword: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('passwordInput');
  const twicePassword = control.get('twicePasswordInput');

  return password && twicePassword && password.value !== twicePassword.value
    ? { notIdenticalPassword: true }
    : null;
};

export default ComparePassword;
