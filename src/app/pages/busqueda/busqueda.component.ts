import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaestroService } from 'src/app/services/maestro-service.service';
import { BusquedaService } from '../../services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private busquedaService:BusquedaService,private rutaActiva:ActivatedRoute,private maestroService:MaestroService) { }
  
  maestros:any=[];
  
  maestrosEncontrados:any=[];
 
  calificaciones:any=[];
 
  termino:any;
  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params => {
    this.termino =params['termino'];
    this.maestrosEncontrados = [];
    this.busquedaService.obtenerMaestros(this.termino).subscribe(resp => {
      this.maestros=resp; // igualamos el arreglo de maestros con la respuesta

      console.log(this.maestros);
      
      let calificaciones=[]; // creamos un arreglo (no global) para guardar calificaciones de cada maestro
      
      for (let i = 0; i < this.maestros.length; i++) { // recorremos el arreglo de maestros
        
         calificaciones=[]; // en cada iteración ponemos las calificaciones como vacias
     
          let response = {} // en cada iteracion ponemos la respuesta como un objeto vacio

          for(let j=0;j<this.maestros[i].opiniones.length;j++){ // creamos otro ciclo for anidado para recorrer
                                                                // las opiniones de cada uno de los maestros

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

          if(Object.entries(response).length !== 0){ // Verificamos si el objeto no viene vacio
                                                     // esto en caso de que no exista ninguna opinion

            this.maestrosEncontrados.push(response); // en caso de que si tenga opiniones agregar a el 
                                           // arreglo de respuesta el objeto response
          }

          this.maestroService.sacarPromedio(this.maestrosEncontrados); // sacamos el promedio en cada respuesta
        }
        
      });
        
    });
  }

  

  volver(){
    history.go(-1);
  }


}
