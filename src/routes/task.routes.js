import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { list, create, update, remove, bulksync } from '../controllers/task.controller.js';

const router = Router();
router.use(auth);
router.get('/', list); // GET /api/tasks → listar todas las tareas
router.post('/', create); // POST /api/tasks → crear una nueva tarea
router.post('/bulksync', bulksync); // POST /api/tasks/bulksync → sincronización masiva
router.put('/:id', update); // PUT /api/tasks/:id → actualizar una tarea
router.delete('/:id', remove); // DELETE /api/tasks/:id → eliminar una tarea

export default router;