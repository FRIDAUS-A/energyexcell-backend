import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Types } from 'mongoose';
import { uploadBase64Image } from 'src/services/uploadBase64';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
    private config: ConfigService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel
      .findOne()
      .where('name')
      .equals(createProductDto.name)
      .exec();

    if (product) throw new ForbiddenException('product name taken');
    const { base64Image } = createProductDto;
    if (!/^data:image\/(png|jpeg|jpg);base64,/.test(base64Image)) {
      throw new BadRequestException(
        'Invalid file type. Only PNG or JPEG images are allowed.',
      );
    }
    const imageLink = await uploadBase64Image(
      base64Image,
      this.config.get('GOOGLE_APPLICATION_CREDENTIALS'),
      this.config.get('GCLOUD_BUCKET'),
    );
    delete createProductDto.base64Image;
    const createdProduct = new this.productModel({
      ...createProductDto,
      imageLink,
    });

    return await createdProduct.save();
  }

  async getAll() {
    const products = await this.productModel.find().populate('category').exec();

    return products;
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }

    const product = await this.productModel
      .findById(id)
      .populate('category')
      .exec();
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Product Id');
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(
        id,
        { $set: updateProductDto },
        { new: true, runValidators: true },
      )
      .populate('category')
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('product not found');
    }

    return updatedProduct;
  }

  async delete(id: string) {
    console.log(id);
    const result = await this.productModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('product not found');
    }
  }
}
