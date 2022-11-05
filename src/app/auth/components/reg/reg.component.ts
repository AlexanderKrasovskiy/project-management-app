import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';
import { PasswordErrors } from 'src/app/shared/models/common.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegComponent {
  public regForm!: FormGroup;

  public hide = true;

  constructor(
    // private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    if (this.regForm.valid) {
      // this.authService.setToken(
      //   this.regForm.value.loginInput,
      //   this.regForm.value.passwordInput,
      // );
      this.router.navigate(['main']);
    }
  }

  private initializeForm(): void {
    this.regForm = new FormGroup(
      {
        nameInput: new FormControl('', [Validators.required]),
        loginInput: new FormControl('', [Validators.required]),
        passwordInput: new FormControl('', [
          Validators.required,
          ValidatePassword,
        ]),
        twicePasswordInput: new FormControl('', [
          Validators.required,
          ValidatePassword,
        ]),
      },
      { validators: ComparePassword },
    );
  }

  public handleErrors(err: PasswordErrors): string {
    let message = '';
    if (err.length || err.letters || err.symbols) {
      message = `${message}Your password isn't strong enough. It should contain`;
    }
    if (err.length) message = `${message} at least 8 characters,`;
    if (err.letters)
      message = `${message} a mixture of both uppercase and lowercase letters,`;
    if (err.symbols)
      message = `${message} inclusion of at least one special character, e.g., ! @ # ? ]`;
    return message;
  }
}
