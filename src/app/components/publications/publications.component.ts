import { Component, OnInit } from '@angular/core';
import { PublicationInterface } from 'src/app/models/publication.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.getPublications();
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
}
