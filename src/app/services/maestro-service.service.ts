import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resultado } from '../models/maestroResponse';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  constructor(private httpClient:HttpClient) { }

  get getToken():string{
    return localStorage.getItem('token') || '' ;
 
   }

   get headers(){
    return {
      headers:{
        'x-token':this.getToken,        
      }
    }
  }

  
  obtenerMaestros(){
    return this.httpClient.get<Resultado>('https://maestros-apirest-node.herokuapp.com/api/maestros')
    .pipe(map (resp => resp.resultados));

  }

  obtenerMaestro(id:string){
    return this.httpClient.get(`https://maestros-apirest-node.herokuapp.com/api/maestros/${id}`).pipe(map( (resp:any) => resp.maestroEncontrado));
    

  }

  loginAuth(usuario:any){


    return this.httpClient.post('https://maestros-apirest-node.herokuapp.com/api/auth/login',usuario).pipe(tap ( (resp:any) => {
     // console.log(resp.token);
      localStorage.setItem('token',resp.token)
    }));
  }

 async cambiarEstadoOpinion(uid:string){
    try {
      
      const url = `https://maestros-apirest-node.herokuapp.com/api/maestros/opinion/editar/${uid}`;
      const formData = new FormData();
     
      const resp = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('token')||'',
        },
        body:formData
      });

      //console.log(resp);
      const data = await resp.json();
     return data;

    } catch (error) {
      console.log(error);
      return false;
    }
     
    
  }

  async eliminarOpinion(maestroId:string,opinionId:string){
    try {
      
      const url = `https://maestros-apirest-node.herokuapp.com/api/maestros/opinion/${maestroId}/${opinionId}`;
      const formData = new FormData();
     
      const resp = await fetch(url,{
        method:'DELETE',
        headers:{
          'x-token':localStorage.getItem('token')||'',
        },
        body:formData
      });

      //console.log(resp);
      const data = await resp.json();
     return data;

    } catch (error) {
      console.log(error);
      return false;
    }
     
    
  }

  crearOpinion(id:string,opiniones:any){
    return this.httpClient.put(`https://maestros-apirest-node.herokuapp.com/api/maestros/opinion/${id}`,opiniones);
  }

  sacarPromedio(respuesta:any[]){

    let sum = 0;

    let tamaño = 0

    for (let i = 0; i < respuesta.length; i++) {
         tamaño = respuesta[i].calificaciones.length;
         sum=0;
        for (let j = 0; j < respuesta[i].calificaciones.length; j++) {
          
           sum += respuesta[i].calificaciones[j];
        }
        let avg = sum/tamaño;
        respuesta[i].promedio = avg;
    }
    
  }

}
