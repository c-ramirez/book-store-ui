import { RoleGuard } from './login/guards/role.guard';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { MatchValueDirective } from './directivas/MatchValueDirective.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TokenInterceptor } from './login/interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DetalleComponent } from './catalogo/detalle/detalle.component';
import { FiltroComponent } from './filtro/filtro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './login/guards/auth.guard';
import { PaginadorComponent } from './paginador/paginador.component';
import { AuthInterceptor } from './login/interceptors/auth.interceptor';
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

const routes: Routes = [
   { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'catalogo', component: CatalogoComponent },
   { path: 'catalogo/page/:page', component: CatalogoComponent },
   { path: 'detalle/:id', component: DetalleComponent },
   { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
   { path: 'registro', component: RegistroComponent },
   { path: 'mantenimiento', children: [
         { path: '', component: MantenimientoComponent },
         { path: 'libro', children: [
            { path: '', component: LibroComponent },
            { path: 'detalle/:isbn', component: DetalleLibroComponent},
            { path: 'page/:page', component: LibroComponent}
         ]},
         { path: 'autor', children: [
            { path: '', component: AutorComponent},
            { path: 'page/:page', component: AutorComponent}
         ]},
         { path: 'categoria', children: [
            { path: '', component: CategoriaComponent},
            { path: 'page/:page', component: CategoriaComponent}
         ]}
      ], canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
   }
];
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
      CategoriaComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(routes),
      FormsModule,
      BrowserAnimationsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
