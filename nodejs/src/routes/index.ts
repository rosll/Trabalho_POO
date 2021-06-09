import { Router } from 'express';

import usuariosRouter from './usuarios.routes';
import agendamentosRouter from './agendamentos.routes';
import sessionsRouter from './sessions.routes';
import teachersRouter from './teachers.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/agendamentos', agendamentosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/teachers', teachersRouter);

export default routes;
