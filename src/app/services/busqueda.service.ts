import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private httpClient:HttpClient) { }

  obtenerMaestros(termino:string){
    return this.httpClient.get( `https://maestros-apirest-node.herokuapp.com/api/busqueda/${termino}`)
    .pipe(map ( (resp:any) => resp.maestrosEncontrados));

  }

}
