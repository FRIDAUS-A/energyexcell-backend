import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { SigninDto } from './dto';
import { UserResponse } from 'src/user/interfaces/user-response.interface';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) {}

	@Post('signup')
	async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
		return await this.authService.signup(createUserDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('signin')
	async signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
		return await this.authService.signin(signinDto);
	}
}
