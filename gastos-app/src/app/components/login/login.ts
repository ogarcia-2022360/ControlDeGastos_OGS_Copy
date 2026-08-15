import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private authService: AuthService) {}

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      alert('¡Bienvenido, ' + this.username + '! Usuario Autenticado');
      this.error = false;
    } else {
      this.error = true;
    }
  }
}