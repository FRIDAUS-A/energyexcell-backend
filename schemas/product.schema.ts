import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
	name: { type: String, unique: true},
	title: String,
	shortDescription: String,
	description: String,
	imageLink: String,
	videoLink: String,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
}, {
    timestamps: true, // adds createdAt and updatedAt automatically
  },)