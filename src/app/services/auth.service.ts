import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }

  async loginUser(email: string, password: string){
    try{
      const {user} = await this.fireAuth.signInWithEmailAndPassword(email, password);
      // this.updateUserData(user);
      return user;
    }catch (error){
      console.log(error);
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
