import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import ComparePassword from 'src/app/core/validators/compare-password.validator';
import ValidatePassword from 'src/app/core/validators/password.validator';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import {
  RegisterRequestModel,
  // LoginRequestModel,
} from '../../models/auth.model';
import { ApiControlService } from '../../services/api-control.service';
import { DeleteUserService } from '../../services/delete-user.service';
import { generateNewUser } from '../../utils/generate.util';
import { parseJwt } from '../../utils/parse-token.util';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateComponent implements OnInit {
  public updateForm!: FormGroup;

  constructor(
    private apiControlService: ApiControlService,
    private router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public confirmationService: ConfirmationModalService,
    public deleteUserService: DeleteUserService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.primengConfig.ripple = true;
  }

  public onSubmit(): void {
    const newUser: RegisterRequestModel = generateNewUser(
      this.updateForm.value,
    );

    this.apiControlService
      .updateUser(
        parseJwt(localStorage.getItem('PlanTokenInfo') as string).userId,
        newUser,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful update!',
          life: 5000,
        });
        setTimeout(() => {
          this.router.navigate(['boards']);
        }, 2000);
      });
  }

  private initializeForm(): void {
    this.updateForm = new FormGroup(
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
