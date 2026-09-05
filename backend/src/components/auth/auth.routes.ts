import { Router } from 'express';
import { login, register, googleAuth } from './auth.controller';

const router: Router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/google', googleAuth);

export default router;