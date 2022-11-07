import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';

export const generateNewUser = (formValue: {
  nameInput: string;
  loginInput: string;
  passwordInput: string;
}): RegisterRequestModel => ({
  name: formValue.nameInput,
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
