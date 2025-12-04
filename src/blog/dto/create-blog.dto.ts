import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Category } from 'src/category/interfaces';

export class createBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageLink: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  videoLink: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  category: Types.ObjectId | Category;
}
