import { Router } from 'express';

import { index, show, create } from '../controllers/OrphanagesController';

const routes = Router();

routes.get('/', index);
routes.get('/:id', show);
routes.post('/', create);

export default routes;
