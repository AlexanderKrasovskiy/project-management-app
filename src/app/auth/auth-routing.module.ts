import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    canActivate: [NoAuthGuard],
    component: RegComponent,
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'update',
    canActivate: [AuthGuard],
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
