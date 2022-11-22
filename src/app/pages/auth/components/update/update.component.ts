import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import {
  RegisterRequestModel,
  // LoginRequestModel,
} from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
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

  constructor(
    private apiControlService: ApiControlService,
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
    //  this.updateLocalStorBoardImg();
  }

  public onRandomPassword(): void {
    console.log(generatePassword());
  }

  // updateLocalStorBoardImg(): void {
  //   this.mainService.updateLocalStor(this.idBoard, this.imgBoard);
  // }

  public onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(
      this.updateForm.value,
      this.avatar,
    );

    this.upd$ = this.apiControlService
      .updateUser(
        parseJwt(localStorage.getItem('PlanTokenInfo') as string).userId,
        newUser,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translocoService.translate('update.successful'),
          life: 5000,
        });
        //  setTimeout(() => {
        this.router.navigate(['boards']);
        //  }, 2000);
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
