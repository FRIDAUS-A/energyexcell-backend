import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"
import { Category } from "src/category/interfaces"

export class createBlogDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsOptional()
	@IsString()
	imageLink: string

	@IsOptional()
	@IsString()
	videoLink: string

	@IsMongoId()
	category: Types.ObjectId | Category
}