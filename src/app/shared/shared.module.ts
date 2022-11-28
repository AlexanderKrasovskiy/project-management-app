import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UiPrimengModule } from './ui-primeng/ui-primeng.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { SortingPipe } from './pipes/sorting.pipe';

import { DeleteUserService } from '../auth/services/delete-user.service';
import { AuthControlService } from '../auth/services/auth-control.service';
import { AuthApiService } from '../auth/services/auth-api.service';
import { MainService } from '../main/services/main.service';
import { TranslocoRootModule } from '../transloco-root.module';
import { ApiSearchService } from '../search/services/api-search.service';

@NgModule({
  declarations: [ConfirmationModalComponent, SortingPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    TranslocoRootModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    ConfirmationModalComponent,
    TranslocoRootModule,
    MatDialogModule,
    SortingPipe,
  ],
  providers: [
    DeleteUserService,
    AuthControlService,
    AuthApiService,
    MainService,
    ApiSearchService,
  ],
})
export class SharedModule {}
