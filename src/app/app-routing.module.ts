import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { ValidarComponent } from './pages/validar/validar.component';
import { OpinionComponent } from './pages/opiniones/opinion/opinion.component';
import { LoginModule } from './pages/login/login.module';

const routes: Routes = [
  {
    path:'', redirectTo:'/inicio',pathMatch:'full'
  },
   {
     path:'inicio', component:InicioComponent,
   
   },
   {
    path:'busqueda/:termino',component:BusquedaComponent
   },
   
   {
     path:'opiniones/:maestro',component:OpinionesComponent
   },
   {
     path:'opinion/:maestro',component:OpinionComponent
   },
   {
    path:'login',
    loadChildren:() => import('./pages/login/login.module').then(m=>m.LoginModule),
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
