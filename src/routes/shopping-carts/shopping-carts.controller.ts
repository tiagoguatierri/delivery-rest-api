import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CrudController } from '@/core';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';

import { Product, ProductsModule, ProductsService } from '../products';


@ApiTags('ShoppingCart')
@Controller()
export class ShoppingCartsController extends CrudController<ShoppingCart> {


    @ApiOperation({ summary: 'Create new record' })
    @Post()
    async create(@Body() entity: CreateShoppingCartDto): Promise<ShoppingCart> {
        return super.create(entity);
    }

    @ApiOperation({ summary: 'add product to shoppingcart' })
    @Post(':id/products')
    async addProduct(@Param('id') idShoppingCart: number, @Body('id') idProduct: number): Promise<any> {
        let product = await this.productsService.findOne(idProduct)
        console.log('aquiii', product);

        let shoppingCart = await this.shoppingCartsService.findOne(idShoppingCart, { relations: ['products'] })
        shoppingCart.products.push(product)
        await this.shoppingCartsService.save(shoppingCart)
        return product
    }

    @ApiOperation({ summary: 'remove product to shoppingcart' })
    @Delete(':id/products')
    async removeProduct(@Param('id') idShoppingCart: number, @Body('id') idProduct: number): Promise<any> {
        let shoppingCart = await this.shoppingCartsService.findOne(idShoppingCart, { relations: ['products'] })
        console.log('shoppingcart finded', shoppingCart);
        let indexFinded = shoppingCart.products.findIndex((product) => {
            return product.id == idProduct
        })
        if (indexFinded > -1) {
            shoppingCart.products.splice(indexFinded, 1);
        }
        await this.shoppingCartsService.save(shoppingCart)
        let product = await this.productsService.findOne(idProduct)
        return product
    }

    @ApiOperation({ summary: 'Update an existing record' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: UpdateShoppingCartDto,
    ): Promise<any> {
        return super.update(id, entity);
    }

    constructor(private readonly shoppingCartsService: ShoppingCartsService,
        private readonly productsService: ProductsService) {
        super(shoppingCartsService);
    }
}



