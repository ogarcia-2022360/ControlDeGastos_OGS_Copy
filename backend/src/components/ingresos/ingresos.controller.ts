import { Request, Response } from 'express';
import { IngresoModel } from './ingresos.model';

export class IngresosController {
  
  // Guardar un nuevo ingreso
  static async crear(req: Request, res: Response): Promise<Response> {
    try {
      const { descripcion, monto, fecha, categoria, usuario_id } = req.body;

      if (!descripcion || !monto || !categoria) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const nuevoIngreso = await IngresoModel.guardar({
        descripcion,
        monto: Number(monto),
        fecha: fecha || new Date().toISOString().split('T')[0],
        categoria,
        usuario_id: usuario_id || 1
      });

      return res.status(201).json(nuevoIngreso);
    } catch (error) {
      console.error('Error al crear ingreso:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Obtener todos los ingresos
  static async obtenerTodos(req: Request, res: Response): Promise<Response> {
    try {
      const ingresos = await IngresoModel.listarTodos();
      return res.json(ingresos);
    } catch (error) {
      console.error('Error al obtener ingresos:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}