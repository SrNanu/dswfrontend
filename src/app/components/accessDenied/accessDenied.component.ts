import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-access-denied',
  templateUrl: './accesDenied.component.html',
  styleUrl: './accesDenied.component.css'
  
})
export class AccessDenied{
  goBackToHome() {
    this.router.navigate(['/login']);  // Redirige a la página de login
  }
  constructor(private router: Router) {}

}
