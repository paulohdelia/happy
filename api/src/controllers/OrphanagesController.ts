import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export async function index(req: Request, res: Response): Promise<Response> {
  const orphanagesRepository = getRepository(Orphanage);

  const orphanages = await orphanagesRepository.find();

  return res.json(orphanages);
}

export async function show(req: Request, res: Response): Promise<Response> {
  const orphanageId = req.params.id;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = await orphanagesRepository.findOneOrFail(orphanageId);

  return res.json(orphanage);
}

export async function create(req: Request, res: Response): Promise<Response> {
  const orphanagesRepository = getRepository(Orphanage);

  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = req.body;

  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  await orphanagesRepository.save(orphanage);

  return res.status(201).json(orphanage);
}
