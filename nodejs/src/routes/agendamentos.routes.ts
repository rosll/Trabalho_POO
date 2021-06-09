import { Router } from 'express';
import AgendamentosController from '../app/controllers/AgendamentosController';

const agendamentosRouter = Router();

agendamentosRouter.post('/', async (request, response) => {
  const { prestador_servico_id, data } = request.body;
  const agendamentosController = new AgendamentosController();
  const agendamento = await agendamentosController.store({
    prestador_servico_id,
    data,
  });
  return response.json(agendamento);
});

export default agendamentosRouter;
