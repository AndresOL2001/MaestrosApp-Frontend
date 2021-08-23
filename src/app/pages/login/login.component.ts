import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MaestroService } from '../../services/maestro-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {

  constructor(private fb:FormBuilder,private maestroService:MaestroService,private router:Router) { }

  miFormulario:FormGroup = this.fb.group({
    usuario:['',Validators.required],
    password:['',Validators.required]
  })

  usuarioLogin={
    nombre:'',
    password:''
  }

  
  submit(){

      this.usuarioLogin.password = this.miFormulario.controls['password'].value;
      this.usuarioLogin.nombre = this.miFormulario.controls['usuario'].value;

      console.log(this.usuarioLogin);
      this.maestroService.loginAuth(this.usuarioLogin).subscribe(resp => {
        console.log(resp);
        
        this.router.navigateByUrl('login/validar');
      },(err)=> {
        Swal.fire("Error",err.error.msg,'error');
      });
      
    }


  }


