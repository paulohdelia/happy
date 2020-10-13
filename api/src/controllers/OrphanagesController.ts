import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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

  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  });

  await orphanagesRepository.save(orphanage);

  return res.status(201).json(orphanage);
}
