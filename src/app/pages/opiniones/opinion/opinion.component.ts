import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MaestroService } from '../../../services/maestro-service.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styles: [
      `#nota h5{
        display:inline;
      }`
  ]
})
export class OpinionComponent implements OnInit {

  constructor(private maestroService:MaestroService, private activatedRoute:ActivatedRoute,private router:Router) { }
  id:string=this.activatedRoute.snapshot.params.maestro;
  maestro:any;

  opinion:any;
  calificacion:any;

  body={}

  ngOnInit(): void {
    this.maestroService.obtenerMaestro(this.id).subscribe( (resp:any) => {
      this.maestro=resp;
   
    });
  
  
  }

  crearOpinion(){
    this.body={
      opiniones:{
        opinion:this.opinion || " ",
        calificacion:this.calificacion || 0,

      }
    }

    console.log(this.body);
    this.maestroService.crearOpinion(this.id,this.body).subscribe(resp => {
      Swal.fire('Opinion Creada','Su opinion a sido creada correctamente y enviada a revisión','success');
      this.router.navigate([`/opiniones/${this.id}`]);
    });
  }

  onRatingSet(calificacion:any){
    this.calificacion=calificacion*2;

  }

  volver(){
    history.go(-1);
  }

}
