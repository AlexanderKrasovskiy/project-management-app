import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';

import {
  LoginRequestModel,
  RegisterRequestModel,
} from '../../models/auth.model';
import { AuthControlService } from '../../services/auth-control.service';
import { AuthService } from '../../services/auth.service';
import {
  generateLoginUser,
  generateNewUser,
  generatePassword,
} from '../../utils/generate.util';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegComponent implements OnInit, OnDestroy {
  @ViewChild('passwordContainer') passwordContainer!: ElementRef<HTMLElement>;

  @ViewChild('twicePasswordContainer')
  twicePasswordContainer!: ElementRef<HTMLElement>;

  regForm!: FormGroup;

  reg$: Subscription = new Subscription();

  avatar = '01';

  constructor(
    public authService: AuthService,
    private authControlService: AuthControlService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private transLoco: TranslocoService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.reg$.unsubscribe();
  }

  showAvatarChangeModalWindow(): void {
    this.authService.isAvatarSwap = true;
  }

  changeAvatar(image: string): void {
    this.avatar = image.slice(-2);
    this.authService.isAvatarSwap = false;
  }

  onRandomPassword(): void {
    const newPassword: string = generatePassword();

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    this.regForm.patchValue({
      passwordInput: newPassword,
      twicePasswordInput: newPassword,
    });

    this.regForm.controls['passwordInput'].markAsDirty();

    this.regForm.controls['twicePasswordInput'].markAsDirty();

    if (
      this.passwordContainer.nativeElement.children[0].children[0].children[0].getAttribute(
        'type',
      ) === 'password'
    ) {
      this.passwordContainer.nativeElement.children[0].children[0].children[1].dispatchEvent(
        event,
      );
    }

    if (
      this.twicePasswordContainer.nativeElement.children[0].children[0].children[0].getAttribute(
        'type',
      ) === 'password'
    ) {
      this.twicePasswordContainer.nativeElement.children[0].children[0].children[1].dispatchEvent(
        event,
      );
    }
  }

  onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(
      this.regForm.value,
      this.avatar,
    );

    const loginUser: LoginRequestModel = generateLoginUser(this.regForm.value);

    this.reg$ = this.authControlService.loginUp(newUser).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.transLoco.translate('registration.successfulRegistration'),
      });
      this.authControlService.loginInReg(loginUser).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.transLoco.translate('registration.successfulLogin'),
        });
        this.router.navigate(['boards']);
      });
    });
  }

  handleErrors(errorType: string): boolean {
    if (errorType === 'emptyName') {
      return (
        this.regForm.get('nameInput')?.errors?.['required'] &&
        (this.regForm.get('nameInput')?.dirty ||
          this.regForm.get('nameInput')?.touched)
      );
    }
    if (errorType === 'wrongLengthName') {
      return (
        (!this.regForm.get('nameInput')?.errors?.['required'] &&
          this.regForm.get('nameInput')?.errors?.['minlength']) ||
        (this.regForm.get('nameInput')?.errors?.['maxlength'] &&
          (this.regForm.get('nameInput')?.dirty ||
            this.regForm.get('nameInput')?.touched))
      );
    }
    if (errorType === 'emptyLogin') {
      return (
        this.regForm.get('loginInput')?.errors?.['required'] &&
        (this.regForm.get('loginInput')?.dirty ||
          this.regForm.get('loginInput')?.touched)
      );
    }
    if (errorType === 'wrongLengthLogin') {
      return (
        (!this.regForm.get('loginInput')?.errors?.['required'] &&
          this.regForm.get('loginInput')?.errors?.['minlength']) ||
        (this.regForm.get('loginInput')?.errors?.['maxlength'] &&
          (this.regForm.get('loginInput')?.dirty ||
            this.regForm.get('loginInput')?.touched))
      );
    }
    if (errorType === 'identicalPassword') {
      return (
        !this.regForm.get('passwordInput')?.errors?.['required'] &&
        this.regForm.errors?.['notIdenticalPassword'] &&
        (this.regForm.get('passwordInput')?.dirty ||
          this.regForm.get('passwordInput')?.touched) &&
        (this.regForm.get('twicePasswordInput')?.dirty ||
          this.regForm.get('twicePasswordInput')?.touched)
      );
    }
    if (errorType === 'emptyPassword') {
      return (
        this.regForm.get('passwordInput')?.errors?.['required'] &&
        (this.regForm.get('passwordInput')?.dirty ||
          this.regForm.get('passwordInput')?.touched)
      );
    }
    if (errorType === 'identicalTwicePassword') {
      return (
        !this.regForm.get('twicePasswordInput')?.errors?.['required'] &&
        this.regForm.errors?.['notIdenticalPassword'] &&
        (this.regForm.get('passwordInput')?.dirty ||
          this.regForm.get('passwordInput')?.touched) &&
        (this.regForm.get('twicePasswordInput')?.dirty ||
          this.regForm.get('twicePasswordInput')?.touched)
      );
    }
    if (errorType === 'emptyTwicePassword') {
      return (
        this.regForm.get('twicePasswordInput')?.errors?.['required'] &&
        (this.regForm.get('twicePasswordInput')?.dirty ||
          this.regForm.get('twicePasswordInput')?.touched)
      );
    }
    return false;
  }

  private initializeForm(): void {
    this.regForm = new FormGroup(
      {
        nameInput: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        loginInput: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
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
}
