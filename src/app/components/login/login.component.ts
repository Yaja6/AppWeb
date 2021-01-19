import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  user: UserInterface = {
    uid: '',
    email: '',
    password: '',
    rol: '',
  };

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  async onLogin(){
    try{
      const user = await this.authSvc.loginUser(this.user.email, this.user.password);
      if (user){
        this.getUserInfo(user.uid);
        this.initUser();
      }
    } catch (error){
      console.log(error.errorMessage);
    }
  }

  redirectUser(isVerified: boolean){
    if (isVerified){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }

  getUserInfo(uid: string){ // trae info de la bd
    const path = 'Admins';
    this.firestoreService.getDoc<UserInterface>(path, uid).subscribe( res => {
      const rol = res?.rol;
      if (rol === 'admin'){
        this.redirectUser(true);
      }else if( rol === 'superadmin'){
        this.router.navigate(['superadmin']);
        
      }
    });
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
