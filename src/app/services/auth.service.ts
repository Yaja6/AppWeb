import { UserInterface } from './../models/user.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  m ='';
  e = false;
  public userData$: Observable<any>;

  constructor(public fireAuth: AngularFireAuth) { 
    this.userData$ = fireAuth.authState;
  }

  async loginUser(email: string, password: string): Promise<any>{
    try{
      const {user} = await this.fireAuth.signInWithEmailAndPassword(email, password);
      if(user){
        return user;
      }   
    }catch (error){
      this.e = true;
      this.m = error.message;
      console.log(' error', this.m);
    }
  }
  async register(email: string, password: string){
    try{
      await this.fireAuth.createUserWithEmailAndPassword(email, password);
    }catch (error){
      console.log(error);
    }
  }

  logout(){
    this.fireAuth.signOut();
  }
  stateAuth(){ // estado de autenticacion
    return this.fireAuth.authState;
  }
  async getUid(){ // retorna identificador de user
    const uidUser = await this.fireAuth.currentUser;
    if (uidUser === null){
      return null;
    }else{
      return uidUser.uid;
    }
  }
 
}
