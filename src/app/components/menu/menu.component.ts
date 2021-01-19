import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: UserInterface = {
    uid: '',
    email: '',
    password: '',
    rol: '',
  };
  constructor(
    private authSvc: AuthService,
    private router: Router)
    { }

  ngOnInit(): void {
  }

  goReports(){
    this.router.navigate(["/reports"]);
  }
  goPublications(){
    this.router.navigate(["/publications"]);
  }
  goHome(){
    this.router.navigate(["/home"]);
  }
  goUsers(){
    this.router.navigate(["/users"]);
  }
  logout() {
    this.authSvc.logout();
    this.initUser();
    this.router.navigate(['/login']);
  }
  initUser(){
    this.user = {
      uid: '',
      email: '',
      password: '',
      rol: '',
    };
  }
}

