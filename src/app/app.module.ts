import { MatListModule } from '@angular/material/list';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { MatchValueDirective } from './directivas/MatchValueDirective.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DetalleComponent } from './catalogo/detalle/detalle.component';
import { FiltroComponent } from './filtro/filtro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginadorComponent } from './paginador/paginador.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material';
import { OpcionesComponent } from './mantenimiento/opciones/opciones.component';
import { LibroComponent } from './mantenimiento/libro/libro.component';
import { DetalleLibroComponent } from './mantenimiento/libro/detalle-libro/detalle-libro.component';
import { AutorComponent } from './mantenimiento/autor/autor.component';
import { CategoriaComponent } from './mantenimiento/categoria/categoria.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HeaderComponent,
      FooterComponent,
      CatalogoComponent,
      DetalleComponent,
      FiltroComponent,
      CarritoComponent,
      PaginadorComponent,
      CalificacionComponent,
      RegistroComponent,
      MatchValueDirective,
      MantenimientoComponent,
      OpcionesComponent,
      LibroComponent,
      DetalleLibroComponent,
      AutorComponent,
      CategoriaComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatListModule,
      ReactiveFormsModule,
      AppRoutingModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
