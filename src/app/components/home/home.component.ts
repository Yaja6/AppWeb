import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public firestoreService: FirestoreService,
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

}
