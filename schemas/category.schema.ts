import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);
