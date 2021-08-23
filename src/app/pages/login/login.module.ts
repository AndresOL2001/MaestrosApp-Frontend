import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ValidarComponent } from '../validar/validar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [
    LoginComponent,
    ValidarComponent,

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgxStarsModule,
  ]
})
export class LoginModule { }
