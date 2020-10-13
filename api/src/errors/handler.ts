import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(error);

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
