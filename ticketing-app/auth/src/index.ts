import express, { Request, Response } from 'express';
import "express-async-errors";
import { json } from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signInUserRouter } from './routes/sign-in';
import { signOutUserRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getMongoClient } from './database/get-client';
import { signUpUserRouter } from './routes/sign-up';
import cookieSession from 'cookie-session';
import { attachUser } from './middlewares/attach-user';
import cors from 'cors';
import CorsWhitelistOrigin from './middlewares/cors-origin-whitelist';

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

  app.all('*', CorsWhitelistOrigin(corsOpts.origin));

  app.use(currentUserRouter);
  app.use(signOutUserRouter);
  app.use(signInUserRouter);
  app.use(signUpUserRouter);

  app.all("*", async () => {
    throw new NotFoundError();
  })

  // define error handlers after everything else
  app.use(errorHandler);

  app.listen(PORT, HOST);

  console.log(`Running AUTH SERVICE on http://${HOST}:${PORT}`);
})()