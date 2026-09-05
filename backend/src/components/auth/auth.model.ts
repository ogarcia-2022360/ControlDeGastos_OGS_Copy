import { pool } from '../../config/database'; // Ajusta la ruta a tu conexión DB

export const findUserByEmail = async (correo: string) => {
  const res = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
  return res.rows[0];
};

export const findUserByCredentials = async (correo: string, pass: string) => {
  const res = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND password = $2', [correo, pass]);
  return res.rows[0];
};

export const createUser = async (u: any) => {
  const res = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, correo, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [u.nombre, u.apellido, u.correo, u.password]
  );
  return res.rows[0];
};

export const createGoogleUser = async (u: any) => {
  const res = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, correo, google_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [u.nombre, u.apellido, u.correo, u.google_id]
  );
  return res.rows[0];
};