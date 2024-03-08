import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler<IEvent>[] } = {};

  get handlers() {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name;
    if (!this.eventHandlers[eventName]) {
      return;
    }
    this.eventHandlers[eventName].forEach((handler) => handler.handle(event));
  }

  register(name: string, handler: IEventHandler<IEvent>): void {
    if (!(name in this.eventHandlers)) {
      this.eventHandlers[name] = [];
    }

    this.eventHandlers[name].push(handler);
  }

  unregister(name: string, handler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[name]) {
      return;
    }

    const indexOfHandler = this.eventHandlers[name].indexOf(handler);
    if (indexOfHandler === -1) {
      return;
    }

    this.eventHandlers[name].splice(indexOfHandler, 1);
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
