import EventHandler from "./event-handler.interface";
import Event from "./event.interface";

export default interface IEventDispatcher {
  notify(event: Event): void;
  register(name: string, handler: EventHandler): void;
  unregister(name: string, handler: EventHandler): void;
  unregisterAll(): void;
}
