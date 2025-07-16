import { Order } from '@/modules/order/infra/typeorm/entities/Order';

export class OrderMap {
  static toResponse(order: Order) {
    return {
      id: order.id,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,

      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },

      address: {
        id: order.address.id,
        cep: order.address.cep,
        street: order.address.street,
        number: order.address.number,
        complement: order.address.complement,
        neighborhood: order.address.neighborhood,
        city: order.address.city,
        state: order.address.state,
        isDefault: order.address.isDefault,
      },
    };
  }
}
