import { Component, OnInit } from '@angular/core';
import { MaestroService } from 'src/app/services/maestro-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styles: [
  ]
})
export class ValidarComponent implements OnInit{

  constructor(private maestroService:MaestroService) { }
  maestros:any = [];

  opiniones:any = [];

  respuesta:any = [];

  load:boolean=false;

  ngOnInit()	: void {
    this.maestroService.obtenerMaestros().subscribe(resp => {
      
      this.maestros=resp; // igualamos el arreglo de maestros con la respuesta
      
      
      for (let i = 0; i < this.maestros.length; i++) { // recorremos el arreglo de maestros
        

          let response = {} // en cada iteracion ponemos la respuesta como un objeto vacio

          for(let j=0;j<this.maestros[i].opiniones.length;j++){ // creamos otro ciclo for anidado para recorrer
                                                                // las opiniones de cada uno de los maestros
            if(!this.maestros[i].opiniones[j]?.estado){

             
   
               response = { //Agregamos a la respuesta todo lo necesario para mostrarlo en el html
                 nombre:this.maestros[i].nombre, 
                 materia:this.maestros[i].materia,
                 maestro:this.maestros[i].uid,
                 opinion:this.maestros[i]?.opiniones[j],
              }
            }

          }

          if(Object.entries(response).length !== 0){ // Verificamos si el objeto no viene vacio
                                                     // esto en caso de que no exista ninguna opinion

            this.respuesta.push(response); // en caso de que si tenga opiniones agregar a el 
                                           // arreglo de respuesta el objeto response
          }

          
      }
     // console.log(this.respuesta);
      this.load=true;

    })
  }

  aceptar(id:any){
    this.maestroService.cambiarEstadoOpinion(id).then(resp => {
      console.log(resp);  
      
      Swal.fire('Opinion Aceptada', 'Moviendo a inicio','success')
      this.respuesta.shift();
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', err.error.msg,'error')
      
    });
  }

  rechazar(maestroId:string,opinionId:string){
    this.maestroService.eliminarOpinion(maestroId,opinionId).then(resp => {
      console.log(resp);  
      
      Swal.fire('Opinion Eliminada', 'Opinion Eliminada','error')
      this.respuesta.shift();
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', err.error.msg,'error')
      
    });
  }

}
