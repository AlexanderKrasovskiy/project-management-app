import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './core/container/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./welcome/welcome.module').then((module) => module.WelcomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./search/search.module').then((module) => module.SearchModule),
  },
  {
    path: 'boards',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/main.module').then((module) => module.MainModule),
  },
  {
    path: 'boards/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./details/details.module').then((m) => m.DetailsModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
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
