import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationInterface } from 'src/app/models/publication.interface';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: UserInterface = {
    uid: '',
    email: '',
    name: '',
    password: '',
    rol: '',
  };
  publications: PublicationInterface[] = [];
  reports = true;
  count = 0;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    public firestoreService: FirestoreService,)
    { }

  ngOnInit(): void {
    this.getPublications();
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
      name: '',
      email: '',
      password: '',
      rol: '',
    };
  }
  getPublications(){
    const path = 'Reports/';
    this.firestoreService.getCollection<PublicationInterface>(path).subscribe( res => {  // res - respuesta del observador
    if(res){
      this.publications = res;
      this.publications.forEach(e => {
        if(e.state == 'Sin solucionar'){
          this.count += 1;
        }
      });
      
    }
    if(res.length === 0){
      this.reports = false;
    }
   });
  }
}

