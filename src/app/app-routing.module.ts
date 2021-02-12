import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PublicationsComponent } from './components/publications/publications.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { AuthguardGuard } from './guards/authguard.guard';

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
    canActivate: [AuthguardGuard],
    
  },
  {
    path: 'publications', 
    component: PublicationsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'reports', 
    component: ReportsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'users', 
    component: UsersComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'superadmin', 
    component: SuperadminComponent,
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
