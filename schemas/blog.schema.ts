import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	imageLink: { type: String },
	videoLink: { type: String },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
}, {
	timestamps: true,
})