import { Document, Types } from 'mongoose';
import { Category } from 'src/category/interfaces';

export interface Blog extends Document {
  title: string;
  description: string;
  category: Types.ObjectId | Category;
}
