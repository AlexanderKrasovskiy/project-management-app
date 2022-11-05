import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegComponent } from './components/reg/reg.component';
// import { RegistrationComponent } from './pages/regisration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: RegComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
