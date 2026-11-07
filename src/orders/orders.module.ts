import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DishesModule } from '../dishes/dishes.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [DishesModule, SharedModule],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}