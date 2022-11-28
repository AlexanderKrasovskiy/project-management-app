import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import { LengthValidator } from 'src/app/core/validators/length.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { RegisterRequestModel } from '../../models/auth.model';
import { AuthControlService } from '../../services/auth-control.service';
import { AuthService } from '../../services/auth.service';
import { DeleteUserService } from '../../services/delete-user.service';
import { generateNewUser, generatePassword } from '../../utils/generate.util';
import { parseJwt } from '../../utils/parse-token.util';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateComponent implements OnInit, OnDestroy {
  @ViewChild('passwordContainer') passwordContainer!: ElementRef<HTMLElement>;

  @ViewChild('twicePasswordContainer')
  twicePasswordContainer!: ElementRef<HTMLElement>;

  updateForm!: FormGroup;

  upd$: Subscription = new Subscription();

  avatar = this.authService.getUserAvatar();

  constructor(
    public authService: AuthService,
    public deleteUserService: DeleteUserService,
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
    this.upd$.unsubscribe();
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

    this.updateForm.patchValue({
      passwordInput: newPassword,
      twicePasswordInput: newPassword,
    });

    this.updateForm.controls['passwordInput'].markAsDirty();

    this.updateForm.controls['twicePasswordInput'].markAsDirty();

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
      this.updateForm.value,
      this.avatar,
    );

    this.upd$ = this.authControlService
      .updateUser(
        parseJwt(
          localStorage.getItem(LocalStorageItems.PlanTokenInfo) as string,
        ).userId,
        newUser,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.transLoco.translate('update.successful'),
        });
        this.router.navigate(['boards']);
      });
  }

  handleErrors(errorType: string): boolean {
    if (errorType === 'emptyName') {
      return (
        this.updateForm.get('nameInput')?.errors?.['required'] &&
        (this.updateForm.get('nameInput')?.dirty ||
          this.updateForm.get('nameInput')?.touched)
      );
    }
    if (errorType === 'wrongLengthName') {
      return (
        !this.updateForm.get('nameInput')?.errors?.['required'] &&
        this.updateForm.get('nameInput')?.errors?.['lengthError'] &&
        (this.updateForm.get('nameInput')?.dirty ||
          this.updateForm.get('nameInput')?.touched)
      );
    }
    if (errorType === 'emptyLogin') {
      return (
        this.updateForm.get('loginInput')?.errors?.['required'] &&
        (this.updateForm.get('loginInput')?.dirty ||
          this.updateForm.get('loginInput')?.touched)
      );
    }
    if (errorType === 'wrongLengthLogin') {
      return (
        !this.updateForm.get('loginInput')?.errors?.['required'] &&
        this.updateForm.get('loginInput')?.errors?.['lengthError'] &&
        (this.updateForm.get('loginInput')?.dirty ||
          this.updateForm.get('loginInput')?.touched)
      );
    }
    if (errorType === 'identicalPassword') {
      return (
        !this.updateForm.get('passwordInput')?.errors?.['required'] &&
        this.updateForm.errors?.['notIdenticalPassword'] &&
        (this.updateForm.get('passwordInput')?.dirty ||
          this.updateForm.get('passwordInput')?.touched) &&
        (this.updateForm.get('twicePasswordInput')?.dirty ||
          this.updateForm.get('twicePasswordInput')?.touched)
      );
    }
    if (errorType === 'emptyPassword') {
      return (
        this.updateForm.get('passwordInput')?.errors?.['required'] &&
        (this.updateForm.get('passwordInput')?.dirty ||
          this.updateForm.get('passwordInput')?.touched)
      );
    }
    if (errorType === 'identicalTwicePassword') {
      return (
        !this.updateForm.get('twicePasswordInput')?.errors?.['required'] &&
        this.updateForm.errors?.['notIdenticalPassword'] &&
        (this.updateForm.get('passwordInput')?.dirty ||
          this.updateForm.get('passwordInput')?.touched) &&
        (this.updateForm.get('twicePasswordInput')?.dirty ||
          this.updateForm.get('twicePasswordInput')?.touched)
      );
    }
    if (errorType === 'emptyTwicePassword') {
      return (
        this.updateForm.get('twicePasswordInput')?.errors?.['required'] &&
        (this.updateForm.get('twicePasswordInput')?.dirty ||
          this.updateForm.get('twicePasswordInput')?.touched)
      );
    }
    return false;
  }

  private initializeForm(): void {
    this.updateForm = new FormGroup(
      {
        nameInput: new FormControl(this.authService.getUserName(), [
          Validators.required,
          LengthValidator(3, 20),
        ]),
        loginInput: new FormControl(
          JSON.parse(
            `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
          ).login,
          [Validators.required, LengthValidator(3, 30)],
        ),
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
