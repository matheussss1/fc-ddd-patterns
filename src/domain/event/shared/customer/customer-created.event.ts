import Customer from "../../../entity/customer";
import IEvent from "../event.interface";

export default class CustomerCreatedEvent implements IEvent {
  dateTimeOcurred: Date;
  data: Customer;

  constructor(data: Customer) {
    this.dateTimeOcurred = new Date();
    this.data = data;
  }
}
