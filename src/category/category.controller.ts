import { Body, Controller, Delete, Get, Patch, Post, Type, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto';
import { Category } from './interfaces';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
	constructor(
		private categoryService: CategoryService
	) {}

	@Post()
	async create(@Body() createCategoryDto: createCategoryDto): Promise<Category> {
		console.log(createCategoryDto)
		return await this.categoryService.create(createCategoryDto);
	}

	@Get(':id')
	async get(id: string): Promise<Category> {
		return await this.categoryService.get(id);
	}

	@Get()
	async getAll(): Promise<Category[]> {
		return await this.categoryService.getAll();
	}

	@Patch(':id')
	async update(id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		return await this.categoryService.update(id, updateCategoryDto);
	}

	@Delete(':id')
	async delete(id: string) {
		return await this.categoryService.delete(id);
	}
}
