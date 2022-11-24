import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
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
  public updateForm!: FormGroup;

  public upd$: Subscription = new Subscription();

  public avatar = this.authService.getUserAvatar();

  @ViewChild('passwordContainer') passwordContainer!: ElementRef<HTMLElement>;

  @ViewChild('twicePasswordContainer')
  twicePasswordContainer!: ElementRef<HTMLElement>;

  constructor(
    private authControlService: AuthControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public confirmationService: ConfirmationModalService,
    public deleteUserService: DeleteUserService,
    private translocoService: TranslocoService,
    public authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  public ngOnDestroy(): void {
    this.upd$.unsubscribe();
  }

  public showAvatarChangeModalWindow(): void {
    this.authService.isAvatarSwap = true;
  }

  public changeAvatar(image: string): void {
    this.avatar = image.slice(-2);
    this.authService.isAvatarSwap = false;
  }

  public onRandomPassword(): void {
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

  public onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(
      this.updateForm.value,
      this.avatar,
    );

    this.upd$ = this.authControlService
      .updateUser(
        parseJwt(localStorage.getItem('PlanTokenInfo') as string).userId,
        newUser,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translocoService.translate('update.successful'),
        });
        this.router.navigate(['boards']);
      });
  }

  private initializeForm(): void {
    this.updateForm = new FormGroup(
      {
        nameInput: new FormControl(this.authService.getUserName(), [
          Validators.required,
        ]),
        loginInput: new FormControl(
          JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).login,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
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
