import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { RegistroComponent } from './components/registro/registro';
import { IngresosComponent } from './components/ingresos/ingresos';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ingresos', component: IngresosComponent },
  { path: '**', redirectTo: '' }
];