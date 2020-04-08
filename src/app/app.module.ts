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

const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/page/:page', component: CatalogoComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'carrito', component: CarritoComponent , canActivate: [AuthGuard]},
  { path: 'registro',  component: RegistroComponent}
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
      MatchValueDirective
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
