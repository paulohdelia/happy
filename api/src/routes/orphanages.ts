import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { index, show, create } from '../controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', index);
routes.get('/:id', show);
routes.post('/', upload.array('images'), create);

export default routes;
