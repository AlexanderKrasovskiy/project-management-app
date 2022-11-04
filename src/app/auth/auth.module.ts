import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './pages/regisration/registration.component';
import { ApiHelpersService } from './services/api-helpers.service';
import { AuthComponent } from './components/auth/auth.component';
import { ApiControlService } from './services/api-control.service';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [RegistrationComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, TranslocoRootModule],
  providers: [ApiHelpersService, ApiControlService],
})
export class AuthModule {}
