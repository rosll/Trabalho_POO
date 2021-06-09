import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

import Usuarios from '../models/Usuarios';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Usuarios;
  token: string;
}

class SessionsUsuariosController {
  public async store({ email, password }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Usuarios);
    const user = await usuariosRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Combinação de email/senha incorretos', 401);
    }

    const verificaSenha = await compare(password, user.password);

    if (!verificaSenha) {
      throw new AppError('Combinação de email/senha incorretos', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default SessionsUsuariosController;
