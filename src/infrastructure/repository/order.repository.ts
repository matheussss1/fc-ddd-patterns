import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        { where: { id: entity.id }, transaction }
      );

      if (!entity.items.length) {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction,
        });
      } else {
        await OrderItemModel.bulkCreate(
          entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          })),
          { transaction, updateOnDuplicate: ["id"] }
        );
      }
      await transaction.commit();
    } catch {
      await transaction.rollback();
      throw new Error("Error on update order");
    }
  }

  async find(id: string): Promise<Order> {
    let order: OrderModel;

    try {
      order = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error("Order not found");
    }

    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price / item.quantity,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price / item.quantity,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
