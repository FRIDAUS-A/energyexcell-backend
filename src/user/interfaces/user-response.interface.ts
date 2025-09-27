import { Document } from 'mongoose';

export interface UserResponse extends Document {
	email: string
}