import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PublicationsComponent } from './components/publications/publications.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent,
  },
  {
    path: 'publications', 
    component: PublicationsComponent
  },
  {
    path: 'reports', 
    component: ReportsComponent
  },
  {
    path: 'users', 
    component: UsersComponent
  },
  {
    path: 'superadmin', 
    component: SuperadminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
