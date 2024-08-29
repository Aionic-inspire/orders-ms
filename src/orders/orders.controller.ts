import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderSatusDto, PaidOrderDto } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto)

    const paymentSession = await this.ordersService.createPaymentSession(order)

    return {
      order,
      paymentSession
    }
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() OrderPaginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(OrderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('ChangeOrderStatus')
  changeOrderStatus(@Payload() changeOrderstatusDto: ChangeOrderSatusDto){
      return this.ordersService.changeStatus(changeOrderstatusDto)

  }

  @EventPattern('payment.succeeded')
  paidOrder(@Payload() paidOrderDto: PaidOrderDto){
      return this.ordersService.paidOrder(paidOrderDto);
  }
}
