import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {

    constructor(private readonly dishesService: DishesService) {}

    @Get()
    findAll() {
        return this.dishesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dishesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDishDto: CreateDishDto) {
        return this.dishesService.create(createDishDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
        return this.dishesService.update(id, updateDishDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.dishesService.remove(id);
    }
}
