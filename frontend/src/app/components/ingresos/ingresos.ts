import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IngresoService, Ingreso } from '../../services/ingreso.service';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class IngresosComponent implements OnInit {
  ingresos: Ingreso[] = [];
  ingresosFijos: Ingreso[] = [];
  ingresosExtras: Ingreso[] = [];
  totalIngresos: number = 0;

  mostrarModal: boolean = false;
  nuevaCategoria: string = 'fijo';
  nuevaDescripcion: string = '';
  nuevoMonto: number | null = null;

  constructor(private ingresoService: IngresoService) {}

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos(): void {
    this.ingresoService.getIngresos().subscribe({
      next: (data) => {
        this.ingresos = data || [];
        this.ingresosFijos = this.ingresos.filter(i => i.categoria === 'fijo');
        this.ingresosExtras = this.ingresos.filter(i => i.categoria === 'extra');
        this.totalIngresos = this.ingresos.reduce((sum, item) => sum + Number(item.monto), 0);
      },
      error: (err) => console.error('Error al cargar ingresos:', err)
    });
  }

  abrirModal(categoria: string): void {
    this.nuevaCategoria = categoria;
    this.nuevaDescripcion = '';
    this.nuevoMonto = null;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.nuevaDescripcion = '';
    this.nuevoMonto = null;
  }

  guardarIngreso(): void {
    if (!this.nuevaDescripcion.trim() || !this.nuevoMonto || this.nuevoMonto <= 0) {
      alert('Por favor ingresa una descripción y un monto válido.');
      return;
    }

    const nuevo: Ingreso = {
      descripcion: this.nuevaDescripcion.trim(),
      monto: Number(this.nuevoMonto),
      fecha: new Date().toISOString().split('T')[0],
      categoria: this.nuevaCategoria
    };

    this.ingresoService.addIngreso(nuevo).subscribe({
      next: () => {
        this.cargarIngresos();
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error guardando ingreso:', err);
        this.cerrarModal();
      }
    });
  }
}