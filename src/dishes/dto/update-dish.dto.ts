import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class UpdateDishDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly title?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly price?: number;

    @IsOptional()
    @IsNumber()
    @Min(10)
    readonly weightGrams?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly calories?: number;

    @IsOptional()
    @IsBoolean()
    readonly isSpicy?: boolean;
}