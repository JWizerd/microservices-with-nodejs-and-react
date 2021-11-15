import express from 'express';
import "express-async-errors";
import { json } from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signInUserRouter } from './routes/sign-in';
import { signOutUserRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getMongoClient } from './database/get-client';
import { signUpUserRouter } from './routes/sign-up';

(async () => {
  const PORT = 5000;
  const HOST = '0.0.0.0';

  const app = express();
  await getMongoClient();

  app.use(json());

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