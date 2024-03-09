import Event from "./event.interface";

export default interface IEventHandler<T extends Event = Event> {
  handle(event: T): void;
}
