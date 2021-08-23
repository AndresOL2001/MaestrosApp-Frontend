import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TablaComponent } from './components/tabla/tabla.component';
import { NgxStarsModule } from 'ngx-stars';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { OpinionComponent } from './pages/opiniones/opinion/opinion.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    InicioComponent,
    NavbarComponent,
    TarjetaComponent,
    BusquedaComponent,
    OpinionesComponent,
    OpinionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStarsModule,
    ReactiveFormsModule,
    FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
