import { db } from '../../config/database'; // Importa tu conexión de base de datos

export interface IIngreso {
  id?: number;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
  usuario_id: number | string;
}

export class IngresoModel {

  static async guardar(data: IIngreso): Promise<IIngreso> {
    const query = `
      INSERT INTO ingresos (descripcion, monto, fecha, categoria, usuario_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    // Si estás usando MySQL2 / promise pool
    const [result]: any = await db.execute(query, [
      data.descripcion,
      data.monto,
      data.fecha,
      data.categoria,
      data.usuario_id
    ]);

    return { id: result.insertId, ...data };
  }

  static async listarTodos(): Promise<IIngreso[]> {
    const query = 'SELECT * FROM ingresos ORDER BY id DESC';
    const [rows]: any = await db.execute(query);
    return rows as IIngreso[];
  }
}