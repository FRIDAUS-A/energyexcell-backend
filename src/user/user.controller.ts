import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from './interfaces';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async get(@GetUser() user: User): Promise<User> {
    return await this.userService.get(user);
  }

  @Patch()
  async update(
    @GetUser() user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(user, updateUserDto);
  }

  @Patch()
  async updatePassword(
    @GetUser() user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return await this.userService.updatePassword(user, updatePasswordDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async delete(@GetUser() user: User) {
    return await this.userService.delete(user);
  }
}
