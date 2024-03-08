import IEventHandler from "../../event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLogWhenUserChangeAddressHandler
  implements IEventHandler<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    const { id, name, Address } = event.data;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${Address.toString()}`
    );
  }
}
