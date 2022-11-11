import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { UiPrimengModule } from './ui-primeng/ui-primeng.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalService } from './services/confirmation-modal.service';
import { DeleteUserService } from '../auth/services/delete-user.service';
import { ApiControlService } from '../auth/services/api-control.service';
import { ApiHelpersService } from '../auth/services/api-helpers.service';
import { MainService } from '../main/services/main.service';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    TooltipModule,
    TranslocoRootModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    TooltipModule,
    ConfirmationModalComponent,
    TranslocoRootModule,
  ], // m.b. delete
  providers: [
    ConfirmationModalService,
    DeleteUserService,
    ApiControlService,
    ApiHelpersService,
    MainService,
  ],
})
export class SharedModule {}
