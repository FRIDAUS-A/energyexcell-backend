import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SpecificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unit?: string;
}

class DimensionsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  length?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  width?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  height?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unit?: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageLink: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  videoLink?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  modelNumber?: string;

  @ApiProperty()
  @IsMongoId()
  category: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationDto)
  specifications?: SpecificationDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['available', 'out_of_stock', 'discontinued'])
  availabilityStatus?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  base64Image?: string;
}
