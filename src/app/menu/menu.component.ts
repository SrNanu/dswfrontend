import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html', 
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  logout() {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
