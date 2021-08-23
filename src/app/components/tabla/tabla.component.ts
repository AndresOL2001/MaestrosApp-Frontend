import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent  {

  @Input() title = 'Maestros';
  
  @Input() maestros:any=[]; // Inicializamos un arreglo de maestros
 
  
  constructor(){}
  
  
    
}
