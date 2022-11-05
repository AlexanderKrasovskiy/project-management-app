import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// export default function ComparePassword(control: AbstractControl) {
//   return control.value;
// }

const ComparePassword: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('passwordInput');
  const twicePassword = control.get('twicePasswordInput');
  // console.log(1);

  return password && twicePassword && password.value !== twicePassword.value
    ? { notIdenticalPassword: true }
    : null;
};

export default ComparePassword;
