import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
// import { PASSWORD_ALL } from 'src/app/shared/models/common.model';

import {
  LoginRequestModel,
  RegisterRequestModel,
} from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
import { AuthService } from '../../services/auth.service';
import {
  generateLoginUser,
  generateNewUser,
  generatePassword,
} from '../../utils/generate.util';
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

  public avatar = '01';

  @ViewChild('passwordContainer') passwordContainer!: ElementRef<HTMLElement>;

  @ViewChild('twicePasswordContainer')
  twicePasswordContainer!: ElementRef<HTMLElement>;

  // public passwordAll = PASSWORD_ALL;

  constructor(
    private apiControlService: ApiControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private translocoService: TranslocoService,
    public authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.reg$.unsubscribe();
  }

  public showAvatarChangeModalWindow(): void {
    this.authService.isAvatarSwap = true;
  }

  public changeAvatar(image: string): void {
    this.avatar = image.slice(-2);
    this.authService.isAvatarSwap = false;
    //  this.updateLocalStorBoardImg();
  }

  public onRandomPassword(): void {
    // console.log(generatePassword());

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
      });
      this.apiControlService.loginInReg(loginUser).subscribe(() => {
        // this.apiControlService.getUser(parseJwt(res.token).userId).subscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translocoService.translate(
            'registration.successfulLogin',
          ),
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
