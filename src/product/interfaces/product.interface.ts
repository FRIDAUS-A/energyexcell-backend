import { Document, Types } from 'mongoose';
import { Category } from 'src/category/interfaces';

export interface Product extends Document {
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  imageLink?: string;
  videoLink?: string;
  category: Types.ObjectId | Category;
}
