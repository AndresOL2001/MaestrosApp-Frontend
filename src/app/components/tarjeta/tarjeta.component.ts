import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent  {

  constructor() { }

  @Input() maestro:any=[];
  @Input() tipo:any;
  

  
}
