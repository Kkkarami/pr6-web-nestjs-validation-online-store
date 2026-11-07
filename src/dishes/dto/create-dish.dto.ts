import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateDishDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsNumber()
    @Min(10)
    readonly weightGrams: number;
    
    @IsNumber()
    @Min(0)
    readonly calories: number;
    
    @IsBoolean()
    readonly isSpicy: boolean;
}