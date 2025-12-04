import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Blog } from './interfaces';
import { createBlogDto, UpdateBlogDto } from './dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_MODEL')
    private blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: createBlogDto) {
    const createdBlog = new this.blogModel(createBlogDto);

    return await createdBlog.save();
  }

  async getAll() {
    const blogs = await this.blogModel.find().populate('category').exec();

    return blogs;
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const blog = await this.blogModel.findById(id).populate('category').exec();
    if (!blog) throw new NotFoundException('blog not found');

    return blog;
  }

  async patch(id: string, updateBlogDto: UpdateBlogDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const updatedResult = await this.blogModel
      .findByIdAndUpdate(
        id,
        { $set: { ...updateBlogDto } },
        { new: true, runValidators: true },
      )
      .populate('category')
      .exec();

    if (!updatedResult) throw new NotFoundException('blog not found');

    return updatedResult;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }
    const result = await this.blogModel.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      throw new NotFoundException('blog not found');
  }
}
