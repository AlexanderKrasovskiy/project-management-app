import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';

export const generateNewUser = (
  formValue: {
    nameInput: string;
    loginInput: string;
    passwordInput: string;
  },
  avatar: string,
): RegisterRequestModel => ({
  name: `${formValue.nameInput}_${avatar}`,
  login: formValue.loginInput,
  password: formValue.passwordInput,
});

export const generateLoginUser = (formValue: {
  loginInput: string;
  passwordInput: string;
}): LoginRequestModel => ({
  login: formValue.loginInput,
  password: formValue.passwordInput,
});
