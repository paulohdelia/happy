import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

export async function index(req: Request, res: Response): Promise<Response> {
  const orphanagesRepository = getRepository(Orphanage);

  const orphanages = await orphanagesRepository.find({
    relations: ['images'],
  });

  return res.json(orphanageView.renderMany(orphanages));
}

export async function show(req: Request, res: Response): Promise<Response> {
  const orphanageId = req.params.id;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = await orphanagesRepository.findOneOrFail(orphanageId, {
    relations: ['images'],
  });

  return res.json(orphanageView.render(orphanage));
}

export async function create(req: Request, res: Response): Promise<Response> {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = req.body;

  const requestImages = req.files as Express.Multer.File[];
  const images = requestImages.map(image => ({ path: image.filename }));

  const orphanagesRepository = getRepository(Orphanage);

  const data = {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends: open_on_weekends === 'true',
    images,
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
      }),
    ).required(),
  });

  await schema.validate(data, {
    abortEarly: false,
  });

  const orphanage = orphanagesRepository.create(data);

  await orphanagesRepository.save(orphanage);

  return res.status(201).json(orphanage);
}
