import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Credenciales actualizadas exactamente como lo pediste
  private users = [
    { username: 'ADMIN', password: 'admin', role: 'admin' },
    { username: 'oliver', password: '2022360', role: 'user' }
  ];

  constructor() { }

  login(username: string, password: string): boolean {
    const foundUser = this.users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      // Creación del JWT simulado (Header.Payload.Signature)
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({ sub: username, role: foundUser.role, exp: Date.now() + (60 * 1000) }));
      const signature = "mock_sec_signature_key";
      
      const mockJwt = `${header}.${payload}.${signature}`;
      
      // Guardamos el token JWT en el almacenamiento local del navegador
      localStorage.setItem('token', mockJwt);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}