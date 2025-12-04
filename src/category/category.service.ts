import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Category } from './interfaces';
import { createCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: createCategoryDto): Promise<Category> {
    const category = await this.categoryModel
      .findOne()
      .where('name')
      .equals(createCategoryDto.name)
      .exec();

    if (category) throw new ForbiddenException('category name taken');

    const createdCategory = new this.categoryModel(createCategoryDto);

    return await createdCategory.save();
  }

  async get(id: string): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('category not found');

    return category;
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      { $Set: updateCategoryDto },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) throw new NotFoundException('category not found');

    return updatedCategory;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const result = await this.categoryModel.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      throw new NotFoundException('category not found');
  }
}
