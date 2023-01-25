import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SigninComponent } from './modules/authentication/signin/signin.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';

const routes: Routes = [
  {
    canLoad: [AuthGuard],
    path: 'alumnos',
    loadChildren: () => import('./modules/employees/employees.module')
      .then(mod => mod.EmployeesModule),
  },
  {
    canLoad: [AuthGuard],
    path: 'manager',
    loadChildren: () => import('./modules/manager/manager.module')
      .then(mod => mod.ManagerModule),
  },
  {
    canLoad: [AuthGuard],
    path: 'finances',
    loadChildren: () => import('./modules/finances/finances.module')
      .then(mod => mod.FinancesModule),
  },
  {
    canActivate: [AuthGuard],
    path: '',
    component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
