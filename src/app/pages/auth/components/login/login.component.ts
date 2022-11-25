import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { LoginRequestModel } from '../../models/auth.model';
import { AuthControlService } from '../../services/auth-control.service';
import { generateLoginUser } from '../../utils/generate.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;

  login$: Subscription = new Subscription();

  constructor(
    public fb: FormBuilder,
    private authControlService: AuthControlService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private translocoService: TranslocoService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }

  public onSubmit(): void {
    const loginUser: LoginRequestModel = generateLoginUser(
      this.loginForm.value,
    );
    this.login$ = this.authControlService.loginIn(loginUser).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.translocoService.translate('login.successfulLogin'),
      });
      this.router.navigate(['boards']);
    });
  }

  public handleErrors(errorType: string): boolean {
    if (errorType === 'emptyLogin') {
      return (
        this.loginForm.get('loginInput')?.errors?.['required'] &&
        (this.loginForm.get('loginInput')?.dirty ||
          this.loginForm.get('loginInput')?.touched)
      );
    }
    if (errorType === 'emptyPassword') {
      return (
        this.loginForm.get('passwordInput')?.errors?.['required'] &&
        (this.loginForm.get('passwordInput')?.dirty ||
          this.loginForm.get('passwordInput')?.touched)
      );
    }
    return false;
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({
      loginInput: new FormControl('', [Validators.required]),
      passwordInput: new FormControl('', [Validators.required]),
    });
  }
}
