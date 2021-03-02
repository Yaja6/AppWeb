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
    name: '',
    rol: '',
  };
  errorMessage = '';
  error = false;
  success = false;

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
      this.errorMessage = this.authSvc.m;
      this.error = this.authSvc.e;
      if (user){
        console.log(user.uid);
        this.getUserInfo(user.uid);
        this.initUser();
        this.errorMessage = 'Espere mientras lo redirigimos...';
        this.success = true;
      }
    } catch (error){
      console.log(error);
    }
  }


  getUserInfo(uid: string){ // trae info de la bd
    const path = 'Admins/';
    this.firestoreService.getDoc<UserInterface>(path, uid).subscribe( res => {
      if(res){
        console.log(res.rol);
        if(res.rol === 'superadmin'){
          this.router.navigate(['superadmin']);
        }
        if(res.rol === 'admin'){
          this.router.navigate(['home']);
        }
      }      
    });
  }
  initUser(){
    this.user = {
      uid: '',
      email: '',
      name: '',
      password: '',
      rol: '',
    };
  }
}
