import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaestroService } from 'src/app/services/maestro-service.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styles: [
  ]
})
export class OpinionesComponent implements OnInit {

  constructor(private maestroService:MaestroService,private activatedRoute:ActivatedRoute) { }

  id:string=this.activatedRoute.snapshot.params.maestro;
  opiniones:any[]=[];
  maestro : any;

  ngOnInit(): void {
    this.maestroService.obtenerMaestro(this.id).subscribe( (resp:any) => {
      this.maestro=resp;
      resp.opiniones.forEach( (opinion:any) => {
        if(opinion.estado){
          this.opiniones.push(opinion);
        }
      });
      console.log(this.opiniones);
    });
  }
  volver(){
    history.go(-1);
  }

}
