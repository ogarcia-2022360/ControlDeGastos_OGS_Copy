import { pool } from '../../config/database';
import jwt from 'jsonwebtoken';

export class AuthService {
  // Login tradicional con token de 2 minutos
  static async login(username: string, password: string) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '2m' }
    );

    return { token, username: user.username };
  }

  // Login con Google (Estructura base)
  static async googleLogin(idToken: string) {
    if (!idToken) {
      throw new Error('Token de Google requerido');
    }

    // Lógica para validar el token de Google
    return { message: 'Autenticación con Google en proceso' };
  }
}