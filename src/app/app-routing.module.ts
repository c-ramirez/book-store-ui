import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './login/interceptors/auth.interceptor';
import { TokenInterceptor } from './login/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './login/guards/role.guard';
import { CategoriaComponent } from './mantenimiento/categoria/categoria.component';
import { AutorComponent } from './mantenimiento/autor/autor.component';
import { DetalleLibroComponent } from './mantenimiento/libro/detalle-libro/detalle-libro.component';
import { LibroComponent } from './mantenimiento/libro/libro.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './login/guards/auth.guard';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleComponent } from './catalogo/detalle/detalle.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/page/:page', component: CatalogoComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'mantenimiento', children: [
      { path: '', component: MantenimientoComponent },
      {
        path: 'libro', children: [
          { path: '', component: LibroComponent },
          { path: 'detalle/:isbn', component: DetalleLibroComponent },
          { path: 'page/:page', component: LibroComponent }
        ]
      },
      {
        path: 'autor', children: [
          { path: '', component: AutorComponent },
          { path: 'page/:page', component: AutorComponent }
        ]
      },
      {
        path: 'categoria', children: [
          { path: '', component: CategoriaComponent },
          { path: 'page/:page', component: CategoriaComponent }
        ]
      }
    ], canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  { path: '**' , component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
