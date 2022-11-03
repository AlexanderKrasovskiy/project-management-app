import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ApiHelpersService } from './services/api-helpers.service';
import { AuthComponent } from './components/auth/auth.component';
import { ApiControlService } from './services/api-control.service';

@NgModule({
  declarations: [LoginPageComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [ApiHelpersService, ApiControlService],
})
export class AuthModule {}
