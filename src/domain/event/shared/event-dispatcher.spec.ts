import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events", () => {
  it("should register an event handler", () => {
    const dispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", handler);

    expect(dispatcher.handlers["ProductCreatedEvent"]).toBeDefined();
    expect(dispatcher.handlers["ProductCreatedEvent"].length).toBe(1);
    expect(dispatcher.handlers["ProductCreatedEvent"].at(0)).toMatchObject(
      handler
    );
  });

  it("should unregister an event handler", () => {
    const dispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", handler);
    dispatcher.unregister("ProductCreatedEvent", handler);

    expect(dispatcher.handlers["ProductCreatedEvent"]).toBeDefined();
    expect(dispatcher.handlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const dispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();

    dispatcher.register("ProductCreatedEvent", handler);
    dispatcher.unregisterAll();

    expect(dispatcher.handlers).toMatchObject({});
  });

  it("should notify an event", () => {
    const dispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();
    const handlerSpy = jest.spyOn(handler, "handle");

    dispatcher.register("ProductCreatedEvent", handler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Test product",
      description: "Test description",
      price: 100,
    });

    dispatcher.notify(productCreatedEvent);

    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });
});
