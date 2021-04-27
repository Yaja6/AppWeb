import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public contactForm: FormGroup;
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
      this.contactForm = this.createForm(); 
     }

  ngOnInit(): void {
    this.getAdmins();
  }

  get email() { return this.contactForm.get('email'); }
  get password() { return this.contactForm.get('password'); }

  createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
    });
  }

  onResetForm(): void {
    this.contactForm.reset();
  }

  onSaveForm(): void {
    if (this.contactForm.valid) {
      this.authSvc.register(this.user.email, this.user.password);
      this.saveUser();
      this.initUser();
      this.onResetForm();
    }
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
