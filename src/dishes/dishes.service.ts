import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { SlugService } from '../shared/slug/slug.service';

@Injectable()
export class DishesService {
    constructor(private readonly slugService: SlugService) {}

    private dishes = [
        {
            id: '1',
            title: 'Піца Маргарита',
            price: 220,
            weightGrams: 450,
            calories: 850,
            isSpicy: false,
        },
        {
            id: '2',
            title: 'Бургер',
            price: 180,
            weightGrams: 300,
            calories: 650,
            isSpicy: false,
        },
    ];

    findAll() {
        return this.dishes;
    }

    findOne(id: string) {
        const dish = this.dishes.find((dish) => dish.id === id);

        if(!dish){
            throw new NotFoundException(`Страва з ID ${id} не знайдена`);
        }

        return dish;
    }

    create(createDishDto: CreateDishDto) {
        const newDish = {
            id: Date.now().toString(),
            ...createDishDto,
            slug: this.slugService.generateSlug(createDishDto.title),
        };
    
        this.dishes.push(newDish);
    
        return newDish;
    }

    update(id: string, updateDishDto: UpdateDishDto) {
        const updatedDish = {
            ...this.findOne(id),
            ...updateDishDto,
            
        }
        const dishIndex = this.dishes.findIndex((dish) => dish.id === id);
        this.dishes[dishIndex] = updatedDish;
        return updatedDish;
    }

    remove(id: string) {
        this.findOne(id);
        const dishIndex = this.dishes.findIndex((dish => dish.id === id));
        this.dishes.splice(dishIndex, 1);
    }

}
