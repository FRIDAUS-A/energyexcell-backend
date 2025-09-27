import { IsEmpty, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	shortDescription: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsOptional()
	@IsString()
	imageLink?: string

	@IsOptional()
	@IsString()
	videoLink?: string

	@IsMongoId()
  	category: string;
}