import { Router } from 'express';
import { IngresosController } from './ingresos.controller';

const router = Router();

// Endpoint: GET /api/ingresos
router.get('/', IngresosController.obtenerTodos);

// Endpoint: POST /api/ingresos
router.post('/', IngresosController.crear);

export default router;