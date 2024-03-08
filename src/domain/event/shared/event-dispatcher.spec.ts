import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerChangeAddressEvent from "./customer/customer-change-address.event";
import CustomerCreatedEvent from "./customer/customer-created.event";
import SendConsoleLogWhenUserChangeAddressHandler from "./customer/handler/send-console-log-when-user-change-address.handler";
import SendConsoleLogWhenUserIsCreatedHandler1 from "./customer/handler/send-console-log-when-user-is-created1.handler";
import SendConsoleLogWhenUserIsCreatedHandler2 from "./customer/handler/send-console-log-when-user-is-created2.handler";
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
    const createdProductHandler = new SendEmailWhenProductIsCreatedHandler();
    const createdUserHandler1 = new SendConsoleLogWhenUserIsCreatedHandler1();
    const createdUserHandler2 = new SendConsoleLogWhenUserIsCreatedHandler2();
    const userChangedAddressHandler =
      new SendConsoleLogWhenUserChangeAddressHandler();

    const spys = [
      createdProductHandler,
      createdUserHandler1,
      createdUserHandler2,
      userChangedAddressHandler,
    ].map((handler) => jest.spyOn(handler, "handle"));

    dispatcher.register("ProductCreatedEvent", createdProductHandler);
    dispatcher.register("CustomerCreatedEvent", createdUserHandler1);
    dispatcher.register("CustomerCreatedEvent", createdUserHandler2);
    dispatcher.register(
      "CustomerChangeAddressEvent",
      userChangedAddressHandler
    );

    dispatcher.notify(
      new ProductCreatedEvent({
        name: "Test product",
        description: "Test description",
        price: 100,
      })
    );

    const customer = new Customer("1", "Test customer");
    dispatcher.notify(new CustomerCreatedEvent(customer));

    const address = new Address("Test street", 10, "Test state", "Test city");
    customer.changeAddress(address);
    dispatcher.notify(new CustomerChangeAddressEvent(customer));

    spys.forEach((spy) => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
