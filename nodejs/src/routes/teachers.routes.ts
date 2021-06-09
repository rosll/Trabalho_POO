import { Router } from 'express';
import { getRepository } from 'typeorm';
import TeachersController from '../app/controllers/TeachersController';
import Teachers from '../app/models/Teachers';
// import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const teachersRouter = Router();

teachersRouter.post('/', async (req, res) => {
  const { disciplina, professor, diasemana, periodo, horario } = req.body;

  const teachersController = new TeachersController();

  try {
    const teachers = await teachersController.store({
      disciplina,
      professor,
      diasemana,
      periodo,
      horario,
    });
    return res.json(teachers);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

teachersRouter.get('/', async (req, res) => {
  const teachersRepository = getRepository(Teachers);

  try {
    const teachers = await teachersRepository.find();
    return res.json(teachers);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  // console.log(req.user)
});

teachersRouter.get('/:id', async (req, res) => {
  const teachersRepository = getRepository(Teachers);

  const { id } = req.params;

  try {
    const teachers = await teachersRepository.findOne({ id });
    return res.json(teachers);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

teachersRouter.delete('/:id', async (req, res) => {
  const teachersRepository = getRepository(Teachers);

  const { id } = req.params;

  try {
    const teachers = await teachersRepository.delete({ id });
    return res.json({ message: 'id Teacher deletado!' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

teachersRouter.patch('/:id', async (req, res) => {
  const { disciplina, professor, diasemana, periodo, horario } = req.body;

  const { id } = req.params;

  const teachersController = new TeachersController();

  try {
    const teachers = await teachersController.update({
      id,
      disciplina,
      professor,
      diasemana,
      periodo,
      horario,
    });

    return res.json(teachers);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default teachersRouter;
