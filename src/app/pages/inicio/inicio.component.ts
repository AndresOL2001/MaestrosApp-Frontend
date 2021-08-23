import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../../services/maestro-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {

  constructor(private maestroService:MaestroService) { }

  maestros:any = [];
  opiniones:any = [];
  respuesta:any = [];
  mejores:any = [];
  peores:any = [];

  ngOnInit(): void {
    this.maestroService.obtenerMaestros().subscribe(resp => {
      

      this.maestros=resp; // igualamos el arreglo de maestros con la respuesta

      console.log(this.maestros);
      
      let calificaciones=[]; // creamos un arreglo (no global) para guardar calificaciones de cada maestro
      
      for (let i = 0; i < this.maestros.length; i++) { // recorremos el arreglo de maestros
        
         calificaciones=[]; // en cada iteración ponemos las calificaciones como vacias

          let opinion = this.maestros[i]?.opiniones; // obtenemos la opinion opcionales
          this.opiniones.push(opinion);

          let response = {} // en cada iteracion ponemos la respuesta como un objeto vacio

          for(let j=0;j<this.maestros[i].opiniones.length;j++){ // creamos otro ciclo for anidado para recorrer
                                                                // las opiniones de cada uno de los maestros
            if(this.maestros[i].opiniones[j]?.estado){

              let calificacion = this.maestros[i].opiniones[j]?.calificacion; // obtenemos cada calificacion
                                                                             // de cada opinion de cada maestro
               
               calificaciones.push(calificacion); // ingresamos la calificacion al arreglo de calificaciones
   
               response = { //Agregamos a la respuesta todo lo necesario para mostrarlo en el html
                 nombre:this.maestros[i].nombre, 
                 materia:this.maestros[i].materia,
                 maestro:this.maestros[i].uid,
                 calificaciones,
                 promedio:0
              }
            }

          }

          if(Object.entries(response).length !== 0){ // Verificamos si el objeto no viene vacio
                                                     // esto en caso de que no exista ninguna opinion

            this.respuesta.push(response); // en caso de que si tenga opiniones agregar a el 
                                           // arreglo de respuesta el objeto response
          }

          this.maestroService.sacarPromedio(this.respuesta); // sacamos el promedio en cada respuesta
          
      }
      
      this.peores = this.respuesta.slice().sort((a: { promedio: number; },b: { promedio: number; })=> a.promedio-b.promedio);
      
    
      this.mejores =this.respuesta.slice().sort((a: { promedio: number; },b: { promedio: number; })=> b.promedio-a.promedio);

    })
  }



 
}
