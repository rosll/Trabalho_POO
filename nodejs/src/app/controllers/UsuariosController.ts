import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import Usuarios from '../models/Usuarios';

interface Request {
  nome: string;
  email: string;
  password: string;
}

class UsuariosController {
  public async store({ nome, email, password }: Request): Promise<Usuarios> {
    const usuariosRepository = getRepository(Usuarios);

    const verificaUsuarioExiste = await usuariosRepository.findOne({
      where: { email },
    });

    if (verificaUsuarioExiste) {
      throw new AppError('Endereço de email já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = usuariosRepository.create({
      nome,
      email,
      password: hashedPassword,
      // password,
    });

    await usuariosRepository.save(user);

    return user;
  }
}

export default UsuariosController;
