import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PasswordModule } from 'primeng/password';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
import { AuthRoutingModule } from './auth-routing.module';
// import { RegistrationComponent } from './pages/regisration/registration.component';
import { ApiHelpersService } from './services/api-helpers.service';
// import { AuthComponent } from './components/auth/auth.component';
import { ApiControlService } from './services/api-control.service';
import { TranslocoRootModule } from '../transloco-root.module';
import { RegComponent } from './components/reg/reg.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    TranslocoRootModule,
    // FormsModule,
    // ReactiveFormsModule,
    // PasswordModule,
    // InputTextModule,
    // ButtonModule,
  ],
  providers: [ApiHelpersService, ApiControlService],
})
export class AuthModule {}
