import express, { Request, Response } from 'express';
import "express-async-errors";
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getMongoClient } from './database/get-client';
import cookieSession from 'cookie-session';
import { attachUser } from './middlewares/attach-user';
import cors from 'cors';
import CorsWhitelistOrigin from './middlewares/cors-origin-whitelist';
import { authenticate } from './middlewares/authenticate';

(async () => {
  const PORT = 5000;
  const HOST = '0.0.0.0';
  const corsOpts = {
    origin: ['http://ticketing-auth', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    default: '*',
    exposedHeaders: 'Set-Cookie',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie'
  }

  const app = express();

  app.set('trust proxy', 1);

  await getMongoClient();

  app.use(cors(corsOpts));
  app.use(json());
  app.use(cookieSession({
    signed: false,
    secure: false,
    httpOnly: true,
  }))

  app.use(attachUser);
  app.use(authenticate);

  app.get("/api/tickets", (req: Request, res: Response) => {
    res.json({ message: "Hello from ticketing service!" });
  })

  app.all('*', CorsWhitelistOrigin(corsOpts.origin));

  app.all("*", async () => {
    throw new NotFoundError();
  })

  // define error handlers after everything else
  app.use(errorHandler);

  app.listen(PORT, HOST);

  console.log(`Running TICKETING SERVICE on http://${HOST}:${PORT}`);
})()