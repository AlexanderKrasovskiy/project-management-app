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
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';

import {
  LoginRequestModel,
  RegisterRequestModel,
} from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
import { generateLoginUser, generateNewUser } from '../../utils/generate.util';
// import { parseJwt } from '../../utils/parse-token.util';
// import { parseJwt } from '../../utils/parse-token.util';
// import { PasswordErrors } from 'src/app/shared/models/common.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [MessageService],
})
export class RegComponent implements OnInit, OnDestroy {
  public regForm!: FormGroup;

  public reg$: Subscription = new Subscription();

  public avatar = '_01';

  constructor(
    private apiControlService: ApiControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private translocoService: TranslocoService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.reg$.unsubscribe();
  }

  public onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(
      this.regForm.value,
      this.avatar,
    );

    const loginUser: LoginRequestModel = generateLoginUser(this.regForm.value);

    this.reg$ = this.apiControlService.loginUp(newUser).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.translocoService.translate(
          'registration.successfulRegistration',
        ),
        life: 5000,
      });
      this.apiControlService.loginInReg(loginUser).subscribe(() => {
        // this.apiControlService.getUser(parseJwt(res.token).userId).subscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translocoService.translate(
            'registration.successfulLogin',
          ),
          life: 5000,
        });
        //  setTimeout(() => {
        this.router.navigate(['boards']);
        //  }, 2000);
      });
    });
  }

  private initializeForm(): void {
    this.regForm = new FormGroup(
      {
        nameInput: new FormControl('', [Validators.required]),
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
