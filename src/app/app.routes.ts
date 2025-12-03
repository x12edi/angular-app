import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { LayoutComponent } from './layout/layout';
import { DashboardComponent } from './dashboard/dashboard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', loadComponent: () => import('./users/users/users').then(m => m.UsersComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings').then(m => m.Settings) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
