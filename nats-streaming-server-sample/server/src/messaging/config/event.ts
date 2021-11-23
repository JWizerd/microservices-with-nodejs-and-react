import { CHANNELS } from ".";

export interface Event {
  channel: CHANNELS,
  data: any
}