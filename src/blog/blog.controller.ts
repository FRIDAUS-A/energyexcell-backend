import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { createBlogDto, UpdateBlogDto } from './dto';
import { Blog } from './interfaces';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createBlogDto: createBlogDto): Promise<Blog> {
    return await this.blogService.create(createBlogDto);
  }

  @Get()
  async getAll(): Promise<Blog[]> {
    return await this.blogService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Blog> {
    return await this.blogService.get(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async patch(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return await this.blogService.patch(id, updateBlogDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.blogService.delete(id);
  }
}
