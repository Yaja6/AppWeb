import { Component, OnInit } from '@angular/core';
import { PublicationInterface } from 'src/app/models/publication.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  idsarray:any[]=[];
  safeUrl: any;
  idcomp:any;
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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getPublications();
    this.idsarray = [];
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
      this.publications.forEach(e => {
        if(publi.id == e.id){
          e.state = 'Solucionado'
          this.firestoreService.updateDoc(e, path, e.idReport).then(res => {
            console.log('Reporte solucionado');
          }).catch (err => {
              console.log(err);
          });
        }
      });
    }else{
      publi.state = 'Sin solucionar';
    } 
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
