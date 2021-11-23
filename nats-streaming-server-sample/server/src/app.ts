import { Request, Response } from "express";
import express from "express";
import { validTicketRequest } from "./middlewares/valid-ticket-request";
import { Stan } from "node-nats-streaming";
import { TicketCreatedPublisher } from "./messaging/ticket-created-publisher";
import { TicketCreatedEvent } from "./messaging/config/ticket-created-event";
const app = express();
const HOST = '0.0.0.0';
const PORT = 5000;

export function bootstrap(client: Stan) {
  const publisher = new TicketCreatedPublisher(client);

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  app.post("/tickets", validTicketRequest, (req: Request, res: Response) => {
    try {
      publisher.publish(req.body as TicketCreatedEvent['data']);
      res.status(201).send({
        message: "Ticket successfully created!"
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: err.message
      })
    }
  });

  app.listen(PORT, HOST);

  console.log(`TICKETS SERVICE listening on port: ${PORT}`);
}