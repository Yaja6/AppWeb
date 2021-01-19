import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private path = 'Users/';
  users: UserInterface[] = [];
  constructor(public firestoreService: FirestoreService,) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.firestoreService.getCollection<UserInterface>(this.path).subscribe( res => {  // res - respuesta del observador
    this.users = res;
    console.log('publi', res);
   });
  }

}
