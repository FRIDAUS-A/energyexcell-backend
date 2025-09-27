import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productService.create(createProductDto);
	}

	@Get()
	async getAll() {
		return this.productService.getAll();
	}

	@Get(':id')
	async get(@Param('id') id: string): Promise<Product> {
		return this.productService.get(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
		return await this.productService.update(id, updateProductDto);
	}

	@Delete()
	async delete(@Param('id') id: string) {
		return this.productService.delete(id);
	}
}
