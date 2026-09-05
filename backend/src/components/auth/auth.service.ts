import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import * as authModel from './auth.model';

<<<<<<< HEAD
export class AuthService {
  
  static async login(username: string, password: string) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1 AND password = $2',
      [username, password]
    );
=======
const GOOGLE_CLIENT_ID = '630272977099-h5ctj2d41qlhigj3ll9ai3enpbq1o812.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env['JWT_SECRET'] || 'clave_secreta_prueba';
>>>>>>> ae14cfe (feat: ajustes en login, API de Google y vistas)

export const registerUser = async (data: any) => {
  const existing = await authModel.findUserByEmail(data.correo);
  if (existing) throw new Error('El correo ya está registrado');

  const newUser = await authModel.createUser(data);
  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '2m' });
  return { token, usuario: newUser };
};

// Verifica que el nombre exacto sea loginUser
export const loginUser = async (credentials: any) => {
  const user = await authModel.findUserByCredentials(credentials.correo, credentials.password);
  if (!user) throw new Error('Credenciales inválidas');

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2m' });
  return { token, usuario: user };
};

export const authenticateWithGoogle = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw new Error('Token de Google inválido');

  const { sub: google_id, email, given_name, family_name, name } = payload;
  let user = await authModel.findUserByEmail(email);

  if (!user) {
    user = await authModel.createGoogleUser({
      nombre: given_name || name || 'Usuario',
      apellido: family_name || 'Google',
      correo: email,
      google_id,
    });
  }

<<<<<<< HEAD
  // Login con Google
  static async googleLogin(idToken: string) {
    if (!idToken) {
      throw new Error('Token de Google requerido');
    }

    // validar el token de Google
    return { message: 'Autenticación con Google en proceso' };
  }
}
=======
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2m' });
  return { token, usuario: user };
};
>>>>>>> ae14cfe (feat: ajustes en login, API de Google y vistas)
