import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsNumberString
} from 'class-validator';


export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly imageUrl: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty()
    @IsNotEmpty()
    categoryId: number;
}
