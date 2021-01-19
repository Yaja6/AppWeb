import { FirestoreService } from './../services/firestore.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authSvc: AuthService, public router: Router, private firestoreService: FirestoreService) {

  }
  canActivate(): boolean {
    this.authSvc.stateAuth().subscribe(res => {
      console.log(res);
      if (!res){
        this.router.navigate(['login']);
        return false;
      }else{
        return true;
      }
    });
    
  }

  // tslint:disable-next-line:typedef

}
