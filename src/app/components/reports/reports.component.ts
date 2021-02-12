import { Component, OnInit } from '@angular/core';
import { PublicationInterface } from 'src/app/models/publication.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  private path = 'Reports/';
  solucionado = false;
  currentUser = 'Admin';
  estado = false;
  message = '';
  reports = true;
  publications: PublicationInterface[] = [];
  publicationReported: PublicationInterface = {
    id: '',
    title: '',
    description: '',
    image: '',
    file: '',
    date: new Date(),
    userId: '',
    idReport: '',
    idUserReported: '',
    commentReport: '',
    reasonReport: '',
    userResolve: '',
  };
  constructor(
    public firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.getPublications();
  }
  getPublications(){
    this.firestoreService.getCollection<PublicationInterface>(this.path).subscribe( res => {  // res - respuesta del observador
    if(res){
      this.publications = res;
    }
    if(res.length === 0){
      this.reports = false;
      this.message = 'No existen publicaciones reportadas';
    }
    console.log('reportados', res);
   });
  }
  deletePublication(publi: PublicationInterface){
    const path = 'Ideas/';
    this.firestoreService.deleteDoc(path, publi.id);
    this.estado = true;
    this.savePublicationResolved(publi);
    this.solucionado = true;
  }
  savePublicationResolved(publi: PublicationInterface){
    const path = 'Reports/';
    publi.userResolve = this.currentUser;
    if (this.estado === true ){
      publi.state = 'Solucionado';
    }else{
      publi.state = 'Sin solucionar';
    }
    this.firestoreService.updateDoc(publi, path, publi.idReport).then(res => {
        console.log('Reporte enviado, gracias por ayudarnos :)');
      }).catch (err => {
          console.log(err);
      });
  }
}
