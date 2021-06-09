/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Teachers from '../models/Teachers';

type TeachersCreate = {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
};

type TeachersUpdate = {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
};

class TeachersController {
  public async store({
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  }: TeachersCreate) {
    const teachersRepository = getRepository(Teachers);

    const teachers = teachersRepository.create({
      disciplina,
      professor,
      diasemana,
      periodo,
      horario,
    });

    await teachersRepository.save(teachers);

    return teachers;
  }

  public async update({
    id,
    disciplina,
    professor,
    diasemana,
    periodo,
    horario,
  }: TeachersUpdate) {
    const teachersRepository = getRepository(Teachers);

    const teachers = await teachersRepository.findOne({ id });

    if (!teachers) {
      throw new AppError('id Teacher nao encontrado!');
    }

    await teachersRepository.update(
      { id },
      { disciplina, professor, diasemana, periodo, horario },
    );

    const teacherUpdated = await teachersRepository.findOne({ id });

    return teacherUpdated;
  }
}

export default TeachersController;
