import { Component, OnInit } from '@angular/core';
import { PublicationInterface } from 'src/app/models/publication.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MyAlertDialogComponent } from '../../../app/my-alert-dialog/my-alert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  idsarray:any[]=[];
  safeUrl: any;
  idcomp:any;
  userEmail = '';
  idCurrentUser = '';
  private path = 'Ideas/';
  newPublication: PublicationInterface = {
    id: '',
    title: '',
    description: '',
    image: '',
    file: '',
    date: new Date(),
    userId: '',
    idSaved: '',
    idUserSave: '',
    
  };
  publications: PublicationInterface[]=[];
  constructor(
    public firestoreService: FirestoreService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPublications();
    const tag = document.createElement('script');
    tag.src = '//www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.idsarray = [];
  }

  getPublications(){
    this.firestoreService.getCollection<PublicationInterface>(this.path).subscribe( res => {  // res - respuesta del observador
    this.publications = res;
    console.log('publi', res);
   });
  }
  deletePublication(idea: PublicationInterface){
    this.firestoreService.deleteDoc(this.path, idea.id);
    console.log('Borrado');
  }

  alert(idea: PublicationInterface) {
    let dialogRef = this.dialog.open(MyAlertDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        this.firestoreService.deleteDoc(this.path, idea.id);
        console.log('Borrado');
      }
    })
  }

  
  getSafeUrl(url:any, id:any){
    this.idcomp = id;
    this.idsarray.push(id);
    if(this.idsarray.includes(id)){

    }

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
    var form = document.createElement('iframe');
      form.width="100%";
      form.height="370px";
      //form.id=id;
      form.setAttribute("src", url);
      form.setAttribute("id",id);
      //document.getElementById(this.idcomp).appendChild(form);
      document.getElementById(this.idcomp)?.appendChild(form);
  }
}
