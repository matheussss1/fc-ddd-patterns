import IEvent from "../../shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerChangeAddressEvent implements IEvent {
  dateTimeOcurred: Date;
  data: Customer;

  constructor(data: Customer) {
    this.dateTimeOcurred = new Date();
    this.data = data;
  }
}
