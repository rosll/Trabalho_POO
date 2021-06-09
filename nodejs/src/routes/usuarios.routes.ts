import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import UsuariosController from '../app/controllers/UsuariosController';
import Usuarios from '../app/models/Usuarios';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import AvatarUsuariosController from '../app/controllers/AvatarUsuariosController';

const usuariosRouter = Router();
const upload = multer(uploadConfig);

usuariosRouter.post('/', async (request, response) => {
  const { nome, email, password } = request.body;

  const usuariosController = new UsuariosController();

  const user = await usuariosController.store({
    nome,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usuariosRouter.get('/', ensureAuthenticated, async (request, response) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const user = await usuariosRepositorio.find();
  console.log(request.user);
  delete user[0].password;
  return response.json(user);
});

usuariosRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const { id } = request.params;
  const user = await usuariosRepositorio.findOne(id);
  return response.json(user);
});

usuariosRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    await usuariosRepositorio.delete(id);
    return response.send();
  },
);

usuariosRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const avatarUsuariosController = new AvatarUsuariosController();
    const user = await avatarUsuariosController.update({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    // console.log(request.file);
    delete user.password;
    return response.json(user);
  },
);

export default usuariosRouter;
