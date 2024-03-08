import IEventHandler from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogWhenUserIsCreatedHandler2
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
