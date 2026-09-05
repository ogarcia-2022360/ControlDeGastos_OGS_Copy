import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Ingreso {
  id?: number;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private apiUrl = 'http://localhost:3000/api/ingresos'; // Ajusta a tu URL de backend

  constructor(private http: HttpClient) {}

  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.apiUrl).pipe(
      tap(data => localStorage.setItem('ingresos_local', JSON.stringify(data))),
      catchError(() => {
        const local = localStorage.getItem('ingresos_local');
        return of(local ? JSON.parse(local) : []);
      })
    );
  }

  addIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.apiUrl, ingreso).pipe(
      tap(nuevo => {
        const local = JSON.parse(localStorage.getItem('ingresos_local') || '[]');
        local.unshift(nuevo);
        localStorage.setItem('ingresos_local', JSON.stringify(local));
      }),
      catchError(() => {
        // Guardado local de emergencia si el backend no responde
        const local = JSON.parse(localStorage.getItem('ingresos_local') || '[]');
        const mockIngreso = { ...ingreso, id: Date.now() };
        local.unshift(mockIngreso);
        localStorage.setItem('ingresos_local', JSON.stringify(local));
        return of(mockIngreso);
      })
    );
  }
}