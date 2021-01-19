import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  registrado = false;
  user: UserInterface = {
    uid: '',
    email: '',
    password: '',
    rol: '',
  };

  constructor(
    public firestoreService: FirestoreService,
    public authSvc: AuthService,
    private router: Router,
    public fireAuth: AngularFireAuth
    ) {
      this.authSvc.stateAuth().subscribe(res => {
        console.log(res);
        if (res != null){
          console.log('id ini', res.uid);
        }else{
          this.router.navigate(["/login"]);
          console.log('no log');
        }
      });
     }

  ngOnInit(): void {
  }
  async onRegister(){
    const credentials = {
      email: this.user.email,
      password: this.user.password
    };
    const res = await this.authSvc.register(credentials.email, credentials.password).catch(err => {
    });
    const id = await this.authSvc.getUid();
    this.user.uid = id;
    console.log(id);
    this.saveUser();
    this.initUser();
  }
  async saveUser() { // registrar usuario en la base de datos con id de auth
    const path = 'Admins/';
    this.user.rol= 'admin';
    this.firestoreService.createDoc(this.user, path, this.user.uid).then(res => {
      this.registrado = true;
    }).catch (err => {
      console.log(err);
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
  logout() {
    this.fireAuth.signOut();
    this.router.navigate(['login']);
  }

}
