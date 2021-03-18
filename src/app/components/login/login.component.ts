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
  idCurrentUser = '';
  errorMessage = '';
  error = false;
  success = false;
  admins: UserInterface[] = [];
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public firestoreService: FirestoreService,
  ) { 
    this.authSvc.stateAuth().subscribe(res => {
      console.log(res);
      if (res != null){
        this.idCurrentUser = res.uid;
      }
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  async onLogin(){
    try{
      const user = await this.authSvc.loginUser(this.user.email, this.user.password);
      this.errorMessage = this.authSvc.m;
      this.error = this.authSvc.e;
      if (user){
        this.success = true;
        this.errorMessage = 'Espere mientras lo redirigimos...';
        this.getUserInfo(user.email);
        this.initUser();
      }
    } catch (error){
      console.log(error);
    }
  }

  getUserInfo(email: string){ // trae info de la bd
    const path = 'Admins/';
    this.firestoreService.getCollection<UserInterface>(path).subscribe( res => {  // res - respuesta del observador
      this.admins = res;
      const infor = this.admins.filter( e => e.email == email);
      console.log(infor[0].rol);
      if(res){
        if(infor[0].rol === 'superadmin'){
          this.router.navigate(['superadmin']);
        }
        if(infor[0].rol === 'admin'){
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
