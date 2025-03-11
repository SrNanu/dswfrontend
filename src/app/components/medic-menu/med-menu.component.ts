import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-med-menu',
  templateUrl: './med-menu.component.html',
  styleUrls: ['./med-menu.component.css']
})
export class MedicMenuComponent {
  constructor(private router: Router) {}
  logout() {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
