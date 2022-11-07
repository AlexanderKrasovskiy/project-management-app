import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { LoginComponent } from './auth/components/login/login.component';
// import { RegComponent } from './auth/components/reg/reg.component';
import { AuthGuard } from './core/guards/auth.guard';

import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  // {
  //   path: 'registration',
  //   component: RegComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },

  {
    path: 'boards',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/main.module').then((module) => module.MainModule),
  },
  {
    path: 'boards/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
