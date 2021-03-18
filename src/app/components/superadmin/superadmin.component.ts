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

  user: UserInterface = {
    uid: '',
    email: '',
    name: '',
    password: '',
    rol: '',
  };
  errorMessage = '';
  private path = 'Admins/';
  admins: UserInterface[] = [];
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
    this.getAdmins();
  }
  async onRegister(){
    await this.authSvc.register(this.user.email, this.user.password);
    this.saveUser();
    this.initUser();
  }
  async saveUser() { // registrar usuario en la base de datos con id de auth
    this.user.rol= 'admin';
    const path = 'Admins/';
    this.user.uid = this.firestoreService.getId();
    const admin = this.admins.filter( e => e.email == this.user.email);
    if(admin.length == 0){
      this.firestoreService.createDoc(this.user, path, this.user.uid).then(res => {
        this.errorMessage = '';
      }).catch (err => {
        console.log(err);
      });
    }else{
      this.errorMessage = 'Correo electrónico ya existe';
    }
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
  logout() {
    this.fireAuth.signOut();
    this.router.navigate(['login']);
  }

  getAdmins(){
    this.firestoreService.getCollection<UserInterface>(this.path).subscribe( res => {  // res - respuesta del observador
    this.admins = res;
    });
  }
}
