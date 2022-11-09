import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
// import { ApiHelpersService } from './services/api-helpers.service';
// import { ApiControlService } from './services/api-control.service';
import { TranslocoRootModule } from '../transloco-root.module';
import { SharedModule } from '../shared/shared.module';
import { RegComponent } from './components/reg/reg.component';
import { LoginComponent } from './components/login/login.component';
// import { UpdateComponent } from './components/update/update.component';
// import { DeleteUserService } from './services/delete-user.service';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  declarations: [RegComponent, LoginComponent, UpdateComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, TranslocoRootModule],
  providers: [],
})
export class AuthModule {}
