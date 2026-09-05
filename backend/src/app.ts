import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './components/auth/auth.routes';
import ingresosRouter from './components/ingresos/ingresos.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.use('/api/ingresos', ingresosRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor Backend activo' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;