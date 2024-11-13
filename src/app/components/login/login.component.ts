import {  Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router) {}

  submit() {
    if (this.form.valid) {
      console.log(this.form.value); // Aca tendriamos que validar la contraseña y el usuario
      this.router.navigate(['/sel-job']);
    }
  }


}
