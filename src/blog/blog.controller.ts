import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { createBlogDto, UpdateBlogDto } from './dto';
import { Blog } from './interfaces';

@Controller('blogs')
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Post()
	async create(@Body() createBlogDto: createBlogDto): Promise<Blog> {
		return await this.blogService.create(createBlogDto);
	}

	@Get()
	async getAll(@Param('id') id: string): Promise<Blog[]> {
		return await this.blogService.getAll();
	}

	@Get(':id')
	async get(@Param('id') id: string): Promise<Blog> {
		return await this.blogService.get(id)
	}


	@Patch(':id')
	async patch(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
		return await this.blogService.patch(id, updateBlogDto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.blogService.delete(id)
	}

}
