import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signInUserRouter } from './routes/sign-in';
import { signOutUserRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

app.use(json());

app.use(errorHandler);

app.use(currentUserRouter);
app.use(signOutUserRouter);
app.use(signInUserRouter);

app.listen(PORT, HOST);

console.log(`Running AUTH SERVICE on http://${HOST}:${PORT}`);