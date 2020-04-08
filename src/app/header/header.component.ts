import { Router } from '@angular/router';
import swal from 'sweetalert';
import { AuthService } from './../login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  titulo = 'CRS Bookshop';
  ngOnInit() {
  }
  logout(): void {
    const username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}
