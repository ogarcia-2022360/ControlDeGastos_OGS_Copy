import { Router } from 'express';
import { AuthService } from './auth.service';

const router: Router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;