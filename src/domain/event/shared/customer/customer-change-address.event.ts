import Customer from "../../../entity/customer";
import IEvent from "../event.interface";

export default class CustomerChangeAddressEvent implements IEvent {
  dateTimeOcurred: Date;
  data: Customer;

  constructor(data: Customer) {
    this.dateTimeOcurred = new Date();
    this.data = data;
  }
}
