import IEvent from "../../shared/event/event.interface";

export default class ProductCreatedEvent implements IEvent {
  dateTimeOcurred: Date;
  data: unknown;

  constructor(data: unknown) {
    this.dateTimeOcurred = new Date();
    this.data = data;
  }
}
