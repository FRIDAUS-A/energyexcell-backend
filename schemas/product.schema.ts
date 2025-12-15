import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageLink: {
      type: String,
      required: true,
    },

    videoLink: {
      type: String,
    },

    modelNumber: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
        unit: { type: String },
      },
    ],

    features: [{ type: String }],

    dimensions: {
      length: String,
      width: String,
      height: String,
      weight: String,
      unit: String,
    },

    availabilityStatus: {
      type: String,
      enum: ['available', 'out_of_stock', 'discontinued'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

/* 👇 ADD INDEX HERE */
ProductSchema.index({
  title: 'text',
  description: 'text',
});
