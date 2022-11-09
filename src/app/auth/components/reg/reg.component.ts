import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';

import {
  LoginRequestModel,
  RegisterRequestModel,
} from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
import { generateLoginUser, generateNewUser } from '../../utils/generate.util';
import { parseJwt } from '../../utils/parse-token.util';
// import { parseJwt } from '../../utils/parse-token.util';
// import { PasswordErrors } from 'src/app/shared/models/common.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [MessageService],
})
export class RegComponent implements OnInit {
  public regForm!: FormGroup;

  constructor(
    private apiControlService: ApiControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  public onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(this.regForm.value);

    const loginUser: LoginRequestModel = generateLoginUser(this.regForm.value);

    this.apiControlService.loginUp(newUser).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successful registration!',
        life: 5000,
      });
      this.apiControlService.loginIn(loginUser).subscribe((res) => {
        this.apiControlService
          .getUser(parseJwt(res.token).userId)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successful login!',
              life: 5000,
            });
            setTimeout(() => {
              this.router.navigate(['boards']);
            }, 2000);
          });
      });
    });
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
}
