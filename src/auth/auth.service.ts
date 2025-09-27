import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto';
import { User } from 'src/user/interfaces';
import * as argon2 from "argon2";
import { SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from 'src/user/interfaces/user-response.interface';
const JWT_EXPIRESIN = '15m'

@Injectable()
export class AuthService {
	constructor(
		@Inject('USER_MODEL')
		private userModel: Model<User>,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(createUserDto: CreateUserDto): Promise<UserResponse> {
		const user = await this.userModel
		.findOne()
		.where('email')
		.equals(createUserDto.email)
		.exec()
		if (user) throw new ForbiddenException('user email taken');
		const createdUser = new this.userModel({ 
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password)
		});
		await createdUser.save()

		const userObj = createdUser.toObject();
		delete userObj.password;
		
		return userObj;
	}

	async signin(signinDto: SigninDto): Promise<{ token: string }> {
		const user = await this.userModel
		.findOne()
		.where('email')
		.equals(signinDto.email)
		.exec()

		if (!user) throw new BadRequestException('incorrect details')
		const checkPassword = await argon2.verify(user.password, signinDto.password)

		if (!checkPassword) throw new BadRequestException('incorrect details');

		return await this.signToken(user.id, user.email);
	}


	async signToken(id: number, email:string): Promise<{token: string}> {
		const payload = {
			sub: id,
			email,
		}

		const token = await this.jwt.signAsync(payload, {
			expiresIn: JWT_EXPIRESIN,
			secret: this.config.get('JWT_SECRET'),
		})

		return {
			token,
		};
	}
}
