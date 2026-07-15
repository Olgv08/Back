import { Router } from 'express';
import { register, login, changePassword } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.post('/register', register); //Registrar un nuevo usuario
router.post('/login', login); //Iniciar sesión
router.put('/change-password', auth, changePassword); //Cambiar contraseña (requiere estar autenticado)
// router.get('/profile', auth, profile); //Obtener el perfil del usuario autenticado

export default router;