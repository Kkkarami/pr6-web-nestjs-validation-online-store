import { Inject, Injectable } from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FEE_CALCULATOR } from '../shared/config/fee-calculator.provider';
import type { FeeCalculator } from '../shared/config/fee-calculator.provider';

@Injectable()
export class OrdersService {
    private orders: {
        id: string;
        productId: string;
        productTitle: string;
        quantity: number;
        subtotal: number;
        taxAmount: number;
        totalAmount: number;
    }[] = [];

    constructor(
        private readonly dishesService: DishesService,
        @Inject(FEE_CALCULATOR) private readonly feeCalculator: FeeCalculator
    ) {}

    createOrder(createOrderDto: CreateOrderDto) {
        const product = this.dishesService.findOne(createOrderDto.productId);

        const subtotal = product.price * createOrderDto.quantity;
        const taxAmount = this.feeCalculator.calculateTax(subtotal);
        const totalAmount = subtotal + taxAmount;

        const newOrder = {
            id: Date.now().toString(),
            productId: createOrderDto.productId,
            productTitle: product.title,
            quantity: createOrderDto.quantity,
            subtotal,
            taxAmount,
            totalAmount,
        };

        this.orders.push(newOrder);

        return newOrder;
    }
}