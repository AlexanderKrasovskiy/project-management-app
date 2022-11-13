import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
// import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { UpdateComponent } from './components/update/update.component';
// import { RegComponent } from './components/reg/reg.component';
// import { RegistrationComponent } from './pages/regisration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegComponent,
  },
  {
    path: 'login',
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
