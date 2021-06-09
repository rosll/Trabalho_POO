import { Router } from 'express';
import SessionsUsuariosController from '../app/controllers/SessionsUsuariosController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const sessionsUsuariosController = new SessionsUsuariosController();
  const { user, token } = await sessionsUsuariosController.store({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;

// Exception Handling
